const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    deps: './src/dependencies.ts', // third-party dependencies
    app: './src/app.ts',           // custom
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  stats: {
    colors: true
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules')
    ],
    modulesDirectories: ['node_modules'],
  },
  // devtool: DEBUG ? '#inline-source-map' : null,
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "./node_modules/ionic-angular"),
      path.resolve(__dirname, "./node_modules/ionicons/dist/scss")
    ]
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts' },
      { test: /\.html$/, loader: 'raw' },

      // ---------- styles
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },

      // ----------- fonts
      { test: /\.woff($|\?)/, loader: 'url-loader?name=fonts/[name]-[hash].[ext]&limit=5000&mimetype=application/font-woff' },
      { test: /\.woff2($|\?)/, loader: 'url-loader?name=fonts/[name]-[hash].[ext]&limit=5000&mimetype=application/font-woff' },
      { test: /\.ttf($|\?)/, loader: 'file-loader?name=fonts/[name]-[hash].[ext]' },
      { test: /\.eot($|\?)/, loader: 'file-loader?name=fonts/[name]-[hash].[ext]' },

      // ----------- images
      { test: /\.svg($|\?)/, loader: 'file-loader?prefix=font/&name=img/[name]-[hash].[ext]' },
      { test: /\.png($|\?)/, loader: 'file-loader?prefix=font/&name=img/[name]-[hash].[ext]' },
    ]
  },
  ts: {
    configFileName: './tsconfig.json'
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: DEBUG,
      PRODUCTION: PRODUCTION,
      BUILD_TIME: new Date().toString()
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'deps',
      minChunks: Infinity
    }),
    new ExtractTextPlugin('[name].bundle.css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: 'index.html' },
    ]),
    new CleanWebpackPlugin([
      path.join(__dirname, 'www')
    ])
  ].concat(PRODUCTION ? [
    // additional pluginds for produnction environment
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ] : []).concat(DEBUG ? [
    // additional pluginds for debug target
    new webpack.SourceMapDevToolPlugin()
      // '[file].map', null,
      // "[relative-resource-path]", "[relative-resource-path]")
  ] : [])
}