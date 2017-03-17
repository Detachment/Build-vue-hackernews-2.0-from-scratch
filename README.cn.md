# 从零开始搭建 《vue-hackernews-2.0》

欢迎大家来到我的第一个程序搭建教程: **从零开始搭建 《vue-hackernews-2.0》**.

作为一个前端开发的初学者，在接触学习到 Vue.js 的时候，我发现官方提供并极力推荐的项目《vue-hackernews-2.0》对于新手而言比较难理解。但同时我又被这种高度工业化的项目所吸引，所以我决定花一段时间来弄清楚这个项目到底是怎么运行起来的。 在这个教程中我将会通过利用不同的版本的迭代的方式来逐步重建这个项目。

**这个项目是面向初学者的。** 整个教程中，我逐步实现了这个项目的四个版本，每一个版本之间有一定的递进关系。为了方便理解掌握每个版本的内容，在每个版本的说明中，我会尽量把在相应版本中所需要掌握的知识点列出来。

注明: 简便起见，如未特别说明，在之后的所有章节中我会用 Vue-HN 来代替 vue-hackernews-2.0 项目。 项目运行的系统是 Windows，因条件限制未在其他系统上测试，请见谅。


## 各版本简介
### 0. Vue.js, Vuex, Vue-router, HN API, Firebase, ES6
作为一个前端初学者，我对最原始的页面构造比较熟悉，也就是页面只由 HTML、CSS 以及 JavaScript 构成。所以自从我开始学习 Vue-HN 这个项目我就想是不是可以用最原始的方法来实现这个项目（当然，不考虑用户体验及性能等方面）。在经过多次失败的尝试之后，我终于只利用 Vue.js 及其生态中的一些库实现了这个版本。下面这两个动图就分别是我这个版本和官方版本。

<p align="center">
    <img src="./tutorials/0-vue.js-vuex-router/img/Author.gif" width="700px" alt="Origin Website">
    <br/>
    [ 我的版本 ]
    <br/>
    <br/>
    <img src="./tutorials/0-vue.js-vuex-router//img/Mine.gif" width="700px" alt="Plane Vue.js">
    <br/>
    [ 官方版本 ]
</p>

### 1. Webpack, Vue.js, Vue-router, Vuex and Hackernews API
经过第一个版本后，我们对这个项目有了初步的了解。在这个版本中，我们会使用一些工具，使得我们这个项目初步模块化，同时也更加便于维护。在这个版本中我们将会使用到一些基本的插件和包，并通过 webpack 来实现功能。我们只需要简单的配置一下 webpack 就行，不会涉及到服务器端的内容，不会涉及缓存也不会设计生产模式及开发模式的不同配置。下面的动图就是这个版本的成品，同时这个动图里面还包含了对整个项目的简单解构。

<p align="center">
    <img src="./tutorials/1-webpack-vue.js-router-store-firebase/public/first_edition.gif" width="700px" alt="Basic functions and simple deconstruction" >
    <br/>
    [Basic Functions and Simple Deconstruction]
</p>

### 2. Server, Packages and Plugins for Better Performance
This edition can be the most difficult part for me in the whole project.
So many plugins, packages and new techniques make the project extremely complex for me. I have tried my best to figure this out and in the following part I will share what I have got with you.

### 3. Change the Project as I like
In this edition, I will change the style of Vue-HN to be more Vue.js, at least in the visual respect. The GIF below is the final editon of mine, you can have a visit to the original website: [Vue-HackerNews 2.0](https://vue-hn.now.sh/top). The details of the differences will be discussed in Process part.
<p align="center">
    <img src="./tutorials/3-Change-the-Project-as-I-like/public/last-edition-resize.gif" width="700px" alt="Last Edition of Vue-HackerNews" >
    <br/>
    [Last Edition of Vue-HackerNews]
</p>



## Table of contents

[0-vue.js-vuex-router-firebase-ES6](/tutorials/0-vue.js-vuex-router)  
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase)    
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience)  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like)


## License
Copyright (c) 2017 Copyright Holder All Rights Reserved.  
MIT (http://opensource.org/licenses/mit-license.php)
