import { IMAGE_READ_TIME, IMAGE_TAGS } from '../constants'

export const imageCount = (imageTags: Array<String> = IMAGE_TAGS, text: string) => {
  const combinedImageTags: string = imageTags.join('|')
  const pattern: string = `<(${combinedImageTags})([\\w\\W]+?)[\\/]?>`
  const reg: RegExp = new RegExp(pattern, 'g')
  return (text.match(reg) || []).length
}

export const imageReadTime = (
  customImageTime: number = IMAGE_READ_TIME,
  tags: Array<String> = IMAGE_TAGS,
  text: string
) => {
  let seconds: number = 0
  const count = imageCount(tags, text)
  if (count > 10) seconds = (count / 2) * (customImageTime + 3) + (count - 10) * 3
  else seconds = (count / 2) * (2 * customImageTime + (1 - count))
  return {
    time: seconds / 60,
    count
  }
}
