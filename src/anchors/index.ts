/**
 * @function headingRegex
 * @description Match text inside heading tags
 * @returns {RegExp}
 */
const headingRegex = (): RegExp =>
  new RegExp('(?<=(?!h(|1|2|3|4|5|6))>)(.+?)(?=</+?(?=h(|1|2|3|4|5|6)))', 'ig')

/**
 * @function slugify
 * @param {String} text
 * @returns {String}
 */
const slugify = (text: string): string =>
  ('' + text)
    .replace(/^\s+|\s+$/g, '')
    .toLowerCase()
    .replace(/<[^>]*>/gi, '')
    .replace(/[àáâãäå]/gi, 'a')
    .replace(/[èéëê]/gi, 'e')
    .replace(/[ìíïî]/gi, 'i')
    .replace(/[òóöô]/gi, 'o')
    .replace(/[ùúüû]/gi, 'u')
    .replace(/[ñ]/gi, 'n')
    .replace(/[ç]/gi, 'c')
    .replace(/[^a-z0-9 -]/gi, '')
    .replace(/\s+/gi, '-')
    .split('')
    .map(char => char.replace(/[^\w]/i, '-'))
    .join('')

/**
 * @function createAnchor
 * @param {String} text
 * @returns {String}
 */
const createAnchor = (text: string): string =>
  '<a href="#' + slugify(text) + '" class="h-anchor">#</a>'

/**
 * @function anchors
 * @description returns a function which takes an HTML string as input,
 *              then prepend `<a href="#my-anchor-name">#</a>` before any
 *              heading element such as h1, h2, h3, h4, h5 or h6.
 */
export default () => (HTMLInput: string): string =>
  ('' + HTMLInput).replace(headingRegex(), heading => {
    return createAnchor(heading) + heading
  })
