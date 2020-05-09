import { imageReadTime } from './utils/imageReadTime'
import { stripWhitespace, stripTags } from './utils'
import { wordsReadTime } from './utils/wordsReadTime'

export type PropsDefinition = {
  text: string
  customWordTime?: number
  customImageTime?: number
  chineseKoreanReadTime?: number
  imageTags?: string[]
}

export type ResponseDefinition = {
  roundedDuration: number
  duration: number
  totalWords: number
  wordTime: number
  totalImages: number
  imageTime: number
  otherLanguageTimeCharacters: number
  otherLanguageTime: number
}

/**
 * @function readingTime
 * @param {PropsDefinition} props
 * @returns {ResponseDefinition}
 */

const readingTime: (props: PropsDefinition) => ResponseDefinition = ({
  text = '',
  customWordTime,
  customImageTime,
  chineseKoreanReadTime,
  imageTags
}: PropsDefinition) => {
  const { time: imageTime, count: imageCount } = imageReadTime(customImageTime, imageTags, text)
  const strippedString = stripTags(stripWhitespace(text))
  const { characterCount, otherLanguageTime, wordTime, wordCount } = wordsReadTime(
    strippedString,
    customWordTime,
    chineseKoreanReadTime
  )

  return {
    wordTime,
    imageTime,
    otherLanguageTime,
    roundedDuration: Math.ceil(imageTime + wordTime),
    duration: imageTime + wordTime,
    totalWords: wordCount,
    totalImages: imageCount,
    otherLanguageTimeCharacters: characterCount
  }
}

export default readingTime
