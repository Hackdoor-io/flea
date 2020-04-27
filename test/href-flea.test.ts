import Flea from "../src/href-flea";

test("Testing Flea without any option", () => {
  const flea = Flea({});
  const HTMLInput = `<a href="https://www.google.com">A link to Google</a>`;

  expect(flea(HTMLInput)).toBe(
    `<a target="_blank" href="https://www.google.com">A link to Google</a>`
  );
});

test("Testing Flea with baseURL option", () => {
  const flea = Flea({ baseURL: "https://www.google.com" });
  const HTMLInput = `<a href="https://www.google.com">A link to Google</a>`;

  expect(flea(HTMLInput)).toBe(`<a href="https://www.google.com">A link to Google</a>`);
});

test("Testing Flea with internal option", () => {
  const flea = Flea({ internal: true });
  const HTMLInput = `<a href="/" />An internal link</a>`;

  expect(flea(HTMLInput)).toBe(`<a target="_blank" href="/" />An internal link</a>`);
});

test("Testing Flea with both internal and baseURL options", () => {
  const flea = Flea({ baseURL: "https://www.google.com", internal: false });
  const HTMLInput = `<div> <a href="/">An internal link</a> <a href="https://www.google.com" />A link to Google</a> </div>`;

  expect(flea(HTMLInput)).toBe(
    `<div> <a target="_blank" href="/">An internal link</a> <a href="https://www.google.com" />A link to Google</a> </div>`
  );
});
