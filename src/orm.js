import { inspect } from 'util'
import _ from 'lodash'
import promiseLimit from 'promise-limit'
import { getUID, wait } from './utility'
import { addWhereFilterToParams } from './queryBuilder'
import {
  DBClient,
  getPartitionKey,
  getSortKey,
  getVersionKey,
  getTTLKey,
  getReverseIndexName,
  getTable
} from './config'
import { getError, CODE } from './error'

const { ORM_UPDATE_NOT_EXISTS, ORM_VERSION_MISMATCH, ORM_PARTITION_KEY_NOT_DEFINED, ORM_SORT_KEY_NOT_DEFINED, ORM_BATCH_WRITE_UNPROCESSED_ITEMS } = CODE

export const ID_LENGTH = 16
const MAX_DYNAMO_BATCH_SIZE = 25
const NEW_DATA_STRUCTURE = true

// <editor-fold desc="Public Functions">
export function getId () {
  return getUID(ID_LENGTH)
}

/**
 * Gets a single document from the database.
 * @param type
 * @param partitionValue
 * @param sortValue
 * @param options - see getDocuments options.
 * @returns {Promise<Object|null>}
 */
export async function getOneDocument (type, partitionValue, sortValue, options = {}) {
  let { items, more } = await getDocuments(type, partitionValue, sortValue, options)
  if (items && items.length > 0) {
    return items[0]
  }
  while (more) {
    const result = await getDocuments(type, partitionValue, sortValue, options)
    items = result.items
    more = result.more
    if (items && items.length > 0) {
      return items[0]
    }
  }
  return null
}

/**
 *
 * @param type
 * @param partitionValue
 * @param sortValue
 * @param options
 * @param {boolean} [options.reverse=false] - whether to use the reverse index in the query
 * @param {boolean} [options.sortBeginsWith=false] - if the sort key is a begins_with search rather than equals.
 * @param {string} [options.index] - the name of the index to use in the query.
 * @param {object} [options.where] - where condition for results
 * @param {object} [options.more] - exclusive start key to continue searching for results from this point onwards.
 * @returns {Promise<{items: Object[]}|{more: DocumentClient.Key, items: Object[]}>}
 */
export async function getDocuments (type, partitionValue, sortValue, options = {}) {
  // const { items: legacyItems } = await getDocumentsInternal(type, partitionValue, sortValue, { ...options, legacyStructure: true })
  return getDocumentsInternal(type, partitionValue, sortValue, { ...options, legacyStructure: false })
}

/**
 * Creates a document in dynamoDB
 * @param {String} type
 * @param {String} partitionValue
 * @param {String} sortValue
 * @param {Object} data
 * @param {Object} [options]
 * @param {Boolean} [options.pkGlobalUnique=false] - The partition key value must be globally unique (regardless of the sort value). Note that dynamo requires
 * the combination of partition and sort value to be globally unique (these two values together make the "primary key" of the document).
 * This is an additional step that requires the partition to essentially only ever have a single document in it. This may be useful if you have
 * a globally unique requirement on something (e.g. a nonce / magic link), and want to store an indexable value in the sort key (e.g. the user who created it).
 * @returns {Promise<Object>}
 */
export async function createDocument (type, partitionValue, sortValue, data, { pkGlobalUnique = false, ttl = null } = {}) {
  let headerWhere = { $or: [{ pk: { $exists: false } }, { sk: { $exists: false } }] }
  if (pkGlobalUnique) {
    headerWhere = { pk: { $exists: false } }
  }
  return putDocument(type, partitionValue, sortValue, null, data, { headerWhere, ttl })
}

/**
 *
 * @param {String} type
 * @param {Object[]} items
 * @param {String} items.partitionValue The partition value for the item
 * @param {String} items.sortValue The sort value for the item
 * @param {Object} items.data The data to update.
 * @param {Object} options
 * @param {Boolean} [options.delta=true] whether this is a delta value.
 * @param {Boolean} [options.errorOnMissing=false] If one of the items is not found then error, otherwise silently skip that item
 * @returns {Promise<void>}
 */
export async function batchUpdateDocuments (type, items, { delta = true, ttl = null, errorOnMissing = false } = {}) {
  items = items || []
  const keyPairs = _.map(items, item => {
    return { partitionValue: item.partitionValue, sortValue: item.sortValue }
  })
  const existingDocs = await batchGetDocuments(type, keyPairs)
  const partitionKey = getPartitionKey(type)
  const sortKey = getSortKey(type)
  // extend items with existing docs and throw errors if data is missing or incorrect
  _.each(items, item => {
    const findObj = { [partitionKey]: item.partitionValue }
    if (item.sortValue) { findObj[sortKey] = item.sortValue }
    const existing = _.find(existingDocs, findObj)
    if (errorOnMissing && !existing) {
      throw getError(ORM_UPDATE_NOT_EXISTS)
    }
    const versionKey = getVersionKey(type)
    if (delta && existing) {
      item.data = deepExtend(existing, item.data, [versionKey])
    }
    const currentDocVersion = existing && existing[versionKey]
    if (item.data[versionKey] && currentDocVersion && item.data[versionKey] !== currentDocVersion) {
      const internalMeta = { currentDocVersion, itemVersion: item.data[versionKey], item, existing }
      throw getError(ORM_VERSION_MISMATCH, { internalMeta })
    }
  })
  await batchWriteDocuments(type, items)
  return _.map(items, 'data')
}

/**
 * updates a given the document. It will error if the document does not exist.
 * @param type
 * @param partitionValue
 * @param sortValue
 * @param data
 * @param {Object} [options]
 * @param {Boolean} [options.delta=true] - the data being set is a partial document and should just update fields being set (null values are unset)
 * @param {Number} [options.ttl=null] - the time to live for this document before it is automatically removed from the db.
 * @param {Boolean} [options.returnOriginal=false] - whether to return the original document as well as the updated document.
 * @returns {Promise<{newItem: (Object|null), originalItem: (Object|null)}>}
 */
export async function updateDocument (type, partitionValue, sortValue, data, { delta = true, ttl = null, returnOriginal = false } = {}) {
  const existing = await getOneDocument(type, partitionValue, sortValue)
  let originalItem = null
  if (returnOriginal) {
    originalItem = _.cloneDeep(existing)
  }
  const versionKey = getVersionKey(type)
  if (delta && existing) { // patching
    data = deepExtend(existing, data, [versionKey])
  }
  const currentDocVersion = existing && existing[versionKey]
  if (data[versionKey] && currentDocVersion && data[versionKey] !== currentDocVersion) {
    throw getError(ORM_VERSION_MISMATCH, { internalMeta: { currentDocVersion, data } })
  }

  const headerWhere = { pk: { $exists: true }, sk: { $exists: true } }
  const newItem = await putDocument(type, partitionValue, sortValue, currentDocVersion, data, { headerWhere, ttl })
  if (returnOriginal) {
    return { originalItem, newItem }
  }
  return { newItem, originalItem: null }
}

/**
 * Upserts a document to the db, adding a new document if it doesn't already exist in the db.
 * @param type
 * @param partitionValue
 * @param sortValue
 * @param data
 * @param {Object} [options]
 * @param {Boolean} [options.delta=true] - the data being set is a partial document and should just update fields being
 * set (null values are unset).
 * @param {Number} [options.ttl=null] - the time to live for this document before it is automatically removed from the db.
 * @returns {Promise<Object|null>}
 */
export async function upsertDocument (type, partitionValue, sortValue, data, { delta = true, ttl = null } = {}) {
  const existing = await getOneDocument(type, partitionValue, sortValue)
  const versionKey = getVersionKey(type)
  if (delta && existing) { // patching
    data = deepExtend(existing, data, [versionKey])
  }
  const currentDocVersion = existing && existing[versionKey]
  if (data[versionKey] && currentDocVersion && data[versionKey] !== currentDocVersion) {
    throw getError(ORM_VERSION_MISMATCH, { internalMeta: { currentDocVersion, data } })
  }
  return putDocument(type, partitionValue, sortValue, currentDocVersion, data, { ttl })
}

/**
 * Removes the document from the DB.
 * @param type
 * @param partitionValue
 * @param sortValue
 * @returns {Promise<*>}
 */
export async function removeDocument (type, partitionValue, sortValue) {
  if (!partitionValue) {
    throw getError(ORM_PARTITION_KEY_NOT_DEFINED)
  }
  const TableName = getTable(type)
  const partitionKey = getPartitionKey(type)
  const sortKey = getSortKey(type)
  if (sortValue == null) {
    throw getError(ORM_SORT_KEY_NOT_DEFINED)
  }
  const Key = {
    [partitionKey]: `${partitionValue}`,
    [sortKey]: `${sortValue}`
  }
  const removedDoc = await DBClient.delete({ TableName, Key }).promise()
  return removedDoc
}

/**
 * Removes several documents from the DB. This is still constrained by DynamoDBs restriction of a single document at once,
 * however it uses batches to reduce network overhead when doing so.
 * @param type
 * @param partitionValue
 * @param sortValue - the sort value/prefix sort value to remove. or null if removing an entire partition.
 * @param lookupOptions - the options for querying the documents. Same options as per getDocuments
 * @param [lookupOptions.singlePage=false] - if singlePage is set it will only request at most 1 page of data from dynamodb to
 * remove those items. This will return the more object so that further requests can be handled by external code (for example restarting a
 * lambda function if it runs too long). It is recommended to use this flag and manage the calls to this function yourself if running
 * in a serverless environment.
 * @returns {Promise<{more, numDeleted: number}>}
 */
export async function removeManyDocuments (type, partitionValue, sortValue, lookupOptions = {}) {
  const singlePage = lookupOptions.singlePage
  delete lookupOptions.singlePage
  let { items, more } = await getDocuments(type, partitionValue, sortValue, lookupOptions)
  if (!singlePage) {
    while (more) {
      const opts = { ...lookupOptions, more }
      const result = await getDocuments(type, partitionValue, sortValue, opts)
      more = result.more
      items = (items || []).concat(result.items || [])
    }
  }
  const sortKey = getSortKey(type)
  const partitionKey = getPartitionKey(type)
  const writeDocs = _.map(items, doc => {
    return { action: 'delete', sortValue: doc[sortKey], partitionValue: doc[partitionKey] }
  })
  if (writeDocs.length > 0) {
    await batchWriteDocuments(type, writeDocs)
  }
  // more will be null/undefined if there are no more pages.
  return { numDeleted: writeDocs.length, more }
}

/**
 * Gets multiple documents from the DB using dynamodb batch queries
 * @param type
 * @param {{partitionValue:String, sortValue: String}[]} keyPairs - an array of partitionValue/sortValue objects to get.
 * @returns {Promise<Array>}
 */
export async function batchGetDocuments (type, keyPairs) {
  // create batches of 100 for querying from the db, as limit is 100 items in dynamodb.
  const batches = _.chunk(keyPairs, 100)
  const requests = _.map(batches, async function (batch) {
    return getDocumentForSingleBatch(type, batch)
  })
  const results = await Promise.all(requests)
  return _.flatten(results) // reduce 1 level as results is an array of results of batches.
}

/**
 * Writes a batch of items of the given type to the db.
 * @param type
 * @param items
 * @returns {Promise<*>}
 */
export async function batchWriteDocuments (type, items) {
  if (items.length > MAX_DYNAMO_BATCH_SIZE) {
    const chunks = _.chunk(items, MAX_DYNAMO_BATCH_SIZE)
    const limit = promiseLimit(10)
    const promises = _.map(chunks, (chunk) => {
      return limit(() => {
        return batchWriteDocuments(type, chunk)
      })
    })
    const response = await Promise.all(promises)
    return response
  } else {
    const TableName = getTable(type)
    const partitionKey = getPartitionKey(type)
    const sortKey = getSortKey(type)
    const ttlKey = getTTLKey(type)
    let tableItems = null
    tableItems = _.map(items, (item) => {
      if (item.action === 'delete') {
        const Key = {
          [partitionKey]: `${item.partitionValue}`,
          [sortKey]: `${item.sortValue}`
        }
        return { DeleteRequest: { Key } }
      } else {
        let Item = {
          [partitionKey]: `${item.partitionValue}`
        }
        if (item.sortValue != null) {
          Item[sortKey] = `${item.sortValue}`
        }
        if (item.ttl != null) {
          Item[ttlKey] = item.ttl
        }
        if (item.data != null) {
          if (NEW_DATA_STRUCTURE) {
            Item = { ...item.data, ...Item }
          } else {
            Item.data = item.data
          }
        }
        return { PutRequest: { Item } }
      }
    })
    return rawBatchWrite(TableName, tableItems)
  }
}

/**
 * Batch writes the given items to the table specified. Any items that fail to write will be retried up to 20 times, using
 * an exponential wait time delay to avoid aws throttling errors.
 * @param TableName
 * @param tableItems
 * @param attempt
 * @param waitTime
 * @returns {Promise<*>}
 */
export async function rawBatchWrite (TableName, tableItems, attempt = 1, waitTime = 50) {
  const maxRetry = 20
  const maxWaitTime = 2000 // ms
  const scalingFactor = 2 // multiply time by 2 each failure.

  const params = { RequestItems: { [TableName]: tableItems } }
  const response = await DBClient.batchWrite(params).promise()
  const failedItems = _.get(response, `UnprocessedItems.${TableName}`) || []
  if (failedItems.length > 0) {
    // keep retrying any failed items.
    console.log(`batchWriteItems ${attempt} - Failed Items: ${failedItems.length}`, response)
    if (attempt < maxRetry) {
      await wait(waitTime)
      const newWaitTime = Math.min(waitTime * scalingFactor, maxWaitTime)
      return rawBatchWrite(TableName, failedItems, attempt + 1, newWaitTime)
    }
    throw getError(ORM_BATCH_WRITE_UNPROCESSED_ITEMS)
  }
  return response
}

// </editor-fold>

// <editor-fold desc="Private Functions">
async function getDocumentsInternal (type, partitionValue, sortValue, options = {}) {
  const TableName = getTable(type)
  const partitionKey = options.reverse ? getSortKey(type) : getPartitionKey(type)
  const sortKey = options.reverse ? getPartitionKey(type) : getSortKey(type)
  const legacyStructure = options.legacyStructure || false
  let params = {
    TableName
  }
  if (options.index) {
    params.IndexName = options.index
  } else if (options.reverse) {
    params.IndexName = getReverseIndexName(type)
  }
  if (options.more) {
    params.ExclusiveStartKey = options.more
  }
  const keyWhere = {
    [partitionKey]: partitionValue
  }
  if (sortValue) {
    keyWhere[sortKey] = options.sortBeginsWith ? { $beginsWith: sortValue } : sortValue
  }
  params = addWhereFilterToParams(params, keyWhere, { headerKey: true, expressionKey: 'KeyConditionExpression', legacyStructure })
  if (options.where) { params = addWhereFilterToParams(params, options.where, { legacyStructure }) }
  // if (options.where) {
  // console.log('WHERE PARAMS', params)
  // }
  let results = []
  try {
    results = await DBClient.query(params).promise()
  } catch (e) {
    if (e.code === 'ConditionalCheckFailedException') {
      console.error('ConditionalCheckFailedException | Failed to getDocuments on query',
        type,
        partitionValue,
        sortValue,
        inspect(params, { depth: 10 }), e)
    }
    throw e
  }
  let items = results && results.Items
  if (results && results.LastEvaluatedKey) {
    console.log('HAS MORE PAGES | Last Evaluated Key', results && results.LastEvaluatedKey)
    return { items, more: results.LastEvaluatedKey }
  }
  return { items }
}

/**
 * Does a create/update execution
 * @param type
 * @param partitionValue
 * @param sortValue
 * @param currentDocVersion
 * @param data
 * @param {Object} [options]
 * @param {Object} [options.ttl=null] - Time To Live for the document
 * @param {Object} [options.headerWhere=null] - Header where conditions e.g. pk & sk exist/don't exist.
 * @returns {Promise<Object|null>}
 */
async function putDocument (type, partitionValue, sortValue, currentDocVersion, data, { headerWhere, ttl } = {}) {
  const TableName = getTable(type)
  const partitionKey = getPartitionKey(type)
  const sortKey = getSortKey(type)
  const versionKey = getVersionKey(type)
  let Item = {
    [partitionKey]: `${partitionValue}`,
    [versionKey]: (currentDocVersion || 0) + 1
  }
  if (sortValue != null) {
    Item[sortKey] = `${sortValue}`
  }
  if (data != null) {
    if (NEW_DATA_STRUCTURE) {
      Item = { ...data, ...Item }
    } else {
      Item.data = data
    }
  }
  if (ttl) {
    const ttlKey = getTTLKey(type)
    Item[ttlKey] = ttl
  }
  let params = {
    TableName,
    // ReturnValues: 'ALL_OLD',
    Item
  }
  // add version check
  if (currentDocVersion) {
    headerWhere = headerWhere || {}
    headerWhere[versionKey] = currentDocVersion
  }
  // add the primary conditions for the "put" to the params to match existing document in the DB..
  if (headerWhere) {
    params = addWhereFilterToParams(params, headerWhere, { headerKey: true, expressionKey: 'ConditionExpression' })
  }
  try {
    await DBClient.put(params).promise()
  } catch (e) {
    if (e.code === 'ConditionalCheckFailedException') {
      console.error('ConditionalCheckFailedException | Failed to put document on query',
        type,
        partitionValue,
        sortValue,
        currentDocVersion,
        inspect(params, { depth: 10 }), e)
    } else {
      console.error(e.code, '| Failed to put document on query',
        type,
        partitionValue,
        sortValue,
        currentDocVersion,
        inspect(params, { depth: 10 }), e)
    }
    throw e
  }
  return Item
}

async function getDocumentForSingleBatch (type, keyPairs) {
  const TableName = getTable(type)
  const partitionKey = getPartitionKey(type)
  const sortKey = getSortKey(type)
  let Keys = _.map(keyPairs, keyPair => {
    const rtn = { [partitionKey]: keyPair.partitionValue }
    if (keyPair.sortValue != null) {
      rtn[sortKey] = keyPair.sortValue
    }
    return rtn
  })
  Keys = _.compact(Keys)
  if (keyPairs.length === 0) {
    return []
  }
  const params = { RequestItems: { [TableName]: { Keys } } }
  let items = []
  try {
    const result = await DBClient.batchGet(params).promise()
    items = _.get(result, `Responses.${TableName}`)
  } catch (e) {
    if (e.code === 'ConditionalCheckFailedException') {
      console.error('ConditionalCheckFailedException | Failed to put document on query',
        type,
        keyPairs,
        inspect(params, { depth: 10 }), e)
    }
    throw e
  }
  return items
}

/**
 * Extends 'origItem' with properties from 'newItem', except for properties
 * where the value is function, null, or undefined.
 *
 * Note: values explicitly set to null in the new item are removed from the original item
 * @param {Object} origItem
 * @param {Object} newItem
 * @param {String[]} [ignoreKeys=[]] - keys in the new item to skip over.
 */
function deepExtend (origItem, newItem, ignoreKeys = []) {
  if (!origItem) { return origItem }
  if (!newItem) { return origItem }
  // ensure that db documents are converted to objects first.
  const newItemData = newItem && newItem.toObject ? newItem.toObject() : newItem
  _.each(newItemData, function (value, key) {
    // null/undefined unsets value in original.
    if (value == null) { delete origItem[key] }
    // ignore excluded keys
    if (_.includes(ignoreKeys, key)) { return }
    // ignore functions
    if (_.isFunction(value)) { return }
    if (_.isArray(value)) {
      origItem[key] = value
    } else if (_.isPlainObject(value)) {
      if (!origItem[key]) { origItem[key] = {} }
      if (_.isPlainObject(origItem[key])) {
        const newIgnoreKeys = _.chain(ignoreKeys)
          .map((exclusion) => { return exclusion.split('.') })
          .filter((splitExclusion) => { return splitExclusion[0] === key })
          .map((splitExclusion) => {
            if (splitExclusion.length > 1) {
              // exclude the current key as we are now 1 level deeper in the extend.
              return splitExclusion.slice(1)
            }
            return null // no further deeper levels to exclude
          })
          .compact()
          .value()
        deepExtend(origItem[key], value, newIgnoreKeys)
      } else {
        // converting from say a string to an object for example fields in the client can be either strings or
        // objects.
        origItem[key] = value
      }
    } else {
      origItem[key] = value
    }
  })
  return origItem
}

// </editor-fold>
