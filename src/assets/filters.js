import Vue from 'vue';
import jskit from './jskit';

// 日期兼容处理
const dateCompatible = date => {
    if (date instanceof Date) {
        return date;
    }

    return date && date.replace(/\-/g, '/')
};

// 数字单位
Vue.filter('num-unit', function(num) {
    num = parseInt(num);

    if (!num) {
        return '0';
    }
    // max 99999
    if (num < 100000) {
        return num.toString();
    }
    // max 100.0w
    if (num < 1000000) {
        return `${(num / 10000).toFixed(1)}w`;
    }
    // max 100.0m
    if (num < 100000000) {
        return `${(num / 1000000).toFixed(1)}m`;
    }

    return num.toString();
});

// 日期单位
Vue.filter('date-unit', function(date, diffDate) {
    // 日期兼容处理
    date = dateCompatible(date);
    diffDate = dateCompatible(diffDate);

    let diff = (diffDate || new Date()) - new Date(date);
    let us = 1000;
    let um = us * 60;
    let uh = um * 60;
    let ud = uh * 24;
    let uM = ud * 30;
    let uY = uM * 365;

    if (!diff || diff <= 0) {
        return '刚刚';
    }
    if (diff < um) {
        return `${parseInt(diff / us)}秒前`;
    }
    if (diff < uh) {
        return `${parseInt(diff / um)}分钟前`;
    }
    if (diff < ud) {
        return `${parseInt(diff / uh)}小时前`;
    }
    if (diff < uM) {
        return `${parseInt(diff / ud)}天前`;
    }
    if (diff < uY) {
        return `${parseInt(diff / uM)}个月前`;
    }
    return `${parseInt(diff / uY)}年前`;
});

// 时间单位
Vue.filter('time-unit', function(time) {
    time = parseInt(time) || 0;

    if (time < 60) {
        return `${time}秒`;
    } else if (time < 3600) {
        return `${parseInt(time / 60)}分钟`;
    } else {
        return `${parseInt(time / 60 / 60)}小时`;
    }
});

// 日期转换
Vue.filter('date-format', function(date, fmt) {
    // 日期兼容处理
    date = dateCompatible(date);

    return new Date(date).format(fmt || 'yyyy-MM-dd hh:mm:ss');
});