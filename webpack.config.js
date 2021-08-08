const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const publicName = pkg.name; // package name
const banner = [
  `${publicName} v${pkg.version}`,
  `(c) ${new Date().getFullYear()} Mark Lin.`,
  pkg.license,
  pkg.homepage,
].join(' | ');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin(banner),
  ],
};
