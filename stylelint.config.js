//
// https://github.com/rossPatton/stylint
//
module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
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
  overrides: [
    {
      files: ['examples/**/*.scss'],
      rules: {
        // Set this rule to `prefix` under `examples/` as a workaround for this error:
        // ERROR in ./Navbar.scss (../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../node_modules/sass-loader/dist/cjs.js!./Navbar.scss)
        // Module build failed (from ../node_modules/sass-loader/dist/cjs.js):
        // unclosed parenthesis in media query expression
        //         on line 76 of Navbar.scss
        // >> @media (width >= 768px) {
        //    --------^
        'media-feature-range-notation': 'prefix',
      },
    },
  ],
};
