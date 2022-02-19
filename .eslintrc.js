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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
  // https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-based-on-glob-patterns
  overrides: [
    /**
     * use separate parsers for .js and .ts
     * Following for typescript .ts/.tsx only
     */
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      extends: [
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 12,
        babelOptions: {
          configFile: './babel.config.js',
        },
        project: './tsconfig.json',
      },
      plugins: ['@babel', 'prettier', '@typescript-eslint'],
    },
  ],
};
