const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const StylelintPlugin = require('stylelint-webpack-plugin');
const nib = require('nib');

const localClassPrefix = 'token-input';

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
      // Process JS with Babel
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules|coverage)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.styl$/,
        // extract-text-webpack-plugin not support
        // Apply mini-css-extract-plugin instead
        // https://bbs.huaweicloud.com/blogs/detail/241981
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          // This plugin should not be used with style-loader in the loaders chain.
          // https://webpack.js.org/plugins/mini-css-extract-plugin/#advanced-configuration-example
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: {
                localIdentName: `${localClassPrefix}-[local]`,
              },
            },
          },
          {
            loader: 'stylus-loader', // compiles Stylus to CSS
            options: {
              stylusOptions: {
                // nib - CSS3 extensions for Stylus
                use: [nib()],
                // no need to have a '@import "nib"' in the stylesheet
                import: ['nib'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ESLintPlugin({
      formatter: eslintFormatter,
      eslintPath: require.resolve('eslint'),
    }),
    new StylelintPlugin({
      configFile: './stylelint.config.js',
      files: ['src/**/*.styl'],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: '../docs/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
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
