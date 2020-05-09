import { IMAGE_READ_TIME, IMAGE_TAGS } from '../constants'

export const imageCount = (imageTags: string[] = IMAGE_TAGS, text: string) => {
  const combinedImageTags: string = imageTags.join('|')
  const pattern: string = `<(${combinedImageTags})([\\w\\W]+?)[\\/]?>`
  const reg: RegExp = new RegExp(pattern, 'g')
  return (text.match(reg) || []).length
}

const getReadTimeTopImages = (count: number, customImageTime: number) =>
  (count / 2) * (customImageTime + 3) + (count - 10) * 3
const getReadTimeOtherImages = (count: number, customImageTime: number) =>
  (count / 2) * (2 * customImageTime + (1 - count))

export const imageReadTime = (
  customImageTime: number = IMAGE_READ_TIME,
  tags: string[] = IMAGE_TAGS,
  text: string
) => {
  let seconds: number = 0
  const count = imageCount(tags, text)
  seconds =
    count > 10
      ? getReadTimeTopImages(count, customImageTime)
      : getReadTimeOtherImages(count, customImageTime)
  return {
    time: seconds / 60,
    count
  }
}
