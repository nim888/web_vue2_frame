import api from '../../api';
import jskit from '../../assets/jskit';
import Vue from 'vue';

function getReportPage(el) {
    if (!el || !(el instanceof Element)) {
        return;
    }
    let pageName = el.getAttribute('report-page');

    if (!pageName) {
        return getReportPage(el.parentElement);
    }

    return pageName;
}

function getReportCategory(el) {
    if (!el || !(el instanceof Element)) {
        return;
    }

    let categoryName = el.getAttribute('report-category');
    let categoryIndex = el.getAttribute('report-category-index') || '1';

    if (!categoryName) {
        return getReportCategory(el.parentElement);
    }

    return {
        name: categoryName,
        index: categoryIndex,
    };
}

function getReportData(el) {
    if (!el || !(el instanceof Element)) {
        return;
    }

    let index = el.getAttribute('report-index') || '1';
    let appId = el.getAttribute('report-appid');
    let category = getReportCategory(el);
    let page = getReportPage(el);

    if (!category || !page || !index) {
        return;
    }

    return {
        page,
        category: category.name,
        position1: category.index,
        position2: index,
        app_id: appId
    };
}

/**
 * 点击数据上报
 */
Vue.directive('click-report', {
    inserted(el, binding) {
        let isBind = el.getAttribute('report-event-is-bind');
        let reportData = getReportData(el);

        if (!isBind) {
            if (reportData) {
                el.setAttribute('report-event-is-bind', true);
                el.addEventListener('click', e => {
                    jskit.statistics(api.GET_STAT, reportData);
                }, true);
            }
        }
    },
});