interface Options {
  baseURL?: string;
  internal?: boolean;
}

export const escapeRegexChars = (re: string): string =>
  re.replace(/\./g, "\\.").replace(/\//g, "\\/");

export const composeBaseURLRegex = ({ baseURL = "", internal = false }: Options): RegExp =>
  new RegExp(`<a\\s+href=(?!"(${escapeRegexChars(baseURL)}${internal ? "|\\/.+" : ""}.+))`, "gim");

export const replaceRegex = (options: Options): RegExp =>
  options.baseURL ? composeBaseURLRegex(options) : /<a\s+href=/gi;

export default function flea(options: Options): (HTMLInput: string) => string {
  return (HTMLInput: string = ""): string =>
    ("" + HTMLInput).replace(replaceRegex(options), '<a target="_blank" href=');
}
