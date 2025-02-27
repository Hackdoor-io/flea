import href from '.'

test('Testing Flea without any option', () => {
  const replaceHrefs = href({})
  const HTMLInput = `<a href="https://www.google.com">A link to Google</a>`

  expect(replaceHrefs(HTMLInput)).toBe(
    `<a target="_blank" href="https://www.google.com">A link to Google</a>`
  )
})

test('Testing Flea with baseURL option', () => {
  const replaceHrefs = href({ baseURL: 'https://www.google.com' })
  const HTMLInput = `<a href="https://www.google.com">A link to Google</a>`
  expect(replaceHrefs(HTMLInput)).toBe(`<a href="https://www.google.com">A link to Google</a>`)
})

test('Testing Flea with internal option', () => {
  const replaceHrefs = href({ internal: true })
  const HTMLInput = `<a href="/homepage">An internal link</a>`

  expect(replaceHrefs(HTMLInput)).toBe(`<a target="_blank" href="/homepage">An internal link</a>`)
})

test('Testing Flea with both internal and baseURL options', () => {
  const replaceHrefs = href({ baseURL: 'https://www.google.com', internal: true })
  const HTMLInput = `<div> <a href="/">An internal link</a> <a href="https://www.google.com" />A link to Google</a> </div>`

  expect(replaceHrefs(HTMLInput)).toBe(
    `<div> <a target="_blank" href="/">An internal link</a> <a href="https://www.google.com" />A link to Google</a> </div>`
  )
})

test('Testing Flea with longer html input (no internals)', () => {
  const replaceHrefs = href({ baseURL: 'https://www.google.com', internal: false })
  const HTMLInput = `
  <div>
    <a href="/">An internal link</a> <a href="https://www.google.com" />A link to Google</a>
    <a href="/pages">An internal link to "/pages"</a> <a href="https://www.bing.com" />A link to Google</a>
  </div>`

  expect(replaceHrefs(HTMLInput)).toBe(`
  <div>
    <a href="/">An internal link</a> <a href="https://www.google.com" />A link to Google</a>
    <a href="/pages">An internal link to "/pages"</a> <a target="_blank" href="https://www.bing.com" />A link to Google</a>
  </div>`)
})

test('Testing Flea with longer html input (with internals)', () => {
  const replaceHrefs = href({ baseURL: 'https://www.google.com', internal: true })
  const HTMLInput = `
  <div>
    <a href="/">An internal link</a> <a href="https://www.google.com" />A link to Google</a>
    <a href="/pages">An internal link to "/pages"</a> <a href="https://www.bing.com" />A link to Google</a>
  </div>`

  expect(replaceHrefs(HTMLInput)).toBe(`
  <div>
    <a target="_blank" href="/">An internal link</a> <a href="https://www.google.com" />A link to Google</a>
    <a target="_blank" href="/pages">An internal link to "/pages"</a> <a target="_blank" href="https://www.bing.com" />A link to Google</a>
  </div>`)
})
