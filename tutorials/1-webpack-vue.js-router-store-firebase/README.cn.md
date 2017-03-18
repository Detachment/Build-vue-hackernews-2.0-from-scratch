# 1. Webpack, Vue.js, Vue-router, Vuex and Hackernews API

## 前言 [ English Version ](./README.md)  

经过第一个版本后，我们对这个项目有了初步的了解。在这个版本中，我们会使用一些工具，使得我们这个项目初步模块化，同时也更加便于维护。在这个版本中我们将会使用到一些基本的插件和包，并通过 webpack 来实现功能。我们只需要简单的配置一下 webpack 就行，不会涉及到服务器端的内容，不会涉及缓存也不会涉及生产模式及开发模式的不同配置。下面的动图就是这个版本的成品，同时这个动图里面还包含了对整个项目的简单解构。

<p align="center">
    <img src="./public/first_edition.gif" width="700px" alt="Basic functions and simple deconstruction" >
    <br/>
    [ 基本功能及简单解构 ]
</p>

为了更好的理解这个版本的内容，下面会列出一些需要了解的工具、插件和库的链接，你只需要对这些有基本的了解就行。（如果前面版本中已经列出来了，那么本节将不再重复。比如 Vue.js 及其生态、ES6 等等）：

- [Webpack 2.0: Moudle Bundler](https://webpack.js.org/)
- [Package: es6-promise](https://www.npmjs.com/package/es6-promise)
- [Package: firebase](https://www.npmjs.com/package/firebase)
- [Package: vuex-router-sync ](https://www.npmjs.com/package/vuex-router-sync)
- [Package: buble](https://www.npmjs.com/package/buble)
- [Package: buble-loader](https://www.npmjs.com/package/buble-loader)
- [Package: css-loader](https://www.npmjs.com/package/css-loader)
- [Package: file-loader](https://www.npmjs.com/package/file-loader)
- [Package: rimraf](https://www.npmjs.com/package/rimraf)
- [Package: stylus](https://www.npmjs.com/package/stylus)
- [Package: autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [Package: stylus-loader](https://www.npmjs.com/package/stylus-loader)
- [Package: url-loader](https://www.npmjs.com/package/url-loader)
- [Package: vue-loader](https://www.npmjs.com/package/vue-loader)

上面的清单好像有点过长，很容易唬到人，不过完全不用担心。因为对于这些工具、插件和库，我们目前所需要了解的仅仅是它们的用途是什么以及怎么正确的使用它们。相信我，这些对于所有人来说都是没有什么难度的。（英语不好的可以借助各种翻译工具，问题也不大）


## 过程
搭建这个版本有几个比较重要的步骤，下面将分别对每一步进行简单的介绍。

### 第一步
**项目结构分析。** 其实这一步应该是写在上一个版本中的，因为每当我们开始做一个新的项目的时候，不可避免的需要先去考虑项目的整体结构、功能、风格以及通过怎样是手段来实现这些。分析完以后再来动手代码搭建整个项目才是正确的方式。这个项目的简单解构在上面的动图中已经展示出来了（解构在动图的后半部分，耐心看完）。  
简单归纳，项目的结构还是比较简单的，主要由几个不同的页面组成，每个页面又由几个相同或者不同的组件组成。  

### 第二步
**获取数据。** 把获取数据作为第二步是因为它和项目的整体结构是独立的。在这一步我们需要利用到由 HackerNews 官方提供的 API（这个 API 利用 Firebase 制作）。然后定义一些获取数据的函数，形成 api.js 文件。然后在 Vuex 中调用这些函数，达到数据集中管理的目的。完成这一步后，项目的目录大概是这样子的：
```
| -- src
|    | -- store
|           | -- api.js    
|           | -- index.js
```


### 第三步
**搭建组件及页面。** 基于第一步中对于项目的结构分析，我们开始编写组件及页面的代码。先编写组件的代码，然后将组件引入到页面中，再来构建页面。组件直接可以通过 `components option` 来相互引入，父子组件之间的数据传递可以利用 `props` 特性。完成这一步之后，项目结构大概是这样子的：
```
| -- src
|    | -- store
|    |       | -- api.js    
|    |       | -- index.js
|    |        
|    | -- components
|    |       | -- Item.vue
|    |       | -- ItemList.vue
|    |       | -- Comment.vue
|    |       | -- Spinner.vue
|    |
|    | -- views
|    |       | -- ItemView.vue
|    |       | -- UserView.vue
|    |       | -- CreateListView.js
```

### 第四步
**完成项目剩下部分。** 在这一步中，我们会引入 Vue.js 的路由系统：Vue-router。引入后，我们就可以将组件中的链接替换成路由中的路径。然后利用前文提到过的 `vuex-router-sync` 插件来同步路由和数据中心。除此之后，我们还需要定义几个全局筛选函数，并且注册在同一个 Vue 实例中。其他还有一些小的工作，比如引入 logo 图片，新建入口文件（为下一步 webpack 打包做准备）等等。完成这一步之后的项目目录大概如下所示：
```
|-- public
|    | -- logo-48.png
|
|-- src
|    | -- store
|    |       | -- api.js    
|    |       | -- index.js
|    |        
|    | -- components
|    |       | -- Item.vue
|    |       | -- ItemList.vue
|    |       | -- Comment.vue
|    |       | -- Spinner.vue
|    |
|    | -- views
|    |       | -- ItemView.vue
|    |       | -- UserView.vue
|    |       | -- CreateListView.js
|    |
|    | -- filters
|    |       | -- index.js
|    |
|    | -- router
|    |       |-- index.js
|    |
|    | -- app.js
|    | -- App.vue
|    | -- entry.js
|    | -- index.html
```

### 第五步
**终于要用上 webpack 啦！** 如果你对于 [webpack](https://webpack.js.org/) , [node.js](https://nodejs.org/en/) 以及 [npm](https://docs.npmjs.com/getting-started/what-is-npm) 这些内容完全不知道，那么你就需要在开始这一步之前花几个小时的时间来了解一下。 在这个版本中，我们利用包管理工具 `npm` 来安装或者卸载插件。在初始化我们的项目的时候，我们既可以通过在命令行中输入 `npm init` （自动新建 node 配置文件，默认文件名为 `package.json` ）又可以自己手动新建一个名为 `package.json` 的配置文件。安装完各种插件后，我们可以开始配置 webpack 了。为了方便起见，我们会新建一个配置文件，默认文件名为 `webpack.config.js` ，在这个文件里面我们将会对项目进行简单配置。具体的配置情况可以去看原文件。   
> 注意：在使用 `npm` 之前，你必须先安装最新版本的 `node.js`，否则无法运行成功。

## 运行设置

```bash
# assume you have downloaded the project in previous editon
# bundle all files.
# or npm run start
npm start  

# if you change things and want to bundle again, run npm test
# this will delete the first one and emit a new bundle.
# or npm run test
npm test
```


## 后续
对比上一个版本，我们在这个版本已经有点取得了一点进步，因为这个版本开始初步模块化了，也更加的易于维护。由于文件依赖及链接加载顺序的的关系，上一个版本只支持在 Chrome 浏览器中运行，而这个版本则不存在这个问题。因为我们在组件化的过程中已将所需要的对应依赖通过模块引入了。   
然而，这个版本的项目还远远不够完美。在下一个版本中，我们将会将更多的因素考虑在内，而这些因素都会对用户体验产生很重要的影响。


下一版本：  
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience/README.cn.md)    


目录：  
[Introductioin](/README.cn.md)  
[0-vue.js-vuex-router-firebase-ES6](/tutorials/0-vue.js-vuex-router/README.cn.md)   
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase/README.cn.md)    
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience/README.cn.md)  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like/README.cn.md)
