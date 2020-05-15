import { parse, HTMLElement } from 'node-html-parser'

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
 * @function prependAnchors
 * @param {String} html
 * @returns {String}
 */
const prependAnchors = (html: string): string => {
  const root = parse(html) as HTMLElement

  const headings = root.querySelectorAll('h1,h2,h3,h4,h5,h6')

  headings.forEach(el => {
    el.set_content(`${createAnchor(slugify(el.rawText))}${el.innerHTML}`)
  })

  return root.toString()
}

/**
 * @function anchors
 * @description returns a function which takes an HTML string as input,
 *              then prepend `<a href="#my-anchor-name">#</a>` before any
 *              heading element such as h1, h2, h3, h4, h5 or h6.
 */
export default () => (HTMLInput: string): string => {
  return prependAnchors(HTMLInput)
}
