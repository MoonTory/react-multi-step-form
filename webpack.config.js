// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
// Plugin that simplifies creation of HTML files to serve your bundles
// https://github.com/jantimon/html-webpack-plugin#plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
// This Webpack plugin lets us interpolate custom variables into index.html. It works in tandem with HtmlWebpackPlugin
// 2.x via its events.
// https://www.npmjs.com/package/react-dev-utils
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
// This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports
// On-Demand-Loading of CSS and SourceMaps.
// https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SOURCE: path.resolve(__dirname, 'src'),
  PUBLIC: path.resolve(__dirname, 'public'),
  NODE: path.resolve(__dirname, 'node_modules')
};

console.log('paths', paths);

// Webpack configuration
module.exports = {
  // This option controls how source maps are generated, to enhance the debugging process. We are setting it to
  // 'cheap-module-source-map' as it has a medium build time and is good for development, and should probably use
  // another method for the production build.
  devtool: 'cheap-module-source-map',
  // Specifying the entry point of the application, since we have defined constants, we simple use those to maintain a
  // cleaner file.
  entry: path.join(paths.SOURCE, 'index.js'),
  // The output will tell webpack were to build our files by the 'DIST' constant.
  output: {
    path: paths.DIST,
    filename: 'bundle.js'
  },
  // Configuring webpack to use different modules, such as 'babel-loader', 'css-loader', 'file-loader', etc...
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/images',
          outputPath: 'images'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/fonts',
          outputPath: 'fonts'
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  // Setting up a custom HTML template to be used with the 'HtmlWebpackPlugin
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      links: [{ href: 'styles.css', rel: 'stylesheet' }],
      // We pass the 'template' prop to specify the location of the template, in our case it is stored in the 'public'
      // folder in the root directory.
      template: path.join(paths.PUBLIC, 'index.html')
    }),
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin({
      PUBLIC_URL: path.basename(paths.PUBLIC)
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],
  // Webpack-dev-server configuration
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    compress: true,
    port: 4000
  }
};
