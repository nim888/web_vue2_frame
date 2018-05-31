<template>
    <div class="ui-toast" :class="{show: current}">
        <!-- 普通 -->
        <div v-if="current && current.type === TYPE_NORMAL">{{current && current.msg}}</div>
        <!-- 积分 -->
        <div v-if="current && current.type === TYPE_ICON_INTEGRAL" class="toast_icon_style">
            <div class="icon">
                <img src="https://asset-cdn.aldsd.net/page/static/iwanba/1.5/toast_integral_icon.png" />
            </div>
            <div>{{current && current.msg}}</div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';

let toast = {
    // 普通提示
    TYPE_NORMAL: 0,
    // 红包提示
    TYPE_ICON_INTEGRAL: 1,
    current: null,
    toastList: [],
};

let next = function (cb) {
    let current = toast.current = toast.toastList.shift();

    if (!current) {
        return;
    }

    setTimeout(_ => {
        // next tick
        setTimeout(_ => next(), 0);

        current.callback && current.callback();
    }, current.interval);
};
let show = function (opts) {
    // default
    opts = Object.assign({
        type: toast.TYPE_NORMAL,
    }, opts);

    if (!opts.interval) {
        opts.interval = 1600;
    }

    if (!opts.msg) {
        return;
    }

    let repeat = toast.toastList.filter(item => item.msg === opts.msg);

    // 有重复
    if (repeat.length > 0) {
        return;
    }

    toast.toastList.push({
        msg: opts.msg,
        interval: opts.interval,
        callback: opts.callback,
        type: opts.type,
    });

    !toast.current && next();
}

Object.defineProperties(Vue.prototype, {
    $toast: {
        get() {
            return {
                /**
                 * 显示toast消息
                 */
                show() {
                    if (typeof arguments[0] === 'object') {
                        return show(arguments[0]);
                    }

                    show({
                        msg: arguments[0],
                        callback: arguments[1],
                        interval: arguments[2],
                    });
                }
            }
        }
    }
})

export default {
    props: [
    ],
    data() {
        return toast;
    }
}
</script>
<style lang="sass">
    @import "../sass/_kit/variables.scss";
    .ui-toast{
        position: fixed;
        z-index: 9999;
        top: 50%;
        left:50%;
        color:#fff;
        text-align: center;
        border-radius: $rem*50;
        padding:$rem*18 $rem*28;
        font-size:$rem*28;
        background-color: rgba(0, 0, 0, .7);
        transition: transform 0s ease-in-out;
        transform:translate(-47%,-47%) scaleY(0);
        word-break: break-all;
        &.show{
            transform:translate(-47%,-47%) scaleY(1);
        }
        .toast_icon_style{
            padding-bottom: $rem*8;

            .icon {
                width: $rem*160;
                height: $rem*140;
                img {
                    margin-top: $rem*20;
                    width: $rem*99;
                    height: $rem*99;
                }
            }
        }
    }
</style>