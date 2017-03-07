import Vue from 'vue'
import Vuex from 'vuex'
import { fetchItems, fetchIdsByType, fetchUser } from './api'

Vue.use(Vuex)

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
            const now = Date.now()
            ids = ids.filter(id => {
                const item = state.items[id]
                if(!item){
                    return true
                }
                if(now - item.__lastUpdated > 1000*60*3){
                    return true
                }
                return false
            })
            if (ids.length) {
                return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
            }else {
                return Promise.resolve
            }
        },

        FETCH_USER: ({ commit, state }, { id }) => {
            return state.users[id]
                ? Promise.resolve(state.users[id])
                : fetchUser(id).then(user => commit('SET_USER', { user }))
        }
    },

    getters: {
        activeIds(state){
            const { activeType, itemsPerPage, lists } = state
            const page = Number(state.route.params.page) || 1
            if (activeType) {
                const start = (page - 1) * itemsPerPage
                const end = page * itemsPerPage
                return lists[activeType].slice(start, end)
            }else {
                return []
            }
        },

        activeItems(state, getters){
            return getters.activeIds.map(id => state.items[id]).filter(_ => _)
        }
    }
})

export default store
