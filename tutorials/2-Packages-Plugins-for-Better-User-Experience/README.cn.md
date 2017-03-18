# 2. Server, Packages and Plugins for Better Performance

## 前言 [ English Version ](./README.md)
于我而言，这个版本是整个项目中最难的一个版本。为了优化用户体验，原作者将很多因素考虑在内，这就会带来很多需要了解的新知识，比如 node.js 中的 express 框架以及各种插件。服务器端及客户端、生产模式及调试模式的不同配置是这个版本的重点。在接下来的片段中，我会将我所理解的部分分享给大家。
由于这个版本和[官网](https://vue-hn.now.sh/top)的一样，我就不上效果图了。

## 过程
1. **开启 Node server 之路： `server.js`**  
[在一些情况下](https://vuejs.org/v2/guide/ssr.html) 你可能会需要在你的项目中使用到 SSR (Server-Side Rendering) ，以此来优化网页。在这个版本中，我们即将这个功能考虑在内。  
既然是服务器端渲染，那么我们首先需要一个服务器。在这个版本中，我们采用的目前非常流行的运行在 Node.js 环境下的 express 框架。通过阅读官方提供的文档，很快我们就可以对此框架有一个初步的了解，知道其主要的用途及使用方法。（中文教程可参考阮一峰老师的 Node.js 入门。）   
[Express: Fast, unopinionated, minimalist web framework for Node.js](http://expressjs.com/)  
除此之外，我们还需要了解一些 Node.js 相关知识，比如 Path 模块、文件系统、系统变量等等。其实对于目前而言，这些内容也只是需要知道它们代表什么意思，以及怎么使用它们就够了。而这也是非常简单的。下面的链接是一些相关的需要了解的内容：  
[Node.js v7.7.2 Documentation](https://nodejs.org/api/)  
如果你之前不了解 SSR，那么点击下面的链接：    
[vue-server-renderer](https://www.npmjs.com/package/vue-server-renderer#api)  
除了上面的以外，下面这些插件和包能够使项目性能更加优化：   
[serve-favicon: Node.js middleware for serving a favicon](https://www.npmjs.com/package/serve-favicon)  
[compression: Node.js compression middleware.](https://www.npmjs.com/package/compression)  
[serialize-javascript: Serialize JavaScript to a superset of JSON](https://www.npmjs.com/package/serialize-javascript)   
浏览过上述文档后，我们就具备了理解 `server.js` 文件的知识储备。这很关键，因为这个文件直通服务器之门。

2. **生产模式及开发模式**  
这两种模式 **最大** 的区别就是是否具有热替换及热更新功能。在生产模式下， webpack 不会监控文件的更新，在开发模式下是会的。相对于生产模式而言，开发模式更复杂一些（因为会使用到一些中间件），所以我们先来讨论一下开发模式吧。   
正如名字所说，我们只会在开发过程中使用开发模式。所以在这个模式下，我们不是特别关心所加载的文件大小、文件数量以及访问速度等。这些都会导致在两种不同模式下的 webpack 配置文件有部分差异。为了实现热替换及热更新功能，我们可以使用 webpack 提供的 `webpack-hot-middleware` 和 `webpack-dev-middleware` 中间件。实现热更新的原理是调用 webpack 的 HMR API 来监测服务器变化。相关文档如下：
[webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware)  
除了上面的中间件，还需要了解下面链接中所包含的内容，这会使得我们能更好的的理解开发模式下服务器配置文件，也就是 `setup-dev-server.js` ：       
[webpack node API](https://webpack.js.org/api/node/)  
[webpack API: stats-object](https://webpack.js.org/api/node/#stats-object)  
在生产模式下，服务器端会渲染经过 webpack 打包处理过的打包文件，然后客户端接收相关页面。在这个模式下为了提高访问速度，优化用户体验，我们会会使用一些其他的插件。比如下面列出来的两个插件就只是应用在生产模式下：
[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)  
[sw-precache-webpack-plugin](https://www.npmjs.com/package/sw-precache-webpack-plugin)    
如果你想知道这两种模式在 webpack 配置上的详细差别，可以去看 `webpack.client.config.js` 和  `webpack.base.config.js` 配置文件。

3. **服务器端和客户端**  
在配置 webpack、获取页面数据的时候，我们既需要配置客户端，也需要配置服务器端，并且要保证它们之间不产生冲突。至于在 Vue.js 中使用 SSR 功能时应该怎样在 webpack 中配置，官方文档有详细说明，可以点击下面的链接：   
[vue-server-renderer](https://www.npmjs.com/package/vue-server-renderer)。保证两端协调工作的一个关键点是在加载初始页面时怎样保证初始数据一致，想了解这点可以去阅读 `server-entry.js` 和 `client-entry.js` 文件。     

4. **当在命令行中输入 `npm run dev` 时，具体会发生什么？**  
未完待续。  


## 运行设置

``` bash
# install dependencies
npm install

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## 后续
基本上这就是我对这个项目的理解了。有一些不懂的地方没有说明，也有一些懂的地方没有说到。之后对整个项目有更深入、更高层次的理解再来补充这一章。在下一个版本中，我将会根据我自己的喜好对整个项目进行一些改造（主要是外在的页面）。下个版本再见。  

下一版本：  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like/README.cn.md)  

目录：  
[Introductioin](/README.cn.md)  
[0-vue.js-vuex-router-firebase-ES6](/tutorials/0-vue.js-vuex-router/README.cn.md)   
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase/README.cn.md)    
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience/README.cn.md)  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like/README.cn.md)
