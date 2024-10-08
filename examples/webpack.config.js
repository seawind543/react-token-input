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
      // Process J/TS with Babel
      {
        test: /\.[jt]s(x?)$/,
        exclude: /(node_modules|coverage|lib)/,
        use: [
          {
            loader: 'babel-loader',
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
                // Keep css-loader v6 behavior: Apply default export
                // https://github.com/webpack-contrib/css-loader/blob/master/CHANGELOG.md#700-2024-04-04
                namedExport: false,
                exportLocalsConvention: 'as-is',
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
  // https://webpack.js.org/configuration/dev-server/#root
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../docs'),
    },
    allowedHosts: 'auto',
    hot: true,
    host: '0.0.0.0',
    port: 8000,
  },
};
