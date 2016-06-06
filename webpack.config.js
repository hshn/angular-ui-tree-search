var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  metadata: {
    baseUrl: '/'
  },
  devtool: 'sourcemap',
  entry: {
    'vendor': './src/vendor.js',
    'index': './src/index.js',
    'demo': ['./demo/index.js', './demo/index.css']
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel' },
      { test: /\/angular\.js$/, loader: 'exports?angular' },
      { test: /\.css$/, loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // 'window.angular': 'angular',
      // 'angular': 'angular'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['index', 'demo']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'index',
      chunks: ['demo']
    }),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      chunksSortMode: 'dependency'
    }),
    new ExtractTextWebpackPlugin('[name].css')
  ],
  devServer: {
    port: 3000
  }
}
