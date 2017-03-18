# 2. Server, Packages and Plugins for Better Performance

## Preface [ 中文版本 ](./README.cn.md)
This edition can be the most difficult part for me in the whole project.
So many plugins, packages and new techniques make the project extremely complex for me. I have tried my best to figure this out and in the following part I will share what I have got with you.

## Process
1. **Way to Node server: `server.js`**  
[In some situations](https://vuejs.org/v2/guide/ssr.html), you may want to use SSR (Server-Side Rendering) in your project to improve the performance. Our project is among one of these cases.  
So, we need a serve at first. In this edition, we use one of the most popular web framework for Node.js: Express. Scan the "Getting started" part, you will have a basic understanding of Express.  
[Express: Fast, unopinionated, minimalist web framework for Node.js](http://expressjs.com/)  
Besides, you should know some APIs in Node.js, like Path, File System, and Process. Honestly, knowing how to use these APIs is enough and this is deadly simple. Click this link to get more information:  
[Node.js v7.7.2 Documentation](https://nodejs.org/api/)  
Then come to the SSR, there is a package named "vue-server-renderer" for this.  
[vue-server-renderer](https://www.npmjs.com/package/vue-server-renderer#api)  
Apart from above, some other packages are used to make this project better:  
[serve-favicon: Node.js middleware for serving a favicon](https://www.npmjs.com/package/serve-favicon)  
[compression: Node.js compression middleware.](https://www.npmjs.com/package/compression)  
[serialize-javascript: Serialize JavaScript to a superset of JSON](https://www.npmjs.com/package/serialize-javascript)   
After finished reading all of these files, it will not be a problem for you to understand the `server.js` file. This is improtant because this file is the entry of the node server.    

2. **Production mode and Development mode**  
The main differences between these two modes are with hot-replacement and hot-reload or without. If in production mode, webpack would not watch the file change. Here we talk about development mode first.  
Just as the name implies, when we are in the developing process, we will use the development mode. In this mode we care less about the file size, file number and access speed, which will make some differences in configuring webpack. We can use `webpack-hot-middleware` and `webpack-dev-middleware` packages to make our project capable of hot-reload and hot-replacement. Documents as following:    
[webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware)  
Also check the following links, and then you can get a better understanding of `setup-dev-server.js` file:  
[webpack node API](https://webpack.js.org/api/node/)  
[webpack API: stats-object](https://webpack.js.org/api/node/#stats-object)  
In production mode, the node server and client side would render bundles that packed by webpack. Some extra plugins will be utilized in this mode to make files size samller and so on. Besides, some config options are also different. To get details, check `webpack.client.config.js` and  `webpack.base.config.js`. Following are two examples:   
[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)  
[sw-precache-webpack-plugin](https://www.npmjs.com/package/sw-precache-webpack-plugin)  
3. **Server side and Client side**  
We should config webpack both in server side and client side to make them work together for a better performance. To config webpack on server side, we can refer to offical document:
[vue-server-renderer](https://www.npmjs.com/package/vue-server-renderer). Another key point for both sides is to keep the initial state the same with each other. We can search for details in `server-entry.js` and `client-entry.js`.  

4. **What exactly happens when we type `npm run dev` in command propmt?**  
To be continued.

## Build Setup

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

## Next
Basically, above is all what I get for the project. In next chapter, I will do some change as I like. Meet you there.  

Next Edition:  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like)
    

Table of Content:  
[Introductioin](/README.md)   
[0-vue.js-vuex-router-firebase-ES6](/tutorials/0-vue.js-vuex-router)   
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase)    
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience)  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like)
