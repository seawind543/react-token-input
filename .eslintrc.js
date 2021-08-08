module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  root: true,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    babelOptions: {
      configFile: './babel.config.js',
    },
  },
  extends: [
    'airbnb-base',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@babel', 'jsx-a11y', 'react', 'react-hooks', 'prettier'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      // No auto-fix. https://github.com/facebook/react/issues/18235#issuecomment-598256997
      // { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
    'no-shadow': 0,
    // Allow deprecated react lifecycle's methods, eg: UNSAFE_componentWillMount
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: false,
        allow: ['^UNSAFE_'],
      },
    ],
  },
};
