## 0. Vue.js, vuex, Vue-router, Hackernews API, Firebase and ES6

As a new learner of front-end development, ever since I started to learn Vue-HN project, I wondered whether it is possible to make this project with just vue.js, vuex and vue-router. After some tries and failures, I finally made it. The GIFs below are the animation screenshots of the offical edition and my edition respectively.

***[ My Edition ]***
![Origin Website](./img/Author.gif)

***[ Offical Edition ]***
![Plane Vue.js](./img/Mine.gif)  

As we can see, almost all the features that existed in the offical example can also be implemented with just vue.js and its ecosystem. Before you start with this chapter, you should acquire some knowledge listed as below:
- [Vue.js 2.0: The Progressive JavaScript Framework](https://vuejs.org/)
- [Vue-router 2.0: A Simple Router for Vue.js](https://router.vuejs.org/en/)
- [Vuex 2.0: State Management Patter and Library for Vue.js Application ](http://vuex.vuejs.org/en/)
- [Hacker News API: HackerNews API Works with Firebase](https://github.com/HackerNews/API)
- [Learn ES2015: A detailed overview of ECMAScript 2015 features](https://babeljs.io/learn-es2015/)
- [Firebase: App success made simple](https://firebase.google.com/docs/web/setup)

Don't get dizzy when you see so many lists, because apart from the vue.js and its ecosystem, you just need to know a little about the others. Take ES6 for example, it is enough if you have ever used arrow function, Promise and some other basic features.  

There are some key points to bulid this project:  
1. How to get data through the offered HackerNews API without installing Firebase package?     
**Answer :** After reading the Firebase ducument, I find the way to use firebase in a project without installing firebase package. Codes that with and without installing package can be like following:  

```
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

2. How to communicate between vuex and router?  
**Answer :** Two key points to ensure this:
    - Register store and router in the same vue instance;
    - With the help of a package named "vuex-router-sync".
    Note: Without a package management tool, we should modify the index.js of this package and rename it as sync.js and then link it as a javascript file.

3. How to deal with .vue file?  
**Answer :** Files ended up with .vue mean that they are single file components. We can replace them with "x-template" in html part, "Vue.extend" in javascript part and css file in style part.
