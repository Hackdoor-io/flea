import anchors from '.'

test('Testing anchors', () => {
  const replaceAnchors = anchors()
  const HTMLInput = `
    <h1>Lorem Ipsum Dolor Sit Amet</h1>
    <h2>consectetur adipiscing elit</h2>
    <h3>sed do eiusmod tempor incididunt ut</h3>
    <h4>Aliquam faucibus, elit ut dictum aliquet</h4>
    <p>Do not match</p>
    <h5>Lòrém Ipsùm!!! Dolor sit àmèt?</h5>
    <h6>felis nisl adipiscing sapien</h6>
  `

  expect(replaceAnchors(HTMLInput)).toBe(`
    <h1><a href="#lorem-ipsum-dolor-sit-amet" class="h-anchor">#</a>Lorem Ipsum Dolor Sit Amet</h1>
    <h2><a href="#consectetur-adipiscing-elit" class="h-anchor">#</a>consectetur adipiscing elit</h2>
    <h3><a href="#sed-do-eiusmod-tempor-incididunt-ut" class="h-anchor">#</a>sed do eiusmod tempor incididunt ut</h3>
    <h4><a href="#aliquam-faucibus-elit-ut-dictum-aliquet" class="h-anchor">#</a>Aliquam faucibus, elit ut dictum aliquet</h4>
    <p>Do not match</p>
    <h5><a href="#lorem-ipsum-dolor-sit-amet" class="h-anchor">#</a>Lòrém Ipsùm!!! Dolor sit àmèt?</h5>
    <h6><a href="#felis-nisl-adipiscing-sapien" class="h-anchor">#</a>felis nisl adipiscing sapien</h6>
  `)
})

test('Testing anchors with nested html tags', () => {
  const replaceAnchors = anchors()
  const HTMLInput = `
    <h2><i>Lorem Ipsum Dolor Sit Amet</i></h2>
  `

  expect(replaceAnchors(HTMLInput)).toBe(`
    <h2><a href="#lorem-ipsum-dolor-sit-amet" class="h-anchor">#</a><i>Lorem Ipsum Dolor Sit Amet</i></h2>
  `)
})
