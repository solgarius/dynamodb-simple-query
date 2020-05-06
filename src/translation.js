import i18n from 'i18n'
import path from 'path'

let _initialised = false

function init () {
  if (!_initialised) {
    _initialised = true
    i18n.configure({
      locales: ['en', 'en-GB'],
      directory: path.join(__dirname, '../locales')
    })
  }
}

/**
 * Uses the internationalization library to translate to the given locale.
 * @param phrase
 * @param data
 * @param locale
 */
export function translate (phrase, data, locale = 'en-GB') {
  init()
  return i18n.__({ phrase, locale: locale }, data)
}
