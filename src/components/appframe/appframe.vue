<template>
    <div class="app-frame-wrap" :class="{ 'loading': showLoading }">
        <div class="app-frame-body">
            <slot name="header"></slot>
            <slot name="outer-top"></slot>
            <scroller ref="scroller" class="body-wrap" :singleton="true" :refresh="refresh" :infinite="infinite" @refresh="onRefresh" @infinite="onInfinite">
                <slot></slot>
                <slot name="no-more" v-if="infiniteAllLoad && showNoMore">
                    <div class="no-more">
                        <img src="data:image/png;base64,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" />
                        <span>我们是有底线的~</span>
                    </div>
                </slot>
            </scroller>
            <slot name="outer-bottom"></slot>
            <Toast></Toast>
        </div>
        <div class="page-loading-bg" v-if="showLoading" @touchstart="onDisableScroll">
            <img :src="require('../../assets/images/page-loading.gif')" />
        </div>
    </div>
</template>
<script>
import './appframe.scss';
import Vue from 'vue';
import api from '../../api';
import scroller from '../scroller/scroller.vue';
import Paginate from '../../assets/paginate';
import Toast from '../Toast';

// register
import '../../assets/jskit';
import '../../assets/filters';

// 数据上报指令
import '../../directives/dataReport/clickDataReport';
import '../../directives/dataReport/pvDataReport';

export default {
    props: {
    },
    data() {
        return {
            refresh: true,
            infinite: false,
            infiniteAllLoad: false,
            showNoMore: true,
            showLoading: true,
            paginate: null,
            mountTime: null,
        };
    },
    mounted() {
        this.mountTime = new Date().getTime();
    },
    methods: {
        onRefresh(done) {
            const interval = 1500;
            let refreshTime = new Date().getTime();

            this.$emit('refresh', _ => {
                let now = new Date().getTime();

                // 有分页器
                if (this.paginate) {
                    this.resetInfinite();
                    this.paginate.reset();
                    return this.paginate.next((err, page, isFinish) => {
                        let now = new Date().getTime();

                        this.onPaginateNext(err, page, isFinish);

                        if ((now - refreshTime) < interval) {
                            return setTimeout(_ => done(), interval - (now - refreshTime));
                        }

                        done();
                    });
                }

                now = new Date().getTime();

                if ((now - refreshTime) < interval) {
                    return setTimeout(_ => done(), interval - (now - refreshTime));
                }

                done();
            });
        },
        onInfinite(done) {
            // 有分页器则不会触发infinite
            if (this.paginate) {
                let status = this.paginate.getStatus();

                // 当前分页器状态
                if (status.wait || status.finish) {
                    done();

                    // 已到最后一页
                    if (status.finish) {
                        this.infiniteAllLoad = true;
                        this.disableInfinite();
                    }

                    return;
                }

                return this.paginate.next((err, page, isFinish) => {
                    this.onPaginateNext(err, page, isFinish);
                    done();
                });
            }

            this.$emit('infinite', allLoaded => {
                done();

                this.infiniteAllLoad = !!allLoaded;

                if (this.infiniteAllLoad) {
                    this.disableInfinite();
                }
            });

        },
        onPaginateNext(err, page, isFinish) {
            this.infiniteAllLoad = !!isFinish;

            if (this.infiniteAllLoad || (page === 1 && err)) {
                this.disableInfinite();
            }

            if (isFinish && !this.paginate.getStatus().length) {
                this.hideNoMoreTips();
            }
        },
        onDisableScroll(e) {
            e && e.preventDefault && e.preventDefault();
        },

        // 启用下拉刷新
        enableRefresh() { this.refresh = true; },
        // 禁用下拉刷新
        disableRefresh() { this.refresh = false; },
        // 激活下拉刷新
        activeRefresh() {
            this.$refs.scroller.$refs.loadmore.activeTopLoad();
        },
        // 启用上滑加载
        enableInfinite() { this.infinite = true; },
        // 禁用上滑加载
        disableInfinite() { this.infinite = false; },
        // 重置上滑加载
        resetInfinite() {
            this.infiniteAllLoad = false;
            this.enableInfinite();
        },
        // 隐藏没有更多
        hideNoMoreTips() { this.showNoMore = false; },
        // 显示没有更多
        showNoMoreTips(isAllLoaded) {
            this.showNoMore = true;

            if (isAllLoaded) {
                this.infiniteAllLoad = true;
            }
        },
        // 隐藏页面加载提示
        hidePageLoading() {
            const interval = 600;
            let now = new Date().getTime();

            if ((now - this.mountTime) < interval) {
                return setTimeout(_ => this.hidePageLoading(), interval - (now - this.mountTime));
            }

            this.showLoading = false;
        },
        // 显示页面加载提示
        showPageLoading() { this.showLoading = true; },
        // 初始化分页器
        initPaginate(args, disableFirstNext) {
            let flag = !!this.paginate;

            this.resetInfinite();
            this.paginate = new Paginate(args);

            // 仅首次初始化自动载入第一页
            !flag && !disableFirstNext && this.paginate.next((err, page, isFinish) => {
                this.onPaginateNext(err, page, isFinish);
                this.hidePageLoading();
            });
        },
    },

    components: {
        scroller,
        Toast,
    },
};
</script>