import { WORDS_PER_MIN, CHINESE_KOREAN_READ_TIME } from '../constants'

export const wordsCount = (text: string) => {
  const pattern: string = '\\w+'
  const reg: RegExp = new RegExp(pattern, 'g')
  return (text.match(reg) || []).length
}

export const otherLanguageReadTime = (text: string, readTime: number) => {
  const pattern: string = '[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]'
  const reg: RegExp = new RegExp(pattern, 'g')
  const count: number = (text.match(reg) || []).length
  const time: number = count / readTime
  const formattedString = text.replace(reg, '')
  return {
    count,
    time,
    formattedString
  }
}

export const wordsReadTime = (
  text: string,
  wordsPerMin: number = WORDS_PER_MIN,
  chineseKoreanReadTime: number = CHINESE_KOREAN_READ_TIME
) => {
  const { count: characterCount, time: otherLanguageTime, formattedString } = otherLanguageReadTime(
    text,
    chineseKoreanReadTime
  )
  const wordCount: number = wordsCount(formattedString)
  const wordTime: number = wordCount / wordsPerMin
  return {
    characterCount,
    otherLanguageTime,
    wordTime,
    wordCount
  }
}
