# 1. Webpack, Vue.js, Vue-router, Vuex and Hackernews API

## Preface  [ 中文版本 ](./README.cn.md)

In this chapter, we will bulid another edition of Vue-HN in which we would start to make this project more modularized and maintainable. With some very basic configurations of webpack, we would make this edition of the project work. In order to bulid the whole project step by step, we still did not consider server, SSR(server-side-render), cache and so on in this edition.
So, the following animation screenshot would show us the basic functions in this edition and some simple deconstruction of the project.

<p align="center">
    <img src="./public/first_edition.gif" width="700px" alt="Basic functions and simple deconstruction" >
    <br/>
    [Basic Functions and Simple Deconstruction]
</p>


In order to get a smoothly process, you should acquire some basic understandings of the following tools, libraries, and plugins( if listed in previous chapter, then not again. ) :
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

It seems too many packages you should get to learn when you just get a glimpse of the list. Don't get afriad because all you need to know about these packages is what are they for and how to config them. Believe me, it is pretty simple!

## Process
There are several important steps to bulid this edition, every step would be introduced briefly in the following part.

### Step 1
**Deconstruct the project.** To be honst, I should have written this step in the previous edition. When we start a project, inevitablely we should have a plan in our mind about how the project works, what kind of style the pages have and so on.
The GIF picture shown above is a simple deconstruction of this project.
And we can know that this project is made up with several views and each of the views is made up of several components.

### Step 2
**Fetch data.** Fetch data is the second step because it is independent of the whole structure and we can define some functions here which would be used in vuex. The structure of your folder would look like this:
```
| -- src
|    | -- store
|           | -- api.js    
|           | -- index.js
```


### Step 3
**Bulid components and views.** Bulid components first, and then use components to bulid views. Transfer data between them with "props" option. Stucture of the project folder would like:
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

### Step 4
**Finish the left part.** In this step, we use vue-router to replace links in the components. Besides, we can define some global filters and then register them. Finally, we should sync the store and router, and then mount them to the DOM. Project folder structure would be like following:
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

### Step 5
**Finally deal with webpack.** If you are totally new to [webpack](https://webpack.js.org/) , [node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/getting-started/what-is-npm), you should at first spend some hours to get to know the basics. We use npm to install/uninstall packages. When initializing our project, we can either creat a file named "package.json" manually or just type `npm init` in a command line tool. Afer install all the dependencies, we can start to config the webpack with creating a configuration file named "webpack.config.js". To see the details, you should look into the specific file.  
> Note: You have to install the lastest version of node.js before you use npm.

## Build Setup

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

## Next
We have made some progress when comparing this edition with the previous one, because this edition is more modularized and maintainable. As mentioned in the last chapter, previous edition only works in Chrome because of the dependency which is not a problem any more.
However, the project is still far from perfect. In the next edition, we would take more factors into consideration. All packages and plugins that deal with these factors are aiming at a better user experience.  

Next Edition:  
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience)      

Table of Content:  
[Introductioin](/README.md)  
[0-vue.js-vuex-router-firebase-ES6](/tutorials/0-vue.js-vuex-router)   
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase)    
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience)    
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like)
