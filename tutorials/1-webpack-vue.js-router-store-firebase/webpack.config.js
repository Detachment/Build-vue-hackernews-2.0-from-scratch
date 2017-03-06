const webpack = require('webpack')
const path = require('path')

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

}
