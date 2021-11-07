const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const StylelintPlugin = require('stylelint-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const localClassPrefix = 'token-input';

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: path.resolve(__dirname, 'index.jsx'),
  output: {
    path: path.join(__dirname, '../docs'),
    filename: 'bundle.js?[fullhash]',
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
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|coverage|lib)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // For our normal typescript
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|coverage|lib|\.(test.ts))/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
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
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv(/* pluginOptions */)],
              },
            },
          },
          {
            loader: 'sass-loader', // compiles SASS to CSS
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
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
      exclude: ['node_modules', 'docs', 'dist', 'lib'],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: '../docs/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
