const webpack = require('webpack')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = Object.assign({}, base, {
    resolve: {
        alias: Object.assign({}, base.resolve.alias, {
            'create-api': './create-api-client.js'
        })
    },
    plugins: (base.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // generate output HTML
        new HTMLPlugin({
            template: 'src/index.template.html'
        })
    ])
})

if (process.env.NODE_ENV === 'production') {
    // Use ExtractTextPlugin to extract CSS into a single file
    // so it's applied on initial render.
    // vueConfig is already included in the config via LoaderOptionsPlugin
    // here we overwrite the loader config for <style lang="stylus">
    // so they are extracted.
    vueConfig.loaders = {
        stylus: ExtractTextPlugin.extract({
            loader: 'css-loader!stylus-loader',
            fallbackLoader: 'vue-style-loader'
        })
    }

    config.plugins.push(
        new ExtractTextPlugin('styles.[hash].css'),
        // this is needed in webpack 2 for minifying CSS
        // this is not just for css, instead for global/shared loader options?
        // details: https://webpack.js.org/plugins/loader-options-plugin/#components/sidebar/sidebar.jsx
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // minify JS file
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // optimize web application's initial load speed
        // https://github.com/goldhand/notes/blob/master/notes/service_workers.md
        new SWPrecachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
        })
    )
}

module.exports = config
