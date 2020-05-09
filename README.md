# Flea

| service   | status                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Codecov   | [![codecov](https://codecov.io/gh/Hackdoor-io/flea/branch/master/graph/badge.svg?token=4YQWKZPX68)](https://codecov.io/gh/Hackdoor-io/flea) |
| GitHub CI | ![Node.js CI](https://github.com/Hackdoor-io/flea/workflows/Node.js%20CI/badge.svg)                                                         |

An immutable, purely functional, type-safe micro-library that exposes some nice utilities for markdown-compilation post processing on both client and server.

# Installation

You can install `flea` from `npm`:

```bash
npm i -s @hackdoor/flea
```

```bash
yarn add @hackdoor/flea
```

# Exported Functions

The list of **flea** exported functions:

- [href](#href)
- [readingTime](#readingTime)

## href

```typescript
import { href } from "@hackdoor/flea";

const replaceHrefs = href({ baseURL: "https://www.google.com" });

const myHTMLInput = `
  <div>
    <p> some text bla bla bla </p>
    <a href="https://www.google.com"> A link to Google </a> <br />
    <a href="https://www.bing.com"> A link to Bing </a> <br />
  </div>
`;

const result = replaceHrefs(myHTMLInput);

//  <div>
//    <p> some text bla bla bla </p>
//    <a href="https://www.google.com"> A link to Google </a> <br />
//    <a target="_blank" href="https://www.bing.com"> A link to Bing </a> <br />
//  </div>
```

**Options**

| name      | required | type      | default value | description                                                                                                           |
| --------- | -------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| baseURL   | `false`  | `string`  | `""`          | the url to prevent for adding `target="_blank"`                                                                       |
| internals | `false`  | `boolean` | `false`       | set to `true` if you want to apply `href` to internals links too (those starting with `/`, for instance: `/articles`) |

## readingTime

```typescript
import { readingTime } from "@hackdoor/flea";
const myHTMLInput = `
  <div>
    <p> some text bla bla bla </p>
    <a href="https://www.google.com"> A link to Google </a> <br />
    <a href="https://www.bing.com"> A link to Bing </a> <br />
  </div>
`;

const readingInfo = readingTime({ text: myHTMLInput });

// {
//    duration: 0.0036363636363636364,
//    imageTime: 0,
//    otherLanguageTime: 0,
//    otherLanguageTimeCharacters: 0,
//    roundedDuration: 1,
//    totalImages: 0,
//    totalWords: 1,
//    wordTime: 0.0036363636363636364
// }
```

**Options**

| name                  | required | type       | default value        | description                                        |
| --------------------- | -------- | ---------- | -------------------- | -------------------------------------------------- |
| text                  | `true`   | `string`   | `""`                 | the text for calculate the reading time            |
| customWordTime        | `false`  | `number`   | `275`                | number of words read per minute                    |
| customImageTime       | `false`  | `number`   | `12`                 | maximum of seconds spent looking at an image       |
| chineseKoreanReadTime | `false`  | `number`   | `500`                | number of chinese and korean words read per minute |
| imageTags             | `false`  | `string[]` | `[ 'img', 'Image' ]` | list of tags to identify images                    |
