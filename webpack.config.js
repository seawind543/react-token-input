const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const StylelintPlugin = require('stylelint-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const pkg = require('./package.json');

const publicName = pkg.name; // package name
const banner = [
  `${publicName} v${pkg.version}`,
  `(c) ${new Date().getFullYear()} Mark Lin.`,
  pkg.license,
  pkg.homepage,
].join(' | ');
const localClassPrefix = 'token-input';

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    globalObject: 'this',
    library: {
      name: {
        root: 'TokenInput',
        commonjs: 'token-input',
        amd: 'token-input',
      },
      /**
       * Fix issue `Minified React error #321`
       * An object with { root, amd, commonjs, ... } is only allowed for libraryTarget: 'umd'.
       * It's not allowed for other library targets.
       * https://webpack.js.org/configuration/externals/#object
       */
      type: 'umd',
    },
  },
  /**
   * Fix issue `Minified React error #321` when import from npm
   * https://reactjs.org/docs/error-decoder.html?invariant=321
   *
   * Solution:
   * https://github.com/facebook/react/issues/16029#issuecomment-570912067
   */
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
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
            loader: MiniCssExtractPlugin.loader,
          },
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
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ESLintPlugin({
      formatter: eslintFormatter,
      eslintPath: require.resolve('eslint'),
      exclude: ['node_modules', 'docs', 'dist', 'lib'],
      emitWarning: true,
      cache: false,
    }),
    new StylelintPlugin({
      configFile: './stylelint.config.js',
      files: ['src/**/*.scss'],
      customSyntax: 'postcss-scss',
      exclude: ['node_modules', 'docs', 'dist', 'lib'],
    }),
    new MiniCssExtractPlugin({
      filename: `../dist/${publicName}.css`,
    }),
    new MiniCssExtractPlugin({
      // For build not minimize version
      filename: `../dist/${publicName}.original.css`,
    }),
    new webpack.BannerPlugin(banner),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`, // keep js file minimize
      new CssMinimizerPlugin({
        test: /\.css$/,
        exclude: /\.original.css$/, // Skip `.original.css` from minimize
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
