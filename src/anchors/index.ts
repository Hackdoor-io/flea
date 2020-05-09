/**
 * @function headingRegex
 * @description Match text inside heading tags
 * @returns {RegExp}
 */
const headingRegex = (): RegExp =>
  new RegExp('(?<=(?!h1|h2|h3|h4|h5|h6)>)(.+?)(?=</+?(?=h1|h2|h3|h4|h5|h6))', 'ig')

/**
 * @function slugify
 * @param {String} text
 * @returns {String}
 */
const slugify = (text: string): string => {
  // trim string
  text = text.replace(/^\s+|\s+$/g, '')

  // lowercase
  text = text.toLowerCase()

  // remove accents, swap à for a, ñ for n, etc...
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaeeeeiiiioooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  text = text
    .replace(/<[^>]*>/gi, '') // remove internal html tags
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return text
}

/**
 * @function createAnchor
 * @param {String} text
 * @returns {String}
 */
const createAnchor = (text: string): string => {
  return '<a href="#' + slugify(text) + '" class="h-anchor">#</a>'
}

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
