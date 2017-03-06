import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'

// sync router and store, register 'store.state.route'
sync(store, router)

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// create the app instance
// here we inject router and store to all components to make it accessable
const app = new Vue({
    router,
    store,
    ...App
})

export { app, router, store }
