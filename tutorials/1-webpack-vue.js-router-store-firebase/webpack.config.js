const vueConfig = require('./vue-loader.config')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: '#source-map',  // emit accurate source map for better debug
    entry: {
        app: './src/entry.js',
        vendor: [
            'es6-promise',
            'firebase/app',
            'firebase/database',
            'vue',
            'vue-router',
            'vuex',
            'vuex-router-sync'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'buble-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
                options: {
                    objectAssign: 'Object.assign'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    }
}
