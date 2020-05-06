const _ = require('lodash')
const AWS = require('aws-sdk')

const ddb = new AWS.DynamoDB.DocumentClient()

const tableConfig = {
  _default: {
    table: process.env.APPLICATION_TABLE,
    partitionKey: process.env.PARTITION_KEY || 'pk',
    sortKey: process.env.SORT_KEY || 'sk',
    ttlKey: process.env.TTL_KEY || 'expiryTime',
    versionKey: process.env.VERSION_KEY || '__v',
    reverseIndex: process.env.REVERSE_INDEX_KEY || 'reverse'
  },
  _types: {} // override specific keys for a certain data type.
}

/**
 * Configure any overrides from the default environment variables/name.
 * @param {Object} newTableConfig
 * @param {String} [newTableConfig.table] - the default table name in dynamodb for all types (Defaults to environment variable APPLICATION_TABLE).
 * @param {String} [newTableConfig.partitionKey='pk'] - the default partition key in the table (Defaults to environment variable PARTITION_KEY).
 * @param {String} [newTableConfig.sortKey='sk'] - the default sort key in the table (Defaults to environment variable SORT_KEY).
 * @param {String} [newTableConfig.ttlKey='expiryTime'] - the default sort key in the table (Defaults to environment variable TTL_KEY).
 * @param {String} [newTableConfig.versionKey='__v'] - the default version key for documents in table to prevent duplicate write from different sources (Defaults to environment variable VERSION_KEY).
 * @param {String} [newTableConfig.reverseIndex='reverse'] - the name of the reverse index if there is one. (Defaults to environment variable REVERSE_INDEX_KEY).
 */
export function setTableConfig (newTableConfig) {
  // all possible keys that can be set
  const configKeys = ['table', 'partitionKey', 'sortKey', 'ttlKey', 'versionKey', 'reverseIndex']
  if (newTableConfig) {
    _.each(configKeys, configKey => {
      if (newTableConfig[configKey]) {
        tableConfig._default[configKey] = newTableConfig[configKey]
      }
    })
    _.each(newTableConfig.types || {}, (typeConfig, type) => {
      _.each(configKeys, configKey => {
        if (typeConfig[configKey]) {
          tableConfig._types[type] = tableConfig._types[type] || {}
          tableConfig._types[type][configKey] = typeConfig[configKey]
        }
      })
    })
  }
}

export function getTable (type) {
  return getTypePath(type, 'table')
}

export function getReverseIndexName (type) {
  return getTypePath(type, 'reverseIndex')
}

export function getPartitionKey (type) {
  return getTypePath(type, 'partitionKey')
}

export function getSortKey (type) {
  return getTypePath(type, 'sortKey')
}

export function getVersionKey (type) {
  return getTypePath(type, 'versionKey')
}

export function getTTLKey (type) {
  return getTypePath(type, 'ttlKey')
}

/**
 * Finds the value for the given path of the given type. It will use default values if not for that
 * type
 * @param type e.g. user, organisation etc
 * @param path
 * @returns {*}
 */
function getTypePath (type, path) {
  return (type && _.get(tableConfig, `_types.${type}.${path}`)) || _.get(tableConfig, `_default.${path}`)
}

export const DBClient = ddb
