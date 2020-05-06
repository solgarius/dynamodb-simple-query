// import util from 'util'
import _ from 'lodash'
import { getError, CODE } from './error'

const { ORM_EXISTS_MUST_BE_BOOLEAN } = CODE

/**
 *
 * @param params
 * @param where
 * @param [options]
 * @param {String} [options.expressionKey='FilterExpression'] - The expression key either 'FilterExpression', 'ConditionExpression' or 'KeyConditionExpression'
 * @returns {Object}
 */
export function addWhereFilterToParams (params, where, { expressionKey = 'FilterExpression' } = {}) {
  let expressionTree = ''
  const usedKeys = {}
  let ExpressionAttributeNames = {}
  let ExpressionAttributeValues = {}
  if (where) {
    const cond = getWhereConditions(where, usedKeys, { expressionKey })
    if (cond.expression) {
      expressionTree = cond.expression
      if (cond.ExpressionAttributeNames) {
        ExpressionAttributeNames = { ...ExpressionAttributeNames, ...cond.ExpressionAttributeNames }
      }
      if (cond.ExpressionAttributeValues) {
        ExpressionAttributeValues = { ...ExpressionAttributeValues, ...cond.ExpressionAttributeValues }
      }
    }
  }
  if (_.keys(ExpressionAttributeNames).length > 0) {
    params.ExpressionAttributeNames = params.ExpressionAttributeNames || {}
    params.ExpressionAttributeNames = { ...params.ExpressionAttributeNames, ...ExpressionAttributeNames }
  }
  if (_.keys(ExpressionAttributeValues).length > 0) {
    params.ExpressionAttributeValues = params.ExpressionAttributeValues || {}
    params.ExpressionAttributeValues = { ...params.ExpressionAttributeValues, ...ExpressionAttributeValues }
  }
  if (expressionTree) {
    // convert and join the expression tree of ands/ors etc into normal string syntax.
    const { expression } = flattenExpression(expressionTree)
    params[expressionKey] = expression
  }
  return params
}

/**
 * Recursively iterate through the expression tree of and/or etc. and convert to a string, with brackets when required e.g.
 * swapping from and to or etc.
 *
 * @param expressionTree
 * @returns {{expression: *, anyJoins: boolean}}
 */
function flattenExpression (expressionTree) {
  if (_.isString(expressionTree)) { return { expression: expressionTree, anyJoins: false } }
  let { expressions, join } = expressionTree
  if (!expressions || expressions.length === 0) {
    return { expression: null, anyJoins: false }
  }
  if (expressions) {
    let allExpressionsAreStrings = true
    let allExpressionsAreSameJoin = true
    // remove nulls that may have come through.
    expressions = _.compact(expressions)

    _.each(expressions, childExpression => {
      if (!_.isString(childExpression)) {
        allExpressionsAreStrings = false
        if (childExpression.join !== join) {
          allExpressionsAreSameJoin = false
        }
      }
      // may break out of each loop if no extra info to gain.
      if (!allExpressionsAreSameJoin && !allExpressionsAreStrings) { return false }
    })

    if (allExpressionsAreStrings) {
      return { expression: expressions.join(` ${join} `), anyJoins: expressions.length > 1 }
    }
    const shouldAddBrackets = !allExpressionsAreSameJoin && expressions.length > 1
    const flattenedExpressions = _.chain(expressions).map(childExpressionTree => {
      if (_.isString(childExpressionTree)) { return childExpressionTree }
      const { expression: childExpressionString, anyJoins } = flattenExpression(childExpressionTree)
      return shouldAddBrackets && anyJoins && childExpressionString ? `(${childExpressionString})` : childExpressionString
    }).compact().value()
    return { expression: flattenedExpressions.join(` ${join} `), anyJoins: flattenedExpressions.length > 1 }
  }
  return { expression: null, anyJoins: false }
}

/**
 *
 * @param where
 * @param usedKeys - the keys already used in this query (to prevent duplicates)
 * @param expressionKey
 * @returns {{expression: {join: string, expressions: []}, ExpressionAttributeNames: {}, ExpressionAttributeValues: {}}}
 */
function getWhereConditions (where, usedKeys, { expressionKey } = {}) {
  const expressions = []
  let ExpressionAttributeNames = {}
  let ExpressionAttributeValues = {}
  _.each(where, (whereValue, whereKey) => {
    const cond = getWhereCondition(whereValue, whereKey, usedKeys, { expressionKey })
    if (cond.expression) {
      expressions.push(cond.expression)
      if (cond.ExpressionAttributeNames) {
        ExpressionAttributeNames = { ...ExpressionAttributeNames, ...cond.ExpressionAttributeNames }
      }
      if (cond.ExpressionAttributeValues) {
        ExpressionAttributeValues = { ...ExpressionAttributeValues, ...cond.ExpressionAttributeValues }
      }
    }
  })
  const expression = { expressions, join: 'and' }
  return { expression, ExpressionAttributeNames, ExpressionAttributeValues }
}

/**
 *
 * @param whereValue
 * @param whereKey
 * @param usedKeys - the keys already used in this query (to prevent duplicates)
 * @param [options]
 * @param [options.expressionKey='FilterExpression'] - The key to store the expression in the query parameters.
 * @returns {{expression: string, ExpressionAttributeNames: {}, ExpressionAttributeValues: {}}}
 */
function getWhereCondition (whereValue,
  whereKey, usedKeys,
  { expressionKey = 'FilterExpression' } = {}) {
  let expression = null
  let ExpressionAttributeNames = {}
  let ExpressionAttributeValues = {}
  if (whereKey === '$or' || whereKey === '$and') {
    const expressions = []
    _.each(whereValue, (childWhere) => {
      const cond = getWhereConditions(childWhere, usedKeys, { expressionKey })
      if (cond.expression) {
        expressions.push(cond.expression)
        if (cond.ExpressionAttributeNames) {
          ExpressionAttributeNames = { ...ExpressionAttributeNames, ...cond.ExpressionAttributeNames }
        }
        if (cond.ExpressionAttributeValues) {
          ExpressionAttributeValues = { ...ExpressionAttributeValues, ...cond.ExpressionAttributeValues }
        }
      }
    })
    expression = whereKey === '$or' ? { expressions, join: 'or' } : { expressions, join: 'and' }
    return { expression, ExpressionAttributeNames, ExpressionAttributeValues }
  }
  const { nameKey, conditionKey } = getAttributeKeys(usedKeys, whereKey)
  ExpressionAttributeNames[nameKey] = whereKey
  const { filterExpression, value: newValue } = getWhereFilterExpression(nameKey, conditionKey, whereValue)
  if (_.isArray(newValue) && newValue.length > 0) {
    // multiple values so "OR" them together.
    const orExpressions = []
    const keyRegex = new RegExp(conditionKey, 'g')
    _.each(newValue, (sortKeyData, index) => {
      const valueKey = `${conditionKey}__${index}`
      ExpressionAttributeValues[valueKey] = getAttributeValue(sortKeyData.value)
      orExpressions.push(filterExpression.replace(keyRegex, valueKey))
    })
    expression = { expressions: orExpressions, join: 'or' }
  } else {
    expression = filterExpression
    if (!_.isUndefined(newValue)) {
      ExpressionAttributeValues[conditionKey] = getAttributeValue(newValue)
    }
  }
  return { expression, ExpressionAttributeNames, ExpressionAttributeValues }
}

/**
 * Get a unique attribute name that hasn't been used yet (to prevent duplication of keys)
 * @param usedKeys - the keys already used in this query
 * @param whereKey
 */
function getAttributeKeys (usedKeys, whereKey) {
  if (!_.has(usedKeys, whereKey)) {
    usedKeys[whereKey] = true
    return { nameKey: `#${whereKey}`, conditionKey: `:${whereKey}` }
  }
  let iter = 1
  while (_.has(usedKeys, `${whereKey}_${iter}`)) {
    iter++
  }
  const key = `${whereKey}_${iter}`
  usedKeys[key] = true
  return { nameKey: `#${key}`, conditionKey: `:${key}` }
}

function getAttributeValue (value) {
  return value
}

/**
 *
 * @param nameKey
 * @param conditionKey
 * @param value
 * @returns {{filterExpression: string, value: number}}
 */
function getWhereFilterExpression (nameKey, conditionKey, value) {
  let expPrefix = ''
  let exp = '='
  const keyExpression = nameKey
  if (_.isObject(value)) {
    const objKey = _.keys(value)[0]
    if (objKey === '$eq') {
      // e.g. {$eq: 0}
      value = value.$eq
    } else if (objKey === '$ne') {
      // e.g. {$ne: 0}
      exp = '<>'
      value = value.$ne
    } else if (objKey === '$gt') {
      // e.g. {$gt: 4}
      exp = '>'
      value = value.$gt
    } else if (objKey === '$lt') {
      // e.g. {$lt: 20}
      exp = '<'
      value = value.$lt
    } else if (objKey === '$gte') {
      // e.g. {$gte: 8}
      exp = '>='
      value = value.$gte
    } else if (objKey === '$lte') {
      // e.g. {$lte: 12}
      exp = '<='
      value = value.$lte
    } else if (objKey === '$exists') {
      // e.g. {$exists: true}
      if (value.$exists === true) {
        return { filterExpression: `attribute_exists(${keyExpression})` }
      } else if (value.$exists === false) {
        return { filterExpression: `attribute_not_exists(${keyExpression})` }
      }
      throw getError(ORM_EXISTS_MUST_BE_BOOLEAN, { value: value.$exists })
    } else if (objKey === '$beginsWith') {
      return { filterExpression: `begins_with(${keyExpression}, ${conditionKey})`, value: value.$beginsWith }
    } else if (objKey === '$not') {
      // e.g. { $not: { keyX: 'someValue' } }
      expPrefix = 'NOT '
      value = value.$not
    }
    // TODO more modifiers
  }
  return { filterExpression: `${expPrefix}${keyExpression} ${exp} ${conditionKey}`, value }
}
