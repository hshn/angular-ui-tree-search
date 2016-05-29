var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'sourcemap',
  entry: {
    'vendor': './src/vendor.js',
    'ng-ui-tree-filter': './src/index.js'
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
      { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.angular': 'angular'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'].reverse()
    })
  ]
}
