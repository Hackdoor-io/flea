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
  text
    .toLowerCase()
    .replace(/^\s+|\s+$/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéëê]/g, 'e')
    .replace(/[ìíïî]/g, 'i')
    .replace(/[òóöô]/g, 'o')
    .replace(/[ùúüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')

/**
 * @function createAnchor
 * @param {String} slug
 * @returns {String}
 */
const createAnchor = (slug: string): string =>
  `<a id="${slug}" href="#${slug}" class="h-anchor">#</a>`

/**
 * @function anchors
 * @description returns a function which takes an HTML string as input,
 *              then prepend `<a href="#my-anchor-name">#</a>` before any
 *              heading element such as h1, h2, h3, h4, h5 or h6.
 */
export default () => (HTMLInput: string): string =>
  ('' + HTMLInput).replace(headingRegex(), heading => {
    return createAnchor(slugify(heading)) + heading
  })
