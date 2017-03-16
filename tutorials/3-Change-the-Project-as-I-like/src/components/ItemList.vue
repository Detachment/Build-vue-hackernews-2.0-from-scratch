<template>
    <div class="news-view">
        <spinner :show="loading"></spinner>
        <div class="news-list-nav">
            <span class="page">
                <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
                <a v-else class="disabled">&lt; prev</a>
                <span>{{ page }}/{{ maxPage }}</span>
                <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
                <a v-else class="disabled">more &gt;</a>
            </span>
            <a v-if=" type !== 'job'" class="nav-comments" :class="{ click: descendantsClicked }" @click="Sort('descendants')">
                <span>marks</span>
            </a>
            <a class="nav-time" :class="{ click: timeClicked }" @click="Sort('time')">
                <span>time</span>
            </a>
            <a class="nav-score" :class="{ click: scoreClicked }" @click="Sort('score')">
                <span>score</span>
            </a>
        </div>
        <transition :name="transition">
            <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
                <transition-group tag="ul" name="item">
                    <item v-for="item in displayedItems" :key="item.id" :item="item">
                    </item>
                </transition-group>
            </div>
        </transition>
    </div>
</template>

<script>
import Spinner from './Spinner.vue'
import Item from './Item.vue'
import { watchList } from '../store/api'

let isInitialRender = true

export default {
    name: 'item-list',

    components: {
        Spinner,
        Item
    },

    props: {
        type: String
    },

    data(){
        const data = {
            loading: false,
            scoreClicked: false,
            timeClicked: false,
            descendantsClicked: false,
            transition: 'slide-up',
            // if this is the initial render, directly render with the store state
            // otherwise this is a page switch, start with blank and wait for data load.
            // we need these local state so that we can precisely control the timing
            // of the transitions.
            displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
            displayedItems: isInitialRender ? this.$store.getters.activeItems: []
        }
        isInitialRender = false
        return data
    },

    computed: {
        page(){
            return Number(this.$store.state.route.params.page) || 1
        },
        maxPage(){
            const { itemsPerPage, lists } = this.$store.state
            return Math.ceil(lists[this.type].length / itemsPerPage)
        },
        hasMore(){
            return this.page < this.maxPage
        }
    },

    beforeMount(){
        if(this.$root._isMounted){
            this.loadItems(this.page)
        }

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
            this.scoreClicked = false
            this.timeClicked = false
            this.descendantsClicked = false
        }
    },

    methods: {
        loadItems(to = this.page, from = -1){
            this.loading = true
            this.$store.dispatch('FETCH_LIST_DATA', {
                type: this.type
            }).then(() => {
                if (this.page < 0 || this.page > this.maxPage) {
                    this.$router.replace(`/${this.type}/1`)
                    return
                }
                this.transition = from === -1
                ? null
                : to > from ? 'slide-left' : 'slide-right'
                this.displayedPage = to
                this.displayedItems = this.$store.getters.activeItems
                this.loading = false
            })
        },

        Sort(order){
            this.$store.getters.activeItemsSort(order)
            this.scoreClicked = false
            this.timeClicked = false
            this.descendantsClicked = false
            let s = order + 'Clicked'
            this[s] = true
        }
    }
}
</script>

<style lang="stylus">
.news-view
  padding-top 45px

.news-list
  border-radius 2px

.news-list-nav
  max-width 800px
  margin 0 auto
  background-color #fff
  padding 15px 0px
  position absolute
  top 25px
  left 0
  right 0
  z-index 998
  border-bottom 1px solid #eee
  border-top 1px solid #eee
  .page
    display inline-block
    text-align center
    font-weight 500
    margin-left 150px
    .disabled
      color #ccc
  .page a
    margin 0 1em
  .nav-score, .nav-time, .nav-comments
    position absolute
    top 50%
    right 0
    font-weight 500
    font-size 1em
    width 72px
    text-align center
    margin-top -10px
    padding 0 4px
    background url(../../public/arrow.png) no-repeat 65px -94px
    &:hover
        background url(../../public/arrow.png) no-repeat 65px -134px
        cursor pointer
  .click
        color #41b883
        background url(../../public/arrow.png) no-repeat 65px -134px
  .nav-time
    right 80px
  .nav-comments
    right 160px

.news-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-active
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-active, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .news-view
    .news-list-nav
      .nav-comments, .nav-time
        display none

@media (max-width 500px)
  .news-view
    .news-list-nav
      .page
        margin-left 100px

@media (max-width 400px)
  .news-view
    .news-list-nav
      .page
        margin-left 50px
</style>
