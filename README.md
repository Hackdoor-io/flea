An immutable, purely functional micro-library to add `target="_blanl"` to any link inside an HTML string. Works both on server and Node.js

# Installation

You can install `flea` from `npm`:

```bash
npm i -s flea
```

```bash
yarn add flea
```

# Usage

```typescript
import Flea from "flea";

const flea = Flea({ baseURL: "https://www.google.com" });

const myHTMLInput = `
  <div>
    <p> some text bla bla bla </p>
    <a href="https://www.google.com"> A link to Google </a> <br />
    <a href="https://www.bing.com"> A link to Bing </a> <br />
  </div>
`;

const result = flea(myHTMLInput);

//  <div>
//    <p> some text bla bla bla </p>
//    <a href="https://www.google.com"> A link to Google </a> <br />
//    <a target="_blank" href="https://www.bing.com"> A link to Bing </a> <br />
//  </div>
```

# Options

Flea currently supports two options:
