const setupWebViewJavascriptBridge = function(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

const f = cb => setupWebViewJavascriptBridge(b => cb && cb(b));

// 当前版本号缓存
let currentVersion;

const bridge = {
    getNativeBridge: f,
    webview: {
        // JSAOpenPage 常量
        JSAOpenPage_TYPE_INNER_EXT_PAGE: 1, // 内部打开外链
        JSAOpenPage_TYPE_SAFARI: 2, // 在safari中打开
        JSAOpenPage_TYPE_INNER_PAGE: 3, // 内部打开内链
        /**
         * 启用原生下支付
         * JSALoadRefreshHeader
         * @param obj
         */
        onPay(obj) {
            //console.log(obj);
            f(b => {
                b.callHandler('JSAPayPage', obj);
            });
        },
        onShare(obj) {
            //console.log(obj);
            f(b => {
                b.callHandler('JSShareAction', obj);
            });
        },
        openWechat(obj) {
            f(b => {
                b.callHandler('JSOpenWX', obj);
            });
        }

        //JSShareAction分享,JSPurchase()去支付页面
    },
};

export default bridge;