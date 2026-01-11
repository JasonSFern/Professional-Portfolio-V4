/**
 * Generates a random alphanumeric string of the specified length.
 * @param length The desired length of the generated string.
 * @returns A random string containing uppercase, lowercase letters, and digits.
 */
export const makeId = (length: number) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

/**
 * Capitalizes the first character of the given string.
 *
 * @param str - The input string to capitalize.
 * @returns The input string with its first character converted to uppercase.
 */
export const uppercaseFirst = (str: string): string => {
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`
}

/**
 * Converts a hex color code to an RGBA color string.
 * @param hex The hex color code (e.g., "#fff" or "#ffffff").
 * @param alpha The alpha (opacity) value for the color, defaults to 1.
 * @returns The corresponding RGBA color string (e.g., "rgba(255,255,255,1)").
 * @throws Error if the provided hex string is not a valid hex color code.
 */
export const hexToRgba = (hex: string, alpha: number = 1) => {
  var c: any
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255, alpha].join(',') + ')'
  }
  throw new Error('Bad Hex')
}

/**
 * Generates a random alphanumeric string of the specified length.
 * @param length The desired length of the generated string, defaults to 10.
 * @returns A random alphanumeric string.
 */
export const generateRandomString = (length: number = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

/**
 * Truncates a given text to a specified word limit, appending "..." if truncated.
 * @param text The text to truncate.
 * @param wordLimit The maximum number of words allowed before truncation, defaults to 15.
 * @returns The truncated text if it exceeds the word limit, otherwise the original text.
 */
export const truncateText = (text: string, wordLimit: number = 15): string => {
  const words = text.split(' ')
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...'
  }
  return text
}
