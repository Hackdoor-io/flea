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
- [anchors](#anchors)
- [href](#href)


## anchors

```typescript
import { anchors } from "@hackdoor/anchors";

const replaceAnchors = anchors();

const myHTMLInput = `
  <div>
    <h1>Lorem Ipsum Dolor Sit Amet</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Consectetur Adipiscing Elit</h2>
    <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.</p>
    <h3>Sed Do Eiusmod Tempor Incididunt Ut</h3>
    <p>Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.</p>
  `;

const result = replaceAnchors(myHTMLInput);
```

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


