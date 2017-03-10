# Questions during reading source code
This file is made because I always feel confused when reading the source code.

## Questions

1. How to preview .vue file?

2. Is there any documents related to this code?  
'fileSystem' is related to middleware, and "existsSync" is in node.js, right?  
Then how they connected?
```javascript  
// file: setup-dev-server.js
clientCompiler.plugin('done', () => {
    const fs = devMiddleware.fileSystem
    const filePath = path.join(clientConfig.output.path, 'index.html')
    if (fs.existsSync(filePath)) {
        const index = fs.readFileSync(filePath, 'utf-8')
        opts.indexUpdated(index)
    }
})
```
3. The same goes this part:
```javascript
const serverCompiler = webpack(serverConfig)
const mfs = new MFS()
const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)  
serverCompiler.outputFileSystem = mfs  
// Why define 'outputFileSystem' here?  
// I find answer here: https://webpack.js.org/api/node/#stats-object
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    opts.bundleUpdated(mfs.readFileSync(outputPath, 'utf-8'))
})
```
4. A little problem here:
```javascript
// in webpack.client.config.js:
// this is needed in webpack 2 for minifying CSS?
// this is not for css, instead for global/shared loader options?
new webpack.LoaderOptionsPlugin({
    minimize: true
}),
```
