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

### href

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
