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
        <!-- <span class="label" v-if="item.type !== 'story'"> {{ item.type }}</span> -->
        <span v-if="item.type !== 'job'" class="comments">
            <router-link :to="'/item/' + item.id">{{ item.descendants }}</router-link>
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
    padding 10px 260px 10px 30px
    border-bottom 1px solid #eee
    position relative
    line-height 20px
    .score, .time, .comments
        color #41b883
        font-size 1em
        font-weight 500
        position absolute
        top 50%
        right 0
        width 80px
        text-align center
        margin-top -10px

    .time
        font-size 0.8em
        right 80px
        margin-top -20px

    .comments
        right 160px
        a
            color #41b883
            &:hover
                color #999

    .title
        .meta
            .host, .by
                font-size 1em
                color #999
                a
                    color #999
                    text-decoration underline
                    &:hover
                        color #41b883
        a
            &:hover
                color #41b883

@media (max-width 600px)
    .news-item
        padding-right 80px
        .time, .comments
            display none

</style>
