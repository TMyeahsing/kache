var path = require('path')
var entries = require('./entry.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'js': path.resolve(__dirname, '../src/assets/js'),
      'css': path.resolve(__dirname, '../src/assets/css'),
	  'jquery': 'js/jquery.min.js'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10,
          name: 'images/[name].[ext]?[hash:7]'
        }
      }
    ]
  }
}
