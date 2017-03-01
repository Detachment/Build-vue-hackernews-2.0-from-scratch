const ItemList = Vue.extend({
    template: '#itemlist',
    name: 'item-list',

    data() {
        const isInitialRender = !this.$root._isMounted
        return {
            loading: false,
            transition: 'slide-left',
            displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
            displayedItems: isInitialRender ? this.$store.getters.activeItems : []
        }
    },

    props: {
        type: String
    },

    computed: {
        page(){
            return Number(this.$store.state.route.params.page) || 1
        },
        maxPage(){
            const { itemsPerPage, lists } = this.$store.state
            return Math.ceil(lists[this.type].length / itemsPerPage )
        },
        hasMore(){
            return this.page < this.maxPage
        }
    },

    beforeMount(){
        // if(this.$root._isMounted){
        this.loadItems(this.page);

        this.unwatchList = watchList(this.type, ids => {
            this.$store.commit('SET_LIST', { type: this.type, ids })
            this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
                this.displayedItems = this.$store.getters.activeItems
            })
        })
    },

    beforeDestroy(){
        this.unwatchList()
    },

    watch: {
        page(to, from){
            this.loadItems(to, from)
        }
    },

    filters: {
        host(url){
            const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
            const parts = host.split('.').slice(-3)
            if(parts[0] === 'www') parts.shift()
            return parts.join('.')
        },
        timeAgo(seconds){
            const pluralize = function(time, label){
                if(time === 1){
                    return time + label
                }
                return time + label + 's'
            }
            const between = Date.now() / 1000 - Number(seconds)
            if(between < 3600){
                return pluralize(~~(between / 60), ' minute')
            }else if (between < 86400) {
                return pluralize(~~(between / 3600), ' hour')
            }else {
                return pluralize(~~(between / 86400), ' day')
            }
        }
    },

    methods: {
        loadItems(to = this.page, from = -1){
            this.loading = true
            this.$store.dispatch('FETCH_LIST_DATA', {
                type: this.type
            }).then(() => {
                if(this.page < 0 || this.page > this.maxPage){
                    this.$router.replace(`/${this.type}/1`)
                    return
                }
                this.transition = to > from ? 'slide-left' : 'slide-right'
                this.displayedPage = to
                this.displayedItems = this.$store.getters.activeItems
                this.loading = false
            })
        }
    }

});


function FetchUser(store){
    return store.dispatch('FETCH_USER', {
        id: store.state.route.params.id
    })
};
const UserView = Vue.extend({
    template: '#userview',

    name: 'user-view',

    computed: {
        user(){
            return this.$store.state.users[this.$route.params.id]
        }
    },

    filters: {
        timeAgo(seconds){
            const pluralize = function(time, label){
                if(time === 1){
                    return time + label
                }
                return time + label + 's'
            }
            const between = Date.now() / 1000 - Number(seconds)
            if(between < 3600){
                return pluralize(~~(between / 60), ' minute')
            }else if (between < 86400) {
                return pluralize(~~(between / 3600), ' hour')
            }else {
                return pluralize(~~(between / 86400), ' day')
            }
        }
    },

    beforeMount(){
        FetchUser(this.$store)
    },

});


const CommentView = Vue.extend({
    template: '#commentview',
    name: 'comment',

    props: ['id'],
    data(){
        return {
            open: true
        }
    },
    computed: {
        comment(){
            return this.$store.state.items[this.id]
        }
    },
    beforeMount(){
        this.$store.dispatch('FETCH_ITEMS', {
            ids: [this.id]
        })
    },
    methods: {
        pluralize(n){
            return n + (n === 1? ' reply' : ' replies')
        }
    },

    filters: {
        timeAgo(seconds){
            const pluralize = function(time, label){
                if(time === 1){
                    return time + label
                }
                return time + label + 's'
            }
            const between = Date.now() / 1000 - Number(seconds)
            if(between < 3600){
                return pluralize(~~(between / 60), ' minute')
            }else if (between < 86400) {
                return pluralize(~~(between / 3600), ' hour')
            }else {
                return pluralize(~~(between / 86400), ' day')
            }
        },
    },
});



function FetchItem(store) {
    return store.dispatch('FETCH_ITEMS', {
        ids: [store.state.route.params.id]
    })
}
const ItemView = Vue.extend({
    template: '#itemview',
    name: 'itemview',

    components: { CommentView },

    computed: {
        item(){
            return this.$store.state.items[this.$route.params.id]
        }
    },

    beforeMount(){
        FetchItem(this.$store)
    },

    filters: {
        timeAgo(seconds){
            const pluralize = function(time, label){
                if(time === 1){
                    return time + label
                }
                return time + label + 's'
            }
            const between = Date.now() / 1000 - Number(seconds)
            if(between < 3600){
                return pluralize(~~(between / 60), ' minute')
            }else if (between < 86400) {
                return pluralize(~~(between / 3600), ' hour')
            }else {
                return pluralize(~~(between / 86400), ' day')
            }
        },
        host(url){
            const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
            const parts = host.split('.').slice(-3)
            if(parts[0] === 'www') parts.shift()
            return parts.join('.')
        },
    },
})


function createListView(type) {
    return {
        name: `${type}-stories-view`,
        preFetch(store) {
            return store.dispatch('FETCH_LIST_DATA', { type })
        },
        render(h){
            return h(ItemList, { props: { type }})
        }
    }
}

const router = new VueRouter({
    // scrollBehavior only works in HTML5 history mode
    // scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/top/:page(\\d+)?', component: createListView('top') },
        { path: '/new/:page(\\d+)?', component: createListView('new') },
        { path: '/show/:page(\\d+)?', component: createListView('show') },
        { path: '/ask/:page(\\d+)?', component: createListView('ask') },
        { path: '/job/:page(\\d+)?', component: createListView('job') },
        { path: '/user/:id', component: UserView },
        { path: '/item/:id(\\d+)?', component: ItemView },
        { path: '*', redirect: '/top' },
    ]
});

const store = new Vuex.Store({
    state: {
        activeType: null,
        itemsPerPage: 20,
        items: { },
        users: { },
        lists: {
            top: [],
            new: [],
            show: [],
            ask: [],
            job: []
        }
    },

    actions: {
        FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
            commit('SET_ACTIVE_TYPE', { type })
            return fetchIdsByType(type)
                .then(ids => commit('SET_LIST', { type, ids }))
                .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
        },

        ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
            return dispatch('FETCH_ITEMS', {
                ids: getters.activeIds
            })
        },

        FETCH_ITEMS: ({ commit, state }, { ids }) => {
            ids = ids.filter(id => !state.items[id])
            if(ids.length){
                return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
            }else {
                return Promise.resolve()
            }
        },

        FETCH_USER: ({ commit, state }, { id }) => {
            return state.users[id]
                ? Promise.resolve(state.users[id])
                : fetchUser(id).then(user => commit('SET_USER', { user }))
        }
    },

    mutations: {
        SET_ACTIVE_TYPE: (state, { type }) => {
            state.activeType = type
        },

        SET_LIST: (state, { type, ids }) => {
            state.lists[type] = ids
        },

        SET_ITEMS: (state, { items }) => {
            items.forEach( item => {
                if(item){
                    Vue.set(state.items, item.id, item)
                }
            })
        },

        SET_USER: (state, { user }) => {
            Vue.set(state.users, user.id, user)
        }
    },

    getters: {
        activeIds(state){
            const { activeType, itemsPerPage, lists } = state
            const page = Number(state.route.params.page) || 1
            if(activeType){
                const start = (page-1) * itemsPerPage
                const end = page * itemsPerPage
                return lists[activeType].slice(start, end)
            }else {
                return []
            }
        },

        activeItems (state, getters){
            return getters.activeIds.map(id => state.items[id])
        }
    }
})

sync(store, router);

new Vue({
    router,
    store,
    el: '#app'
})
