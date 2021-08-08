module.exports = (api) => {
  api.cache(true);
  const plugins = [
    // @babel/plugin-transform-runtime,
    [
      'babel-plugin-transform-react-qa-classes',
      {
        attribute: 'data-component-name',
        format: 'pascal',
      },
    ],
  ];

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins,
  };
};
