import _ from 'lodash'
import { translate } from '../translation'
import GeneralError from './GeneralError'

const _errors = {
  ORM_PARTITION_KEY_NOT_DEFINED: 'The partition key was not defined.',
  ORM_SORT_KEY_NOT_DEFINED: 'The sort key was not defined.',
  ORM_EXISTS_MUST_BE_BOOLEAN: 'The $exists command must have a boolean (true/false) value got: "{{value}}"',
  ORM_BATCH_WRITE_UNPROCESSED_ITEMS: 'Some items in the batch failed to write after several attempts, please retry the write request.',
  ORM_UPDATE_NOT_EXISTS: 'Batch update failed. Some items in the batch update do not exist.',
  ORM_VERSION_MISMATCH: 'A more recent version of the document exists than the document being updated.'
}

const _codes = {}

_.each(_.keys(_errors), function (code) {
  _codes[code] = code
})

export const CODE = _codes

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
export function getError (code, { data, locale, internalMessage, internalMeta } = {}) {
  const text = getText(code, data, locale)
  const err = new GeneralError(text, { code, data, locale })
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
    return translate(_errors[code], data, locale)
  }
  return translate(_errors.UNKNOWN, null, locale)
}

// </editor-fold desc="Private Functions">
