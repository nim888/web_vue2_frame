import api from '../../api';
import jskit from '../../assets/jskit';
import Vue from 'vue';

/**
 * pv数据上报
 */
Vue.directive('pv-report', {
    bind(el) {
        let page = el.getAttribute('report-page');
        let appId = el.getAttribute('report-appid');
        let reportData = {
            category: page,
            app_id: appId,
        };

        if (page) {
            jskit.statistics(api.GET_STAT, reportData);
        }
    },
});