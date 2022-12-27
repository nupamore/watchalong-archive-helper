module.exports = {
  plugins: ['stylelint-prettier', 'stylelint-order'],
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-hudochenkov/order',
    'stylelint-prettier/recommended',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'prettier/prettier': [true, { singleQuote: false, endOfLine: 'auto' }],
    'block-no-empty': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'scss/operator-no-newline-after': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
  },
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
}
