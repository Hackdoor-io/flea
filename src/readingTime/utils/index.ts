export const stripWhitespace = (text: string) => {
  return text.replace(/^\s+/, '').replace(/\s+$/, '')
}

export const stripTags = (text: string) => {
  const pattern: string = '<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>'
  const reg: RegExp = new RegExp(pattern, 'gi')
  return text.replace(reg, '')
}
