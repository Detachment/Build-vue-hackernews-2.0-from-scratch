<template>
    <div class="item-view" v-if="item">
        <template v-if="item">
            <div class="item-view-header">
                <a :href="item.url" target="_blank">
                    <h1>{{ item.title }}</h1>
                </a>
                <span v-if="item.url" class="host">
                    ({{ item.url | host }})
                </span>
                <p class="meta">
                    {{ item.score }} points
                    | by <router-link :to="'/user/' + item.by ">{{ item.by }}</router-link>
                    {{ item.time | timeAgo }} ago
                </p>
            </div>
            <div class="item-view-comments">
                <p class="item-view-comments-header">
                    {{ item.kids ? item.descendants + 'comments' : 'No comments yet.' }}
                    <spinner :show='loading'></spinner>
                </p>
                <ul v-if="!loading" class="comment-children">
                    <comment v-for="id in item.kids" :key="id" :id="id"></comment>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import Comment from '../components/Comment.vue'


function fetchItem(store) {
    return store.dispatch('FETCH_ITEMS', {
        ids: [store.state.route.params.id]
    })
}



export default {
  data () {
    return {}
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
