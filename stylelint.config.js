//
// https://github.com/rossPatton/stylint
//
module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-selector-bem-pattern',
    'stylelint-prettier',
  ],
  // https://stylelint.io/user-guide/rules
  rules: {
    'selector-class-pattern': [
      // https://github.com/simonsmith/stylelint-selector-bem-pattern/issues/23#issuecomment-279216443
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$',
      {
        message: 'Expected class selector to be BEM-style',
      },
    ],
  },
};
