# 3. Change the Project as I like

## Preface [ 中文版本 ](./README.cn.md)

In this edition, I will change the style of Vue-HN to be more Vue.js, at least in the visual respect. The GIF below is the final editon of mine, you can have a visit to the original website: [Vue-HackerNews 2.0](https://vue-hn.now.sh/top). The details of the differences will be discussed in Process part.
<p align="center">
    <img src="./public/last-edition-resize.gif" width="700px" alt="Last Edition of Vue-HackerNews" >
    <br/>
    [Last Edition of Vue-HackerNews]
</p>

## Process
1. **Make this webpage more Vue.js**  
The most obvious change that take place in this website is the background color. I replaced all the orange (`#ff6600`) with light green (`#41b883`), because the former represent HackerNews style and the latter
are more Vue.js.

2. **List items in order based on time, scores and comments**  
It is a pretty nomal feature in many websites to rank things in different order. So I add the feature to this edition, codes related to this feature are:
    ```javascript
    // store/index.js
    getters: {
        // Add this function to getters. This function is uesd
        // to change the order of items in activeItems.
        activeItemsSort(state, getters){
            return (m) => {
                return getters.activeItems.sort((A, B) => {
                    return A[m] - B[m]
                })
            }
        }
    ```
    More codes are added in ItemList.vue file. If you are interested in how it works you should have a dive into this file.

3. **Also responsive in different media**  
To make this website also responsive, I tweaked the CSS part. You can see the layout of the front page is different from the original. And to make it more elegant, some information are omitted. This can be seen in the above GIF animation.

4. **Add `toTop` button in Comment.vue**  
There are too many comments in some items. So I think it maybe better to add a `toTop` button in this situation.


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


## End
All four editions of this project are completed now. During the process of making this edition, I enjoyed the happiness of thinking and creating. I hope you all can also experience this.  
Finally, give my special thanks to [Evan You](https://github.com/yyx990803) for this wonderful framework and perfect project!



Editions:  
[Introductioin](/README.md)  
[0-vue.js-vuex-router-firebase-ES6](/tutorials/0-vue.js-vuex-router)   
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase)    
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience)  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like)
