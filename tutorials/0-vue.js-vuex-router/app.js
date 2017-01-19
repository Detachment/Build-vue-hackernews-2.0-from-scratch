Vue.component('item', {
    template: '#item',
    name: 'news-item',
    props: ['item'],
    serverCacheKey: props => {
        return `${props.item.id}::${props.item.__lastUpdated}`
    }
});

Vue.component('spinner', {
    template: '#spinner',
    props: ['show']
});

Vue.component('itemList', {
    template: '#itemList',
    name: 'item-list',

    components: {
      spinner,
      item
    },

    props: {
      type: String
    },

    data () {
      const isInitialRender = !this.$root._isMounted
      return {
        loading: false,
        transition: 'slide-left',
        // if this is the initial render, directly render with the store state
        // otherwise this is a page switch, start with blank and wait for data load.
        // we need these local state so that we can precisely control the timing
        // of the transitions.
        displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
        displayedItems: isInitialRender ? this.$store.getters.activeItems : []
      }
    },

    computed: {
      page () {
        return Number(this.$store.state.route.params.page) || 1
      },
      maxPage () {
        const { itemsPerPage, lists } = this.$store.state
        return Math.ceil(lists[this.type].length / itemsPerPage)
      },
      hasMore () {
        return this.page < this.maxPage
      }
    },

    beforeMount () {
      if (this.$root._isMounted) {
        this.loadItems(this.page)
      }
      // watch the current list for realtime updates
      this.unwatchList = watchList(this.type, ids => {
        this.$store.commit('SET_LIST', { type: this.type, ids })
        this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
          this.displayedItems = this.$store.getters.activeItems
        })
      })
    },

    beforeDestroy () {
      this.unwatchList()
    },

    watch: {
      page (to, from) {
        this.loadItems(to, from)
      }
    },

    methods: {
      loadItems (to = this.page, from = -1) {
        this.loading = true
        this.$store.dispatch('FETCH_LIST_DATA', {
          type: this.type
        }).then(() => {
          if (this.page < 0 || this.page > this.maxPage) {
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
})

Vue.component('comment', {
    template: comment,
    name: 'comment',
    props: ['id'],
    data () {
      return {
        open: true
      }
    },
    computed: {
      comment () {
        return this.$store.state.items[this.id]
      }
    },
    beforeMount () {
      this.$store.dispatch('FETCH_ITEMS', {
        ids: [this.id]
      })
    },
    methods: {
      pluralize (n) {
        return n + (n === 1 ? ' reply' : ' replies')
      }
    }
});

function fetchItem (store) {
  return store.dispatch('FETCH_ITEMS', {
    ids: [store.state.route.params.id]
  })
};
Vue.component('itemView', {
    template: itemView,
    name: 'item-view',
    components: { spinner, comment },
    computed: {
      item () {
        return this.$store.state.items[this.$route.params.id]
      }
    },
    preFetch: fetchItem,
    beforeMount () {
      fetchItem(this.$store)
    }
});

function fetchUser (store) {
  return store.dispatch('FETCH_USER', {
    id: store.state.route.params.id
  })
};
Vue.component('userView', {
    template: userView,
    name: 'user-view',
    components: { spinner },
    computed: {
      user () {
        return this.$store.state.users[this.$route.params.id]
      }
    },
    preFetch: fetchUser,
    beforeMount () {
      fetchUser(this.$store)
    }
});

const store = new Vuex.Store({
    state: {
      activeType: null,
      itemsPerPage: 20,
      items: {/* [id: number]: Item */},
      users: {/* [id: string]: User */},
      lists: {
        top: [/* number */],
        new: [],
        show: [],
        ask: [],
        job: []
      }
    },

    actions: {
      // ensure data for rendering given list type
      FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
        commit('SET_ACTIVE_TYPE', { type })
        return fetchIdsByType(type)
          .then(ids => commit('SET_LIST', { type, ids }))
          .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
      },

      // ensure all active items are fetched
      ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
        return dispatch('FETCH_ITEMS', {
          ids: getters.activeIds
        })
      },

      FETCH_ITEMS: ({ commit, state }, { ids }) => {
        // only fetch items that we don't already have.
        ids = ids.filter(id => !state.items[id])
        if (ids.length) {
          return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
        } else {
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
        items.forEach(item => {
          if (item) {
            Vue.set(state.items, item.id, item)
          }
        })
      },

      SET_USER: (state, { user }) => {
        Vue.set(state.users, user.id, user)
      }
    },

    getters: {
      // ids of the items that should be currently displayed based on
      // current list type and current pagination
      activeIds (state) {
        const { activeType, itemsPerPage, lists } = state
        const page = Number(state.route.params.page) || 1
        if (activeType) {
          const start = (page - 1) * itemsPerPage
          const end = page * itemsPerPage
          return lists[activeType].slice(start, end)
        } else {
          return []
        }
      },

      // items that should be currently displayed.
      // this Array may not be fully fetched.
      activeItems (state, getters) {
        return getters.activeIds.map(id => state.items[id]).filter(_ => _)
      }
    }
});

function createListView (type) {
  return {
    name: `${type}-stories-view`,
    render (h) {
      return h(itemList, { props: { type }})
    }
  }
}
const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/top/:page(\\d+)?', component: createListView('top') },
      { path: '/new/:page(\\d+)?', component: createListView('new') },
      { path: '/show/:page(\\d+)?', component: createListView('show') },
      { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      { path: '/job/:page(\\d+)?', component: createListView('job') },
      { path: '/item/:id(\\d+)', component: itemView },
      { path: '/user/:id', component: userView },
      { path: '*', redirect: '/top' }
    ]
});

const app = new Vue({
    el: '#app',
    store,
    router
})
