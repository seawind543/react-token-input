module.exports = (api) => {
  api.cache(true);
  const plugins = [
    // @babel/plugin-transform-runtime
  ];

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins,
  };
};
