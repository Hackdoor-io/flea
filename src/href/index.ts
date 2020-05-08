export type Options = {
  baseURL?: string
  internal?: boolean
}

/**
 * @function escapeRegexChars
 * @param {String} re
 * @returns {String}
 */

const escapeRegexChars = (re: string): string => re.replace(/\./g, '\\.').replace(/\//g, '\\/')

/**
 * @function internalHref
 * @param {Boolean} internal
 * @returns {String}
 */

const internalHref = (internal: boolean): string => (internal ? '' : '|\\/.+')

/**
 * @function composeBaseURLRegex
 * @param {Options} options
 * @returns {RegExp}
 */

const composeBaseURLRegex = ({ baseURL = '_', internal = false }: Options): RegExp =>
  new RegExp(`<a\\s+href=(?!"(${escapeRegexChars(baseURL)}${internalHref(internal)}))`, 'gim')

/**
 * @function replaceRegex
 * @param {Options} options
 * @returns {RegExp}
 */

const replaceRegex = (options: Options): RegExp =>
  options.baseURL || options.internal ? composeBaseURLRegex(options) : /<a\s+href=/gi

/**
 * @function flea
 * @returns {Function}
 * @sign flea :: Options -> String -> String
 * @description returns a function which takes an HTML string as input,
 *              then adds `target="_blank"` to any link depending on the
 *              passed options object.
 */

const flea = (options: Options) => (HTMLInput: string): string =>
  ('' + HTMLInput).replace(replaceRegex(options), '<a target="_blank" href=')

export default flea
