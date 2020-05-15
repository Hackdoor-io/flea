import anchors from '.'

test('Testing anchors', () => {
  const replaceAnchors = anchors()
  const HTMLInput = `
    <h1>Lorem Ipsum Dolor Sit Amet</h1>
    <h2>consectetur adipiscing elit</h2>
    <h3>sed do eiusmod tempor incididunt ut</h3>
    <h4>Aliquam faucibus, elit ut dictum aliquet</h4>
    <p>Do not match</p>
    <h5>Lòrém Ipsùm!!! Dolor sit àmètt?</h5>
    <h6>felis nisl adipiscing sapien</h6>
  `

  expect(replaceAnchors(HTMLInput)).toBe(`
    <h1><a id="lorem-ipsum-dolor-sit-amet" href="#lorem-ipsum-dolor-sit-amet" class="h-anchor">#</a>Lorem Ipsum Dolor Sit Amet</h1>
    <h2><a id="consectetur-adipiscing-elit" href="#consectetur-adipiscing-elit" class="h-anchor">#</a>consectetur adipiscing elit</h2>
    <h3><a id="sed-do-eiusmod-tempor-incididunt-ut" href="#sed-do-eiusmod-tempor-incididunt-ut" class="h-anchor">#</a>sed do eiusmod tempor incididunt ut</h3>
    <h4><a id="aliquam-faucibus-elit-ut-dictum-aliquet" href="#aliquam-faucibus-elit-ut-dictum-aliquet" class="h-anchor">#</a>Aliquam faucibus, elit ut dictum aliquet</h4>
    <p>Do not match</p>
    <h5><a id="lorem-ipsum-dolor-sit-amett" href="#lorem-ipsum-dolor-sit-amett" class="h-anchor">#</a>Lòrém Ipsùm!!! Dolor sit àmètt?</h5>
    <h6><a id="felis-nisl-adipiscing-sapien" href="#felis-nisl-adipiscing-sapien" class="h-anchor">#</a>felis nisl adipiscing sapien</h6>
  `)
})

test('Testing anchors with nested html tags', () => {
  const replaceAnchors = anchors()
  const HTMLInput = `
    <h2><i>Lorem Ipsum Dolor Sit Amet</i></h2>
  `

  expect(replaceAnchors(HTMLInput)).toBe(`
    <h2><a id="lorem-ipsum-dolor-sit-amet" href="#lorem-ipsum-dolor-sit-amet" class="h-anchor">#</a><i>Lorem Ipsum Dolor Sit Amet</i></h2>
  `)
})

test('Testing html with no headings', () => {
  const replaceAnchors = anchors()
  const HTMLInput = `
    <strong>Testing html with no headings</strong>
    <p>Lorem Ipsum Dolor Sit Amet lorem ipsum</p>
    <p><i>Lorem Ipsum Dolor Sit Amet</i></p>
  `

  expect(replaceAnchors(HTMLInput)).toBe(`
    <strong>Testing html with no headings</strong>
    <p>Lorem Ipsum Dolor Sit Amet lorem ipsum</p>
    <p><i>Lorem Ipsum Dolor Sit Amet</i></p>
  `)
})

test('Testing simple string', () => {
  const replaceAnchors = anchors()
  const HTMLInput = `
    this is a simple string with no html tags
  `

  expect(replaceAnchors(HTMLInput)).toBe(`
    this is a simple string with no html tags
  `)
})

test('Testing html with preformatted text', () => {
  const replaceAnchors = anchors()
  const HTMLInput = `
    <h1>My heading title</h1>
    <p>this is a simple paragraph</p>
    <strong>lorem ipsum dolor sit amet</strong>
    <pre>preformatted text</pre>
    <h2>Another heading title</h2>
    <p>another paragraph</p>
    <pre><code>alert('hello world!')</code></pre>
    <p>lorem ipsum dolor sit amet</p>
  `

  expect(replaceAnchors(HTMLInput)).toBe(`
    <h1><a id="my-heading-title" href="#my-heading-title" class="h-anchor">#</a>My heading title</h1>
    <p>this is a simple paragraph</p>
    <strong>lorem ipsum dolor sit amet</strong>
    <pre>preformatted text</pre>
    <h2><a id="another-heading-title" href="#another-heading-title" class="h-anchor">#</a>Another heading title</h2>
    <p>another paragraph</p>
    <pre><code>alert('hello world!')</code></pre>
    <p>lorem ipsum dolor sit amet</p>
  `)
})
