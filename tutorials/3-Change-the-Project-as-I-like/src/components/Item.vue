<template>
    <li class="news-item">
        <span class="title">
            <template v-if="item.url">
                <a :href="item.url" target="_blank">{{ item.title }}</a>
                <br>
                <span class="meta">
                    <span class="host"> ({{ item.url | host }})</span>
                    <span v-if="item.type !== 'job'" class="by">
                        by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
                    </span>
                </span>
            </template>
            <template v-else>
                <router-link :to="'/item/' + item.id ">{{ item.title }}</router-link>
                <br>
                <span v-if="item.type !== 'job'" class="by">
                    by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
                </span>
            </template>
        </span>
        <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
        <span v-if="item.type !== 'job'" class="comments-link">
            | <router-link :to="'/item/' + item.id">{{ item.descendants }} comments</router-link>
        </span>
        <span class="time">{{ item.time | time }}</span>
        <span class="score">{{ item.score }}</span>
    </li>
</template>

<script>
    import { timeAgo } from '../filters'

    export default {
        name: 'news-item',
        props: ['item'],

        serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
            return `${id}::${__lastUpdated}::${timeAgo(time)}`
        }
    }
</script>

<style lang="stylus">
.news-item
    background-color #fff
    padding 20px 110px 20px 20px
    border-bottom 1px solid #eee
    position relative
    line-height 20px
    .score, .time
        color #41b883
        font-size 1.1em
        font-weight 700
        position absolute
        top 50%
        right 0
        width 80px
        text-align center
        margin-top -10px

    .time
        color #41b883
        font-size 0.8em
        right 80px
        margin-top -20px

    .meta, .host
        font-size .85em
        color #999
        a
            color #999
            text-decoration underline
            &:hover
                color #41b883
    .title
        a
            &:hover
                color #41b883
</style>
