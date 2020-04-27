export interface Options {
  baseURL?: string
  internal?: boolean
}

const escapeRegexChars = (re: string): string => re.replace(/\./g, '\\.').replace(/\//g, '\\/')

const internalHref = (internal: boolean): string => (internal ? '' : '|\\/.+')

const composeBaseURLRegex = ({ baseURL = '_', internal = false }: Options): RegExp =>
  new RegExp(`<a\\s+href=(?!"(${escapeRegexChars(baseURL)}${internalHref(internal)}))`, 'gim')

const replaceRegex = (options: Options): RegExp =>
  options.baseURL || options.internal ? composeBaseURLRegex(options) : /<a\s+href=/gi

const flea = (options: Options) => (HTMLInput: string): string =>
  ('' + HTMLInput).replace(replaceRegex(options), '<a target="_blank" href=')

export default flea
