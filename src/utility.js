import { customAlphabet } from 'nanoid'

const nanoidAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'

export async function wait (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout)
  })
}


/**
 * Gets a nanoId UUID.
 * @param {number} [tokenLen] - The token length defaults to 21 chars
 * @returns {*}
 */
export function getUID (tokenLen = 21) {
  const nanoid = customAlphabet(nanoidAlphabet, tokenLen)
  return nanoid()
}
