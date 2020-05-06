/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return translate; });
/* harmony import */ var i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);



let _initialised = false

function init () {
  if (!_initialised) {
    _initialised = true
    i18n__WEBPACK_IMPORTED_MODULE_0___default.a.configure({
      locales: ['en', 'en-GB'],
      directory: path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '../locales')
    })
  }
}

/**
 * Uses the internationalization library to translate to the given locale.
 * @param phrase
 * @param data
 * @param locale
 */
function translate (phrase, data, locale = 'en-GB') {
  init()
  return i18n__WEBPACK_IMPORTED_MODULE_0___default.a.__({ phrase, locale: locale }, data)
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("i18n");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("promise-limit");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nanoid");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "setTableConfig", function() { return /* reexport */ setTableConfig; });
__webpack_require__.d(__webpack_exports__, "ID_LENGTH", function() { return /* reexport */ ID_LENGTH; });
__webpack_require__.d(__webpack_exports__, "getId", function() { return /* reexport */ getId; });
__webpack_require__.d(__webpack_exports__, "getOneDocument", function() { return /* reexport */ getOneDocument; });
__webpack_require__.d(__webpack_exports__, "getDocuments", function() { return /* reexport */ getDocuments; });
__webpack_require__.d(__webpack_exports__, "createDocument", function() { return /* reexport */ createDocument; });
__webpack_require__.d(__webpack_exports__, "updateDocument", function() { return /* reexport */ updateDocument; });
__webpack_require__.d(__webpack_exports__, "upsertDocument", function() { return /* reexport */ upsertDocument; });
__webpack_require__.d(__webpack_exports__, "removeDocument", function() { return /* reexport */ removeDocument; });
__webpack_require__.d(__webpack_exports__, "removeManyDocuments", function() { return /* reexport */ removeManyDocuments; });
__webpack_require__.d(__webpack_exports__, "batchGetDocuments", function() { return /* reexport */ batchGetDocuments; });
__webpack_require__.d(__webpack_exports__, "batchUpdateDocuments", function() { return /* reexport */ batchUpdateDocuments; });
__webpack_require__.d(__webpack_exports__, "batchWriteDocuments", function() { return /* reexport */ batchWriteDocuments; });
__webpack_require__.d(__webpack_exports__, "rawBatchWrite", function() { return /* reexport */ rawBatchWrite; });

// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(1);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(0);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// EXTERNAL MODULE: external "promise-limit"
var external_promise_limit_ = __webpack_require__(4);
var external_promise_limit_default = /*#__PURE__*/__webpack_require__.n(external_promise_limit_);

// EXTERNAL MODULE: external "nanoid"
var external_nanoid_ = __webpack_require__(5);

// CONCATENATED MODULE: ./src/utility.js


const nanoidAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'

async function wait (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout)
  })
}


/**
 * Gets a nanoId UUID.
 * @param {number} [tokenLen] - The token length defaults to 21 chars
 * @returns {*}
 */
function getUID (tokenLen = 21) {
  const nanoid = Object(external_nanoid_["customAlphabet"])(nanoidAlphabet, tokenLen)
  return nanoid()
}

// EXTERNAL MODULE: ./src/translation.js
var translation = __webpack_require__(2);

// CONCATENATED MODULE: ./src/error/GeneralError.js


class GeneralError_GeneralError extends Error {
  constructor (message, { code, data, errorId } = {}) {
    super(message)
    this.name = 'GeneralError'
    this.message = message || 'An Unknown Error occurred.'
    this.errorId = errorId || getUID(10)
    if (code != null) { this.code = code }
    if (data != null) { this.data = data }
  }
}

Object.defineProperty(GeneralError_GeneralError.prototype, 'name', {
  value: GeneralError_GeneralError.name,
  configurable: true,
  writable: true
})

// CONCATENATED MODULE: ./src/error/index.js




const _errors = {
  ORM_PARTITION_KEY_NOT_DEFINED: 'The partition key was not defined.',
  ORM_SORT_KEY_NOT_DEFINED: 'The sort key was not defined.',
  ORM_EXISTS_MUST_BE_BOOLEAN: 'The $exists command must have a boolean (true/false) value got: "{{value}}"',
  ORM_BATCH_WRITE_UNPROCESSED_ITEMS: 'Some items in the batch failed to write after several attempts, please retry the write request.',
  ORM_UPDATE_NOT_EXISTS: 'Batch update failed. Some items in the batch update do not exist.',
  ORM_VERSION_MISMATCH: 'A more recent version of the document exists than the document being updated.'
}

const _codes = {}

external_lodash_default.a.each(external_lodash_default.a.keys(_errors), function (code) {
  _codes[code] = code
})

const CODE = _codes

// <editor-fold desc="Public Functions">

/**
 * Creates a General Error for the given code/data.
 * @param {String} code - Commazero error code
 * @param {Object} data - Data for the error
 * @param {String} locale - locale to translate the error to.
 * @param {String} internalMessage - internal message that is logged out to give more information about the error
 * in the logs but we don't want the user to know this information.
 * @param {Object} internalMeta - data that contributed to the error, used for debugging
 * @returns {GeneralError}
 */
function getError (code, { data, locale, internalMessage, internalMeta } = {}) {
  const text = getText(code, data, locale)
  const err = new GeneralError_GeneralError(text, { code, data, locale })
  if (internalMeta && internalMessage) {
    console.error(`ERROR ID | ${err.errorId} | ${err.message} | ${internalMessage}`, internalMeta)
  } else if (internalMessage) {
    console.error(`ERROR ID | ${err.errorId} | ${err.message} | ${internalMessage}`)
  } else if (internalMeta) {
    console.error(`ERROR ID | ${err.errorId} | ${err.message}`, internalMeta)
  } else {
    console.error(`ERROR ID | ${err.errorId} | ${err.message}`)
  }
  return err
}

// </editor-fold desc="Public Functions">

// <editor-fold desc="Private Functions">

function getText (code, data, locale) {
  if (_errors[code]) {
    return Object(translation["a" /* translate */])(_errors[code], data, locale)
  }
  return Object(translation["a" /* translate */])(_errors.UNKNOWN, null, locale)
}

// </editor-fold desc="Private Functions">

// CONCATENATED MODULE: ./src/queryBuilder.js
// import util from 'util'



const { ORM_EXISTS_MUST_BE_BOOLEAN } = CODE

/**
 *
 * @param params
 * @param where
 * @param [options]
 * @param {String} [options.expressionKey='FilterExpression'] - The expression key either 'FilterExpression', 'ConditionExpression' or 'KeyConditionExpression'
 * @returns {Object}
 */
function addWhereFilterToParams (params, where, { expressionKey = 'FilterExpression' } = {}) {
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
  if (external_lodash_default.a.keys(ExpressionAttributeNames).length > 0) {
    params.ExpressionAttributeNames = params.ExpressionAttributeNames || {}
    params.ExpressionAttributeNames = { ...params.ExpressionAttributeNames, ...ExpressionAttributeNames }
  }
  if (external_lodash_default.a.keys(ExpressionAttributeValues).length > 0) {
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
  if (external_lodash_default.a.isString(expressionTree)) { return { expression: expressionTree, anyJoins: false } }
  let { expressions, join } = expressionTree
  if (!expressions || expressions.length === 0) {
    return { expression: null, anyJoins: false }
  }
  if (expressions) {
    let allExpressionsAreStrings = true
    let allExpressionsAreSameJoin = true
    // remove nulls that may have come through.
    expressions = external_lodash_default.a.compact(expressions)

    external_lodash_default.a.each(expressions, childExpression => {
      if (!external_lodash_default.a.isString(childExpression)) {
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
    const flattenedExpressions = external_lodash_default.a.chain(expressions).map(childExpressionTree => {
      if (external_lodash_default.a.isString(childExpressionTree)) { return childExpressionTree }
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
  external_lodash_default.a.each(where, (whereValue, whereKey) => {
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
    external_lodash_default.a.each(whereValue, (childWhere) => {
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
  if (external_lodash_default.a.isArray(newValue) && newValue.length > 0) {
    // multiple values so "OR" them together.
    const orExpressions = []
    const keyRegex = new RegExp(conditionKey, 'g')
    external_lodash_default.a.each(newValue, (sortKeyData, index) => {
      const valueKey = `${conditionKey}__${index}`
      ExpressionAttributeValues[valueKey] = getAttributeValue(sortKeyData.value)
      orExpressions.push(filterExpression.replace(keyRegex, valueKey))
    })
    expression = { expressions: orExpressions, join: 'or' }
  } else {
    expression = filterExpression
    if (!external_lodash_default.a.isUndefined(newValue)) {
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
  if (!external_lodash_default.a.has(usedKeys, whereKey)) {
    usedKeys[whereKey] = true
    return { nameKey: `#${whereKey}`, conditionKey: `:${whereKey}` }
  }
  let iter = 1
  while (external_lodash_default.a.has(usedKeys, `${whereKey}_${iter}`)) {
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
  if (external_lodash_default.a.isObject(value)) {
    const objKey = external_lodash_default.a.keys(value)[0]
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

// CONCATENATED MODULE: ./src/config.js
const _ = __webpack_require__(0)
const AWS = __webpack_require__(7)

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
function setTableConfig (newTableConfig) {
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

function getTable (type) {
  return getTypePath(type, 'table')
}

function getReverseIndexName (type) {
  return getTypePath(type, 'reverseIndex')
}

function getPartitionKey (type) {
  return getTypePath(type, 'partitionKey')
}

function getSortKey (type) {
  return getTypePath(type, 'sortKey')
}

function getVersionKey (type) {
  return getTypePath(type, 'versionKey')
}

function getTTLKey (type) {
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

const DBClient = ddb

// CONCATENATED MODULE: ./src/orm.js








const { ORM_UPDATE_NOT_EXISTS, ORM_VERSION_MISMATCH, ORM_PARTITION_KEY_NOT_DEFINED, ORM_SORT_KEY_NOT_DEFINED, ORM_BATCH_WRITE_UNPROCESSED_ITEMS } = CODE

const ID_LENGTH = 16
const MAX_DYNAMO_BATCH_SIZE = 25
const NEW_DATA_STRUCTURE = true

// <editor-fold desc="Public Functions">
function getId () {
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
async function getOneDocument (type, partitionValue, sortValue, options = {}) {
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
async function getDocuments (type, partitionValue, sortValue, options = {}) {
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
async function createDocument (type, partitionValue, sortValue, data, { pkGlobalUnique = false, ttl = null } = {}) {
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
async function batchUpdateDocuments (type, items, { delta = true, ttl = null, errorOnMissing = false } = {}) {
  items = items || []
  const keyPairs = external_lodash_default.a.map(items, item => {
    return { partitionValue: item.partitionValue, sortValue: item.sortValue }
  })
  const existingDocs = await batchGetDocuments(type, keyPairs)
  const partitionKey = getPartitionKey(type)
  const sortKey = getSortKey(type)
  // extend items with existing docs and throw errors if data is missing or incorrect
  external_lodash_default.a.each(items, item => {
    const findObj = { [partitionKey]: item.partitionValue }
    if (item.sortValue) { findObj[sortKey] = item.sortValue }
    const existing = external_lodash_default.a.find(existingDocs, findObj)
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
  return external_lodash_default.a.map(items, 'data')
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
async function updateDocument (type, partitionValue, sortValue, data, { delta = true, ttl = null, returnOriginal = false } = {}) {
  const existing = await getOneDocument(type, partitionValue, sortValue)
  let originalItem = null
  if (returnOriginal) {
    originalItem = external_lodash_default.a.cloneDeep(existing)
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
async function upsertDocument (type, partitionValue, sortValue, data, { delta = true, ttl = null } = {}) {
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
async function removeDocument (type, partitionValue, sortValue) {
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
async function removeManyDocuments (type, partitionValue, sortValue, lookupOptions = {}) {
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
  const writeDocs = external_lodash_default.a.map(items, doc => {
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
async function batchGetDocuments (type, keyPairs) {
  // create batches of 100 for querying from the db, as limit is 100 items in dynamodb.
  const batches = external_lodash_default.a.chunk(keyPairs, 100)
  const requests = external_lodash_default.a.map(batches, async function (batch) {
    return getDocumentForSingleBatch(type, batch)
  })
  const results = await Promise.all(requests)
  return external_lodash_default.a.flatten(results) // reduce 1 level as results is an array of results of batches.
}

/**
 * Writes a batch of items of the given type to the db.
 * @param type
 * @param items
 * @returns {Promise<*>}
 */
async function batchWriteDocuments (type, items) {
  if (items.length > MAX_DYNAMO_BATCH_SIZE) {
    const chunks = external_lodash_default.a.chunk(items, MAX_DYNAMO_BATCH_SIZE)
    const limit = external_promise_limit_default()(10)
    const promises = external_lodash_default.a.map(chunks, (chunk) => {
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
    tableItems = external_lodash_default.a.map(items, (item) => {
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
async function rawBatchWrite (TableName, tableItems, attempt = 1, waitTime = 50) {
  const maxRetry = 20
  const maxWaitTime = 2000 // ms
  const scalingFactor = 2 // multiply time by 2 each failure.

  const params = { RequestItems: { [TableName]: tableItems } }
  const response = await DBClient.batchWrite(params).promise()
  const failedItems = external_lodash_default.a.get(response, `UnprocessedItems.${TableName}`) || []
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
        Object(external_util_["inspect"])(params, { depth: 10 }), e)
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
        Object(external_util_["inspect"])(params, { depth: 10 }), e)
    } else {
      console.error(e.code, '| Failed to put document on query',
        type,
        partitionValue,
        sortValue,
        currentDocVersion,
        Object(external_util_["inspect"])(params, { depth: 10 }), e)
    }
    throw e
  }
  return Item
}

async function getDocumentForSingleBatch (type, keyPairs) {
  const TableName = getTable(type)
  const partitionKey = getPartitionKey(type)
  const sortKey = getSortKey(type)
  let Keys = external_lodash_default.a.map(keyPairs, keyPair => {
    const rtn = { [partitionKey]: keyPair.partitionValue }
    if (keyPair.sortValue != null) {
      rtn[sortKey] = keyPair.sortValue
    }
    return rtn
  })
  Keys = external_lodash_default.a.compact(Keys)
  if (keyPairs.length === 0) {
    return []
  }
  const params = { RequestItems: { [TableName]: { Keys } } }
  let items = []
  try {
    const result = await DBClient.batchGet(params).promise()
    items = external_lodash_default.a.get(result, `Responses.${TableName}`)
  } catch (e) {
    if (e.code === 'ConditionalCheckFailedException') {
      console.error('ConditionalCheckFailedException | Failed to put document on query',
        type,
        keyPairs,
        Object(external_util_["inspect"])(params, { depth: 10 }), e)
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
  external_lodash_default.a.each(newItemData, function (value, key) {
    // null/undefined unsets value in original.
    if (value == null) { delete origItem[key] }
    // ignore excluded keys
    if (external_lodash_default.a.includes(ignoreKeys, key)) { return }
    // ignore functions
    if (external_lodash_default.a.isFunction(value)) { return }
    if (external_lodash_default.a.isArray(value)) {
      origItem[key] = value
    } else if (external_lodash_default.a.isPlainObject(value)) {
      if (!origItem[key]) { origItem[key] = {} }
      if (external_lodash_default.a.isPlainObject(origItem[key])) {
        const newIgnoreKeys = external_lodash_default.a.chain(ignoreKeys)
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

// CONCATENATED MODULE: ./src/index.js







/***/ })
/******/ ]);