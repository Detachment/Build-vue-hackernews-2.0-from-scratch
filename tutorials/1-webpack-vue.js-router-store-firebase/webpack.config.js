const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './index.html',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.vue$/,
          loader: 'vue'
        },
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url',
          query: {
            limit: 10000,
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    }
}
