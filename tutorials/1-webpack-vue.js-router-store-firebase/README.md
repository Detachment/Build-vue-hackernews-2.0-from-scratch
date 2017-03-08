# 1. Webpack, Vue.js, Vue-router, Vuex and Hackernews API

## Preface

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
-- src
    | -- store
           | -- api.js    
           | -- index.js
```


### Step 3
**Bulid components and views.** Bulid components first, and then use components to bulid views. Transfer data between them with "props" option. Stucture of the project folder would like:
```
-- src
    | -- store
    |       | -- api.js    
    |       | -- index.js
    |        
    | -- components
    |       | -- Item.vue
    |       | -- ItemList.vue
    |       | -- Comment.vue
    |       | -- Spinner.vue
    |
    | -- views
    |       | -- ItemView.vue
    |       | -- UserView.vue
    |       | -- CreateListView.js
```

### Step 4

### Step 5

## Next
blah blah blah
