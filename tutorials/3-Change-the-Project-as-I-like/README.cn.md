# 3. Change the Project as I like

## 前言 [ English Version ](./README.md)

在这个版本中，我将会根据自己的喜好对整个网页进行一些改造，使得网页整体更具有 Vue.js 风格，至少从视觉上来说更加的 Vue.js。下面的动图可以预览到我这个版本的成品，为了对照官方例子，你可以去[官网](https://vue-hn.now.sh/top)查看原网页。对于所添加及更改的部分，本节的下半部分将会详细介绍。

<p align="center">
    <img src="./public/last-edition-resize.gif" width="700px" alt="Last Edition of Vue-HackerNews" >
    <br/>
    [ Vue-HackerNews 最后版本 ]
</p>

## 过程
1. **使网页更具 Vue.js 风格**  
打开这个版本（或者看上面的动图），一个最明显的变化就是网页的主色调发生了改变。我将页面中所有的橘黄色（`#ff6600`）都替换成了浅绿色（`#41b883`）。主色调是一个网站风格的重要组成部分，比如 HackerNews 的橘黄、知乎的深蓝、github 的墨黑以及 Vue.js 的浅绿。
至少从视觉上，我觉得这更加的 Vue.js 了，嘿嘿。

2. **增加根据评论数量、时间以及得分排序功能**  
排序功能在很多网站上都能见到，能够方便大家快速找到自己想找的内容。所以我认为在这个项目上加上这个功能会比较酷（虽然不确定在这个网页上有没有实际意义）。为了增加这个功能，我新增了如下代码（部分）：   
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
    除此之外在 `ItemList.vue` 文件中也增加了一些代码，如果你对此感兴趣的话，那么可以把源文件看一下，也挺简单的。 样式上的改动也挺大的，感兴趣也可以去了解下。

3. **保持在不同设备上的自适应**   
为了能和上一个版本一样，仍然能够自适应各种尺寸的设备，我在改变页面布局之后，对相关 CSS 样式进行了设置。从上面的动图可以看到，为了配合排序，主页面的布局发生的变化还是挺大了。在自适应设备的时候，为了使页面看起来更优雅一些，我将部分不太重要的信息给省略了。具体的设置可以看源文件。  


4. **在 `ItemView.vue` 页面增加 `toTop` 按钮**   
返回顶部按钮也是很多网站的常见功能。由于首页只有20条信息，所以在首页上我没有加上这个。但是在评论页面，动辄上百条，我认为加上这个按钮应该会方便一些。反正都是根据我自己的喜好来加的，有没有实际意义我也不知道，哈哈。


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


## 结尾  
到目前为止，这个项目的所有版本都已经完成了。在完成这些版本的过程中，我感受到了思考和创造带来的乐趣。这就是生活啊，希望大家也能感受到。  
最后，衷心感谢原作者 [尤雨溪前辈](https://github.com/yyx990803) 给我们提供了一个这么好用的框架以及这么精彩的官方示例！




## 目录

[0-vue.js-vuex-router-firebase-ES6](/tutorials/0-vue.js-vuex-router/README.cn.md)   
[1-webpack-vue.js-router-store-firebase](/tutorials/1-webpack-vue.js-router-store-firebase/README.cn.md)    
[2-Packages-Plugins-for-Better-User-Experience](/tutorials/2-Packages-Plugins-for-Better-User-Experience/README.cn.md)  
[3-Change-the-Project-as-I-like](/tutorials/3-Change-the-Project-as-I-like/README.cn.md)
