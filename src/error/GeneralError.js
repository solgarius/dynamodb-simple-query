import { getUID } from '../utility'

export default class GeneralError extends Error {
  constructor (message, { code, data, errorId } = {}) {
    super(message)
    this.name = 'GeneralError'
    this.message = message || 'An Unknown Error occurred.'
    this.errorId = errorId || getUID(10)
    if (code != null) { this.code = code }
    if (data != null) { this.data = data }
  }
}

Object.defineProperty(GeneralError.prototype, 'name', {
  value: GeneralError.name,
  configurable: true,
  writable: true
})
