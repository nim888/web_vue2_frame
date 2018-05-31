/**
 * 入口文件
 */

import Vue from 'vue';
import App from './Home.vue';
import VueLazyload from 'vue-lazyload';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import Promise from 'es6-promise';
Promise.polyfill();

// starting with version 2.6.0, you need to manually introduce swiper's css 
require('swiper/dist/css/swiper.css');

//注册插件
[
    VueLazyload,
    VueAwesomeSwiper,
].map((item) => {
    Vue.use(item)
});

Vue.component('app', App);

new Vue({
    render: h => h(App)
}).$mount('app')