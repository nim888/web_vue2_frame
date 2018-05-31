import wx from './weixin.js';
import Xx from "fingerprintjs";
import base64 from "./base64.js";

window.wx = wx;
var jskit = {
    VERSION: '0.1.0',
    isDebug: false
};

/*
首页认证URL也要改：baseUrl
*/
jskit.hostname = '//' + location.hostname + '/';

var https_online = BASE64.encoder('https://' + location.hostname + '/h5/index.html?isGrant=1');
var http_online = BASE64.encoder('http://' + location.hostname + '/h5/index.html?isGrant=1');

var https_dev = BASE64.encoder('https://' + location.hostname + '/h5dev/index.html?isGrant=1');
var http_dev = BASE64.encoder('http://' + location.hostname + '/h5dev/index.html?isGrant=1');

if (location.pathname.split('/')[1] == 'h5') { // 线上环境
    jskit.shareReport = 'https://wwj-api.aiwanba.com/invite/shareReport';
    jskit.hosturl = jskit.hostname + 'h5/'
    jskit.isgrantURL_HTTPS = https_online;
    jskit.isgrantURL_HTTP = http_online;
} else if (location.pathname.split('/')[1] == 'h5dev') { // 测试环境
    jskit.shareReport = 'https://wwj-api-dev.aiwanba.com/invite/shareReport';
    jskit.hosturl = jskit.hostname + 'h5dev/'
    jskit.isgrantURL_HTTPS = https_dev;
    jskit.isgrantURL_HTTP = http_dev;
} else { // 本地环境
    jskit.shareReport = 'https://wwj-api-dev.aiwanba.com/invite/shareReport';
    // jskit.isgrantURL_HTTPS = BASE64.encoder('http://192.168.94.29:8081/index.html?isGrant=1');
    jskit.isgrantURL_HTTP = BASE64.encoder('http://192.168.95.81:8081/index.html?isGrant=1');
}

var toString = function(obj) {
    return ({}).toString.call(obj);
};

function isType(type) {
    return function(obj) {
        return toString(obj) === '[object ' + type + ']';
    };
}

var isObject = isType('Object'),
    isString = isType('String'),
    isArray = Array.isArray || isType('Array'),
    isFunction = isType('Function'),
    isUndefined = isType('Undefined');

var ua = window.navigator.userAgent;
jskit.isWechat = /MicroMessenger/i.test(ua); // 判断是否在微信浏览器
jskit.isIphone = /iPhone/ig.test(ua);
jskit.isAndroid = /Android|Linux/.test(ua);
jskit.isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/ig.test(ua);

// 本地存储标志  
jskit.LOCALSTORAGEKEY = {
    TOKEN: 'USER_TOKEN', //TOKEN
    AUTH: 'AUTH', //用户信息
    INVITE_CODE: 'INVITE_CODE', //邀请
    CHANNEL_ID: 'CHANNEL_ID', //渠道
    INITWXUSER_DDWWJ: 'INITWX_DDWWJ_V1.3.1.4', //微信用户初始化
    UDID_KEY: 'UDID_20180207.4', //微信用户初始化
    WXID: 'WXID',
    USERID: 'USERID'
};

jskit.extends = function() {
    var obj,
        args = arguments,
        i = 1,
        len = args.length,
        src = args[0],
        key;

    //如果只有一个参数则将这个参数合并到当前调用对象上
    if (len === 1) {
        i = 0;
        src = this;
    }
    for (; i < len; i++) {
        if ((obj = args[i])) {
            for (key in obj) {
                src[key] = obj[key];
            }
        }
    }
    return src;
};

Object.assign = Object.assign || function() {
    var obj,
        args = arguments,
        i = 1,
        len = args.length,
        src = args[0],
        key;

    //如果只有一个参数则将这个参数合并到当前调用对象上
    if (len === 1) {
        i = 0;
        src = this;
    }
    for (; i < len; i++) {
        if ((obj = args[i])) {
            for (key in obj) {
                src[key] = obj[key];
            }
        }
    }
    return src;
};

jskit.cookie = {
    getCookie: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    //s20是代表20秒
    //h是指小时，如12小时则是：h12
    //d是天数，30天则：d30
    setCookie: function(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";domain=" + location.hostname + ";expires=" + exp.toGMTStr
    },
    removeCookie: function(name) {

    }
}

var utils = {
    //获得随机字符串，默认16位
    getNonce: function(length) {
        length = length || 16;
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var pos = chars.length;
        var nonces = [];
        var i;
        for (i = 0; i < length; i++) {
            nonces.push(chars.charAt(Math.floor(Math.random() * pos)));
        }
        return nonces.join('');
    },

    /**
     * 解析url
     * @param  {Strinfg}  str      需要解析的URL
     * @param {boolean} [isNoCaseSensitive] 是否不区分大小写 default:false 默认是区分的
     *                                      如果值为true，则会全部转成小写
     * @return {String}
     */
    parseUrl: function(str, isNoCaseSensitive) {
        var arr,
            part,
            url = {};
        if (!(str || '').replace(/^\s+|\s+$/, '')) {
            return {};
        }

        if (isNoCaseSensitive) {
            str = str.toLocaleLowerCase();
        }

        if ((str = str.substring(1))) {
            arr = str.split('&');
            for (var i in arr) {
                part = arr[i].split('=');
                url[part[0]] = decodeURIComponent(part[1]);
            }
        }
        return url;
    },
    /**
     * 获得当前页面的参数
     * @param {boolean} [isNoCaseSensitive] 是否不区分大小写 default:false 默认是区分的
     * @return {object} [description]
     */
    getUrlObj: function(isNoCaseSensitive) {
        return utils.parseUrl(location.search, false, isNoCaseSensitive);
    },


    /**
     * 日期文本兼容处理
     */
    date: function(str) {
        if (!str) {
            return new Date();
        }
        if (str instanceof Date) {
            return str;
        }

        str = str.replace(/-/g, '\/');
        return new Date(str);
    },
    // 生成随机数
    random: function(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    },
    // 函数同步执行, 最后一个函数结束后回调
    asyncFuncs: function(funcs, cb) {
        let doneCount = 0;
        let done = _ => ++doneCount >= funcs.length && cb && cb();
        funcs.forEach(func => func(_ => done()));
    },
};
jskit.extends(jskit, {
    utils: utils,
    // pageBridge: require('./pageBridge').default,
});

/*
 * 日期格式化
 * from http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
 */
Date.prototype.format = function(fmt) {
    let o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) :
                (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
};

/** 
udid(用户唯一标识),
invite_code(邀请码 https://ddwwj.xxx.cn/h5/index.html?userid=2222),
channel_id(渠道IDhttps://ddwwj.xxx.cn/h5/index.html?channelid=)
**/

var udid, INVITE_CODE, CHANNEL_ID;
var setudid = 'WW' + jskit.utils.getNonce(30) + 'YS' + new Xx().get();

// if (jskit.isIos && location.protocol == 'http:' && location.port != '8081') {
//     let udid = jskit.cookie.getCookie('https:' + jskit.LOCALSTORAGEKEY.UDID_KEY);
//     let auth = {
//         auth: jskit.cookie.getCookie(jskit.LOCALSTORAGEKEY.AUTH),
//         token: jskit.cookie.getCookie(jskit.LOCALSTORAGEKEY.TOKEN),
//         openid: jskit.cookie.getCookie(jskit.LOCALSTORAGEKEY.WXID),
//         userId: jskit.cookie.getCookie(jskit.LOCALSTORAGEKEY.USERID)
//     };
//     localStorage.setItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY, udid);
//     localStorage.setItem(jskit.LOCALSTORAGEKEY.AUTH, JSON.stringify(auth));
//     //alert(1);
// }

/**
 * APP内页面登录
 * app is login
 * @param {userId} 
 * @param {auth} 
 */
if (jskit.utils.getUrlObj().tag == "app") {

    //2.
    var user = {
        auth: jskit.utils.getUrlObj().auth,
        userId: jskit.utils.getUrlObj().userid
    };
    //3.
    window.localStorage.setItem(jskit.LOCALSTORAGEKEY.AUTH, JSON.stringify(user));
    window.localStorage.setItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY, jskit.utils.getUrlObj().udid);
    //4.
    window.localStorage.setItem('APPINPAGE', 1);
}

// jskit注入
window.jskit = jskit;
jskit.http = {};
jskit.http.post = function(url, data, cb) {
    jskit.auth.getUserAuth(val => {
        const axios = require('axios');
        let params = Object.assign({
            platform: jskit.isWechat ? 4 : 3, //1=苹果，2=安卓 ,3=H5 ,4=微信
            ddwwj: "ddwwj_v1",
            auth: val && val.auth,
            token: val && val.token,
            udid: udid || jskit.UDID,
            invite_code: INVITE_CODE,
            channel: CHANNEL_ID,
        }, data)


        var formData = new FormData();
        for (let k in params) {
            formData.append(k, params[k])
        }
        axios.post(url, formData).then((response) => {
            let result = response;

            if (response.status >= 200 && response.status < 300) {
                cb && cb(null, result.data, result)
            } else {
                if (result) {
                    result.msg = result.msg || '网络开小差了哦~';
                    cb && cb(result.msg)
                }
            }
        }, () => {
            cb && cb('网络开小差了哦~')
        })
    })
};

/**
 * 打开APPSTORE APP页面
 * JSADownUpdateApp
 * @param {type} boolean ture:获取token并跳转到login页面
 * @param {function} cb 
 */

jskit.isLogin = function(type, cb) {
    jskit.auth.getUserAuth(val => {
        if ((!val || !val.auth) && type) {
            //wechat || h5
            // if (jskit.isWechat && location.protocol == 'http:' && jskit.isIos && location.port != '8081') {
            //     //localStorage.removeItem(location.protocol + jskit.LOCALSTORAGEKEY.INITWXUSER_DDWWJ);
            //     //localStorage.removeItem(jskit.LOCALSTORAGEKEY.AUTH);
            //     window.location.href = 'https:' + jskit.hostname + 'h5/index.html?igo=http';

            // } else {
            //     window.location.href = `login.html?back=${encodeURIComponent(window.location.href)}`;
            // }

            window.location.href = `login.html?back=${encodeURIComponent(window.location.href)}`;
            return false;
        }
        if (val === null) {
            cb && cb();
        } else {
            cb && cb(val.auth);
        }
    });
};
//倒计时函数 countDown 最少传入两个参数 第一个是需要倒计时的秒数，第二个是回调
jskit.countDown = function(t, d, cb) {
    // 倒计时格式 '02:10:10' (2小时 10分 10秒)
    //t 是需要倒计时的秒数
    //d 传入之后返回倒计时格式 天 时 分 秒 不传返回倒计时格式 时 分 秒
    //cb 回调函数 返回倒计时的数字 和 倒计时结束的状态 

    // 判断传入的参数 至少要传2个 时间和回调
    // console.log(arguments)
    if (arguments.length == 2 && typeof(arguments[1]) == 'function') {
        cb = arguments[1]
        d = '00';
    }
    // 防止定时器叠加
    var timer = null;
    //倒计时是否结束 初始false没有结束
    var status = false;
    var nowTime = '';
    // 时分秒小于10 格式化
    function numFormate(date) {
        if (date < 10) {
            date = '0' + date;
        }
        return date;
    }
    //秒数--
    function getDown() {
        if (t >= 0) {
            var second = parseInt(t % 60);
            var minute = parseInt(t / 60 % 60);
            var hour = parseInt(t / 60 / 60 % 24);
            var day = parseInt(t / 60 / 60 / 24);
            second = numFormate(second);
            minute = numFormate(minute);
            hour = numFormate(hour);
            day = numFormate(day)

            if (d === 'dd' && day !== "00") {
                nowTime = day + '天 ' + hour + '时 ' + minute + '分 ' + second + '秒'
            } else {
                nowTime = hour + ':' + minute + ':' + second
                if (hour == '00' && minute == '00') {
                    nowTime = second
                }

            }
            t--
            cb && cb(nowTime, status)
        } else {
            clearTimeout(timer)
            timer = null;
            status = true;
            cb && cb(nowTime, status)
        }
    }
    //定时器
    if (timer === null) {
        timer = setInterval(getDown, 1000)
    }
}

/**
 * openPage
 * @param {url} 跳转到页面
 * @param {function} cb 
 */
jskit.openPage = function(url, cb) {
    if (!url) {
        cb && cb()
    } else {
        let t = '';
        url = url.toString();
        url.includes('.html?') ? t = '&t=' : t = '?t=';
        window.location.href = url + t + jskit.utils.getNonce(10);
    }
};

/**
 * backPage
 */
jskit.backPage = function(url) {
    if (url) {
        // alert(url);
        // let t = '';
        // url.includes('.html?') ? t = '&t=' : t = '?t=';
        // window.location.href = url + t + jskit.utils.getNonce(10);
        window.location.href = url;
        return;
    }
    // window.history.go(-1);
    window.history.back();
};

// localStorage
jskit.localStorage = {
    setItem(key, object, cb) {
        if (!key || !object) {
            return
        }
        key = key.toString();

        try {
            object = JSON.stringify(object);
        } catch (ex) {
            return;
        }
        window.localStorage.setItem(key, object);
        setTimeout(_ => cb && cb(), 0);
    },
    getItem(key, cb) {
        if (!key) {
            return;
        }
        key = key.toString();
        setTimeout(_ => {
            let value = window.localStorage.getItem(key);
            try {
                value = JSON.parse(value);
            } catch (ex) {
                //console.log(value, 'ddd');
                value = value || null;
            }

            cb && cb(value)
        })
    },
    removeItem(key, cb) {
        if (!key) {
            return cb && cb('key不能为空');
        }
        window.localStorage.removeItem(key);
        setTimeout(_ => cb && cb(), 0);
    }
}


//用户相关
/*
 * @param {string}  url
 * @param {object}  params
 */

jskit.auth = {
    getToken(cb) {
        jskit.localStorage.getItem(jskit.LOCALSTORAGEKEY.TOKEN, token => {
            cb && cb(token);
        })
    },
    /**
     * 设置用户token
     * @param {string} token 
     * @param {function} cb 
     */
    setToken(token, cb) {
        if (!token) {
            return jskit.localStorage.removeItem(jskit.LOCALSTORAGEKEY.TOKEN, _ => {
                cb && cb()
            })
        }
        jskit.localStorage.setItem(jskit.LOCALSTORAGEKEY.TOKEN, token, _ => {
            cb && cb();
        })
    },
    /**
     * 获取用户认证
     * @param {function} cb 
     */
    getUserAuth(cb) {

        //get LOCALSTORAG DATA
        jskit.localStorage.getItem(jskit.LOCALSTORAGEKEY.AUTH, userinfo => {
            cb && cb(userinfo);
        })


        udid = localStorage.getItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY);
        INVITE_CODE = localStorage.getItem(jskit.LOCALSTORAGEKEY.INVITE_CODE);
        CHANNEL_ID = localStorage.getItem(jskit.LOCALSTORAGEKEY.CHANNEL_ID);

        if (udid == null) {
            jskit.UDID = setudid;
            localStorage.setItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY, setudid);
            // jskit.cookie.setCookie('https:' + jskit.LOCALSTORAGEKEY.UDID_KEY, setudid);
        }

        if (jskit.utils.getUrlObj().userid) {
            localStorage.setItem(jskit.LOCALSTORAGEKEY.INVITE_CODE, jskit.utils.getUrlObj().userid || ''); //邀请码
        }


        if (jskit.utils.getUrlObj().channelid) {
            localStorage.setItem(jskit.LOCALSTORAGEKEY.CHANNEL_ID, jskit.utils.getUrlObj().channelid || ''); //渠道商ID
        }


    },
    /**
     * 设置用户信息
     * @param {object} userInfo 
     * @param {function} cb 
     */
    setUserAuth(userinfo, cb) {
        if (!userinfo) {
            return jskit.localStorage.removeItem(jskit.LOCALSTORAGEKEY.AUTH, _ => {
                cb && cb();
            })
        }
        jskit.localStorage.setItem(jskit.LOCALSTORAGEKEY.AUTH, userinfo, _ => {
            cb && cb()
        })
    }
}

//页面PV统计
/*
 * @param {string}  url
 * @param {object}  params
 */
jskit.statistics = function(url, params) {
    jskit.http.post(url, params, (err, data) => {
        if (!err) {
            console.log('pagename:' + params.category);
        } else {
            console.log(err);
        }
    });
};

// 页面添加滚动事件
jskit.pageInfinite = function(that, fnName) { // 1传入this 2.传入的方法名
    window.addEventListener('scroll', _ => {
        var scrollHeight = document.body.scrollHeight; // 页面的高度
        var scrollTop = document.body.scrollTop; // 卷去的高度
        var clientHeight = document.body.clientHeight; // 可视区域的高度
        // console.log(scrollHeight-scrollTop-clientHeight)
        if (scrollHeight - scrollTop - clientHeight <= 300) {
            if (that.temp) {
                that.temp = false;
                that.page++;
                if (!that.isFoot) {
                    if (fnName) {
                        fnName();
                    } else {
                        that.onInit();
                    }
                }
            }
        }
    }, false);
}

// touchpage
jskit.touchpage = {
    stopScrolling: function(touchEvent) {
        touchEvent.preventDefault();
    },
    onTouch: function() {
        document.addEventListener('touchmove', jskit.touchpage.stopScrolling, false);
    },
    removeTouch: function() {
        document.removeEventListener('touchmove', jskit.touchpage.stopScrolling, false);
    }
};

// PreventRepetitiveExecution
let preKeys = new Map();
jskit.pre = {
    // 防止重复执行
    exec: function(key, cb) {
        if (!preKeys.get(key)) {
            preKeys.set(key, true);
            return cb && cb(_ => {
                preKeys.delete(key);
            });
        }
    },
};

// var shareTextObj = [{
//         title: '视频娃娃机首次登陆！',
//         desc: '这游戏有毒一天不玩都难受！太夸张了，还没见过这样的游戏呢~'
//     },
//     {
//         title: '全网首款视频娃娃机来啦！',
//         desc: ' 原来抓娃娃还能这样玩！涨知识了！偶滴神！'
//     },
//     {
//         title: '居然手机也能玩娃娃机！',
//         desc: '点点娃娃机全国包邮，新用户送10次免费机会！不用下载也能直接玩'
//     },
//     {
//         title: '好多可爱的娃娃啊！',
//         desc: '还在找好看的娃娃机？这里数千款超可爱娃娃在等着你哟~',
//     },
//     {
//         title: '视频第一娃娃机品牌！',
//         desc: '[点点娃娃机] 用户已突破10万，每天N多人陪你一起抓娃娃哦~',
//     },
//     {
//         title: '同学，你朋友塞给你一张小纸条',
//         desc: '这个娃娃机可以免费抓娃娃哦~',
//     },
//     {
//         title: '您收到一个微信红包',
//         desc: '请点击查收，内附百款娃娃。',

//     },
//     {
//         title: '我们的童年永远不会结束！',
//         desc: '这个点点娃娃机里面藏着我们的童年哦！',
//     },
//     {
//         title: '童心未泯，一件值得骄傲的事情',
//         desc: '来，我带你去点点娃娃机找回童心~',
//     },
//     {
//         title: '点击没惊喜，那是耍赖皮！',
//         desc: '点击进入点点娃娃机，百款娃娃任你抓，豌豆好礼任你领！！！',
//     }
// ];







if (jskit.isWechat) {
    //console.log(testObj[shareTextNum].title, testObj[shareTextNum].des);
    jskit.isReady = false;
    //alert('shareTextNum:' + shareTextNum);
    jskit.wechatStart = () => {
        jskit.localStorage.getItem(jskit.LOCALSTORAGEKEY.AUTH, (userInfo) => {
            jskit.http.post('https://wwj-api.aiwanba.com/my/index', {}, (err, data, res) => {
                let shareTextObj = [{
                        title: '视频娃娃机首次登陆！',
                        desc: '点点娃娃机全国包邮， 新用户送10次免费机会！ 不用下载也能直接玩'
                    },
                    {
                        title: data.nick + '@我，收到福利礼包！',
                        desc: data.nick + '送您10次免费机会，还包邮哦！不用下载也能直接玩'
                    }
                ];
                let shareTextNum = jskit.utils.random(0, 1);

                jskit.wechat = {
                    shareConf: {
                        title: shareTextObj[shareTextNum].title, //'点点娃娃机',
                        desc: shareTextObj[shareTextNum].desc, //'火爆全网的手机在线抓娃娃，远程实时操控、零卡顿，打造完美临场感！',
                        link: location.protocol + jskit.hosturl + 'index.html?userid=' + userInfo.userId,
                        imgUrl: data.avatar, //'https://asset-cdn.aldsd.net/page/static/ddwwj/v1/share_img.png'
                    },
                    init: function() {
                        // alert(jskit.wechat.shareConf.link);
                        // if (location.protocol == 'http') {
                        //     location.hostname = 'qwkqcu.cn';
                        // }
                        jskit.http.post(location.protocol + '//' + location.hostname + '/wechat/default/jssdk', { url: location.href }, (err, data, res) => {
                            wx.config(data);
                            wx.ready(function() {
                                jskit.isReady = true;
                                wx.checkJsApi({
                                    jsApiList: [
                                        'onMenuShareTimeline',
                                        'onMenuShareAppMessage',
                                    ]
                                });

                                wx.showMenuItems({
                                    menuList: [
                                        'menuItem:profile', // 添加查看公众号
                                        'menuItem:addContact'
                                    ]
                                });

                                // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
                                wx.onMenuShareAppMessage({
                                    title: jskit.wechat.shareConf.title,
                                    desc: jskit.wechat.shareConf.desc,
                                    link: jskit.wechat.shareConf.link + '&channelid=QENG_PY',
                                    imgUrl: jskit.wechat.shareConf.imgUrl,
                                    success: function(res) {

                                        jskit.http.post(jskit.shareReport, {
                                            udid: localStorage.getItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY),
                                            auth: userInfo.auth,
                                            channel: localStorage.getItem(jskit.LOCALSTORAGEKEY.CHANNEL_ID), //street+this.area,
                                            type: 1, //2分享给朋友圈 ,1分享给朋友
                                        }, (err, data, res) => {
                                            if (data && data.result == 0) {
                                                //alert('1分享给朋友');
                                                localStorage.setItem('result_share', 1);
                                                //localStorage.setItem('share分享成功', { udid: localStorage.getItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY), auth: userInfo.auth, channel: localStorage.getItem(jskit.LOCALSTORAGEKEY.CHANNEL_ID) })
                                            }
                                        });
                                    },
                                    cancel: function(res) {
                                        // alert('已取消2');
                                    }
                                });

                                //分享给朋友圈
                                wx.onMenuShareTimeline({
                                    title: jskit.wechat.shareConf.title + ' ' + jskit.wechat.shareConf.desc || '您收到一个微信红包,请点击查收，内附百款娃娃。',
                                    link: jskit.wechat.shareConf.link + '&channelid=QENG_PYQ',
                                    imgUrl: jskit.wechat.shareConf.imgUrl,
                                    success: function(res) {
                                        jskit.http.post(jskit.shareReport, {
                                            udid: localStorage.getItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY),
                                            auth: userInfo.auth,
                                            channel: localStorage.getItem(jskit.LOCALSTORAGEKEY.CHANNEL_ID), //street+this.area,
                                            type: 2, //2分享给朋友圈 ,1分享给朋友
                                        }, (err, data, res) => {
                                            if (data && data.result == 0) {
                                                //alert('2分享给朋友圈');
                                                //localStorage.setItem('share分享成功', { udid: localStorage.getItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY), auth: userInfo.auth, channel: localStorage.getItem(jskit.LOCALSTORAGEKEY.CHANNEL_ID) })
                                            }
                                        });
                                        //var img = new Image();
                                        //img.src = "https: //wwj-open.aiwanba.com/wechat/promote/qr?uid=" + userInfo.userId + '&ch=' + localStorage.getItem(jskit.LOCALSTORAGEKEY.CHANNEL_ID);

                                    },
                                    cancel: function() {
                                        // 用户取消分享后执行的回调函数
                                    }
                                });
                                //jskit.wechat.onShare(jskit.wechat.shareConf);
                                jskit.wechat.onShare(jskit.wechat.shareConf);
                            });
                            wx.error(function(res) {
                                console.log('wx error', res)
                            });
                        });

                    },
                    onShare: function(config) {
                        shareTextNum = jskit.utils.random(0, 9);

                        //分享给朋友圈
                        // wx.onMenuShareTimeline({
                        //     title: config.title,
                        //     link: config.link,
                        //     imgUrl: config.imgUrl,
                        //     success: function(res) {
                        //         // alert(JSON.stringify(res))
                        //         // 用户确认分享后执行的回调函数
                        //     },
                        //     cancel: function() {
                        //         // 用户取消分享后执行的回调函数
                        //     }
                        // });

                        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
                        // wx.onMenuShareAppMessage({
                        //     title: config.title,
                        //     desc: config.desc,
                        //     link: config.link,
                        //     imgUrl: config.imgUrl,
                        //     success: function(res) {
                        //         // alert('已分享2');
                        //     },
                        //     cancel: function(res) {
                        //         // alert('已取消2');
                        //     }
                        // });

                    }
                }

                jskit.wechat.init();

            });

        });
    }
    setTimeout(() => {
        jskit.wechatStart();
    }, 2000);

};
jskit.shareTextList = [{
        title: '视频娃娃机首次登陆！',
        desc: '这游戏有毒一天不玩都难受！太夸张了，还没见过这样的游戏呢~'
    },
    {
        title: '全网首款视频娃娃机来啦！',
        desc: ' 原来抓娃娃还能这样玩！涨知识了！偶滴神！'
    },
    {
        title: '居然手机也能玩娃娃机！',
        desc: '点点娃娃机全国包邮，新用户送10次免费机会！不用下载也能直接玩'
    },
    {
        title: '好多可爱的娃娃啊！',
        desc: '还在找好看的娃娃机？这里数千款超可爱娃娃在等着你哟~',
    },
    {
        title: '视频第一娃娃机品牌！',
        desc: '[点点娃娃机] 用户已突破10万，每天N多人陪你一起抓娃娃哦~',
    },
    {
        title: '同学，你朋友塞给你一张小纸条',
        desc: '这个娃娃机可以免费抓娃娃哦~',
    },
    {
        title: '您收到一个微信红包',
        desc: '请点击查收，内附百款娃娃。',

    },
    {
        title: '我们的童年永远不会结束！',
        desc: '这个点点娃娃机里面藏着我们的童年哦！',
    },
    {
        title: '童心未泯，一件值得骄傲的事情',
        desc: '来，我带你去点点娃娃机找回童心~',
    },
    {
        title: '点击没惊喜，那是耍赖皮！',
        desc: '点击进入点点娃娃机，百款娃娃任你抓，豌豆好礼任你领！！！',
    }
];

export default jskit;