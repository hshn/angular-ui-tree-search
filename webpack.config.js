var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  metadata: {
    baseUrl: '/'
  },
  devtool: 'sourcemap',
  entry: {
    'vendor': './src/vendor.js',
    'demo': './src/demo.js',
    'index': './src/index.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel' },
      { test: /\/angular\.js$/, loader: 'exports?angular' }
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
      template: './src/demo.html',
      chunksSortMode: 'dependency'
    })
  ],
  devServer: {
    port: 3000
  }
}
