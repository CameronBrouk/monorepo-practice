// Documentation for this file: https://prettier.io/en/configuration.html
module.exports = {
  // Use .gitattributes to manage newlines
  endOfLine: 'auto',

  // Use single quotes instead of double quotes
  singleQuote: true,

  // For ES5, trailing commas cannot be used in function parameters; it is counterintuitive
  // to use them for arrays only
  trailingComma: 'none',

  printWidth: 80,
  jsxSingleQuote: true,
  useTabs: false,
  tabWidth: 2,
  semi: false,
  htmlWhitespaceSensitivity: 'ignore',
  bracketSpacing: true,
  quoteProps: 'as-needed'
}
