# 0. Vue.js, Vuex, Vue-router, HN API, Firebase, ES6

## Preface [ 中文版本 ](./README.cn.md)

As a new learner of front-end development, ever since I started to learn Vue-HN project, I wondered whether it is possible to make this project with just vue.js, vuex and vue-router. After some tries and failures, I finally made it. The GIFs below are the animation screenshots of the my edition and offical edition respectively.

<p align="center">
    <img src="./img/Author.gif" width="700px" alt="Origin Website">
    <br/>
    [ My Edition ]
    <br/>
    <br/>
    <img src="./img/Mine.gif" width="700px" alt="Plane Vue.js">
    <br/>
    [ Offical Edition ]
</p>


As we can see, almost all the features that existed in the offical example can also be implemented with just Vue.js and its ecosystem. Before you start with this chapter, you should acquire some knowledge listed as below:
- [Vue.js 2.0: The Progressive JavaScript Framework](https://vuejs.org/)
- [Vue-router 2.0: A Simple Router for Vue.js](https://router.vuejs.org/en/)
- [Vuex 2.0: State Management Patter and Library for Vue.js Application ](http://vuex.vuejs.org/en/)
- [Hacker News API: HackerNews API Works with Firebase](https://github.com/HackerNews/API)
- [Learn ES2015: A detailed overview of ECMAScript 2015 features](https://babeljs.io/learn-es2015/)
- [Firebase: App success made simple](https://firebase.google.com/docs/web/setup)

Don't get dizzy when you see so many lists, because apart from the Vue.js and its ecosystem, you just need to know a little about the others. Take ES6 for example, it is enough if you have ever used arrow function, Promise and some other basic features.  

## Process

There are some key points to bulid this project:  
- How to get data through the offered HackerNews API without installing Firebase package?     
**Answer :** After reading the Firebase ducument, I find the way to use Firebase in a project without installing Firebase package. Codes that with and without installing package can be like following:  
    ```javascript
    // without installing firebase package:

    var config = {
        databaseURL: "https://hacker-news.firebaseio.com"
    };
    firebase.initializeApp(config);

    var api = firebase.database().ref('/v0');

    // with firebase package:
    import Firebase from 'firebase'

    const api = inBrowser
      ? new Firebase('https://hacker-news.firebaseio.com/v0')
      : (process.__API__ || (process.__API__ = createServerSideAPI()))

    function createServerSideAPI () {
      const api = new Firebase('https://hacker-news.firebaseio.com/v0')

    ```

- How to communicate between Vuex and router?  
**Answer :** Two key points to ensure this:
    - Register vuex and router in the same vue instance;
    - With the help of a package named "vuex-router-sync".  
    > Note: Without a package management tool, we should modify the index.js of this package and rename it as sync.js and then link it as a javascript file.    

- How to deal with .vue file?  
**Answer :** Files ended up with .vue mean that they are single file components. We can replace them with "x-template" in html part, "Vue.extend" in javascript part and css file in style part. Want to know more specific you should take a dive into the source code.  

After you conquered all these problems and with good understanding of vue.js ecosystem, you can bulid this project all by your own!

> Note: The loading order of files in the html head part affects this project a lot because of the dependency. Tested successfully in Chrome but failed in Firefox and IE. So make sure you use Chrome or replace the native file with links.


## Build Setup

```bash
# clone the project to your computer
git clone https://github.com/Detachment/Build-vue-hackernews-2.0-from-scratch.git

# open index.html file in Chrome.
```


## Next

So far so good. But if we have more patience and look over this edition of the project, we would find some fatal factors. All the files are in chaos, the structure of the whole project is fragile, no consideration has been taken into account in access speed and user experience. Huge price would be paied to maintain all these.

Next Edition:  
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase)   


Table of Content:  
[Introductioin](/README.md)  
[0-vue.js-vuex-router-firebase-ES6](/tutorials/0-vue.js-vuex-router)   
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase)    
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience)  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like)
