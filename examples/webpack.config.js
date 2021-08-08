const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');

const publicName = pkg.name; // package name

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: path.resolve(__dirname, 'index.jsx'),
  output: {
    path: path.join(__dirname, '../docs'),
    filename: 'bundle.js?[hash]',
  },
  optimization: {
    moduleIds: 'named',
    minimize: false,
    emitOnErrors: false,
  },
  module: {
    rules: [
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: '../docs/index.html',
    }),
  ],
  // https://webpack.github.io/docs/webpack-dev-server.html#additional-configuration-options
  devServer: {
    disableHostCheck: true,
    noInfo: false,
    lazy: false,
    // https://webpack.github.io/docs/node.js-api.html#compiler
    watchOptions: {
      poll: true, // use polling instead of native watchers
      ignored: /node_modules/,
    },
  },
};
