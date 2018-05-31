<template>
    <loadmore ref="loadmore" :auto-fill="false" :is-singleton="singleton" :top-enabled="refresh" :top-method="onRefresh" :bottom-method="onInfinite" :bottom-all-loaded="!infinite" bottomPullText="上拉可以加载更多" bottomDropText="松开立即加载更多" bottomLoadingText="正在加载更多数据...">
        <slot></slot>
    </loadmore>
</template>
<script>
import './scroller.scss';
import Vue from 'vue';
import Loadmore from '../loadmore/loadmore.vue';

/* 私有函数 */

// 下拉刷新
function onRefresh() {
    if (this.refreshIng) {
        return this.$refs.loadmore.onTopLoaded();
    }

    this.refreshIng = true;

    this.refresh && this.$emit('refresh', _ => {
        this.refreshIng && this.$refs.loadmore.onTopLoaded();
        this.refreshIng = false;
    });
}
// 上滑加载
function onInfinite(done) {
    if (this.infiniteIng) {
        return this.$refs.loadmore.onBottomLoaded();
    }

    this.infiniteIng = true;
    this.infinite && this.$emit('infinite', _ => {
        this.infiniteIng && this.$refs.loadmore.onBottomLoaded();
        this.infiniteIng = false;
    });
}

export default {
    props: {
        // 下拉刷新是否启用
        refresh: { type: Boolean, default: false },
        // 上滑加载是否启用
        infinite: { type: Boolean, default: false },
        // 单例
        singleton: { type: Boolean, default: false },
    },
    data() {
        return {
            // 刷新中
            refreshIng: false,
            // 加载中
            infiniteIng: false,
        };
    },
    mounted() {
    },
    methods: {
        onRefresh,
        onInfinite,
    },
    components: {
        Loadmore,
    },
}
</script>