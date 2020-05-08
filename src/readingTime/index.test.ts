import readingTime from '.'
import { stripTags, stripWhitespace } from './utils'
import { imageReadTime, imageCount } from './utils/imageReadTime'
import { wordsCount, otherLanguageReadTime, wordsReadTime } from './utils/wordsReadTime'
import { CHINESE_KOREAN_READ_TIME, IMAGE_READ_TIME, IMAGE_TAGS } from './constants'
import longHtml from './__test__/longHtml'

test('[readingTime] Testing base readingTime', () => {
  const text = new Array(1000000).fill('a').join('asd')
  expect(readingTime({ text })).toEqual({
    duration: 0.0036363636363636364,
    imageTime: 0,
    otherLanguageTime: 0,
    otherLanguageTimeCharacters: 0,
    roundedDuration: 1,
    totalImages: 0,
    totalWords: 1,
    wordTime: 0.0036363636363636364
  })
})

test('[readingTime] Testing long readingTime', () => {
  expect(readingTime({ text: longHtml })).toEqual({
    duration: 5.957878787878788,
    imageTime: 0.38333333333333336,
    otherLanguageTime: 0,
    otherLanguageTimeCharacters: 0,
    roundedDuration: 6,
    totalImages: 2,
    totalWords: 1533,
    wordTime: 5.574545454545454
  })
})

test('[stripTags] utility method', () => {
  const testString = '<div>Test String</div>'
  const outputString = 'Test String'
  expect(stripTags(testString)).toBe(outputString)
})

test('[imageCount] should be able to count nil image tags', () => {
  const testString = ''
  expect(imageCount(IMAGE_TAGS, testString)).toBe(0)
})

test('[imageCount] should be able to count image to be 2', () => {
  const testString = '<Image/><Image/>'
  expect(imageCount(IMAGE_TAGS, testString)).toBe(2)
})

test('[imageReadTime] should be able return read time if count is greater than 10', () => {
  const testString = '<Image/><Image/><Image/><Image/><Image/><img/><img/><img/><img/><img/><img/>'
  expect(imageReadTime(IMAGE_READ_TIME, IMAGE_TAGS, testString)).toEqual({ count: 11, time: 1.425 })
})

test('[imageReadTime] should be able return read time if count is less than 10', () => {
  const testString = '<Image/><Image/><Image/>'
  expect(imageReadTime(IMAGE_READ_TIME, IMAGE_TAGS, testString)).toEqual({ count: 3, time: 0.55 })
})

test('[stripWhitespace] should be able strip leading or trailing whitespace from a string', () => {
  const testString = '  Test String  '
  const outputString = 'Test String'
  expect(stripWhitespace(testString)).toBe(outputString)
})

test('[wordsCount] should be able to count nil words', () => {
  const testString = ''
  expect(wordsCount(testString)).toBe(0)
})

test('[wordsCount] should be able to count words count to be 2', () => {
  const testString = 'Test String'
  expect(wordsCount(testString)).toBe(2)
})

test('[otherLanguageReadTime] should be able to count other language characters', () => {
  const testString = 'Test String测试字符串'
  const outputString = 'Test String'
  expect(otherLanguageReadTime(testString, CHINESE_KOREAN_READ_TIME)).toEqual({
    count: 5,
    time: 5 / CHINESE_KOREAN_READ_TIME,
    formattedString: outputString
  })
})

test('[wordsReadTime] should be calculate words read time', () => {
  const testString = 'Test String'
  expect(wordsReadTime(testString)).toEqual({
    characterCount: 0,
    otherLanguageTime: 0,
    wordCount: 2,
    wordTime: 0.007272727272727273
  })
})
