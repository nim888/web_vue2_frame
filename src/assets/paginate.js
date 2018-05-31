import jskit from './jskit';

class Paginate {
    /**
     * 分页器
     * @param {object} opts
     * @param {string} opts.api 接口API
     * @param {object} opts.data 接口传入参数
     * @param {number} opts.page 页码, 可不传, 默认为0
     * @param {number} opts.pageSize 每页大小, 可不传, 默认为10
     * @param {function} opts.onDataFormat 数据处理函数
     * @param {function} opts.onPageLoad 页面加载处理函数
     * @param {function} opts.onError 错误处理函数
     * @param {function} opts.onFinish 最后一页加载完成处理函数
     */
    constructor({
        api,
        data,
        page = 0,
        pageSize = 10,

        /**
         * 数据处理函数
         * @param {object} data 数据
         * @param {object} response raw数据
         * @return {object} 回应数据需要两个字段, length 数据数量, error 是否有错误(有错误会导致当前页加载失败, 触发onError)
         */
        onDataFormat,
        /**
         * 页面加载处理函数
         * @param {number} page 当前页
         */
        onPageLoad,
        /**
         * 错误处理函数
         * @param {string} error 错误
         * @param {number} page 当前页
         */
        onError,
        onFinish,
    }) {
        if (!api) {
            throw 'api不能为空';
        }
        if (!onDataFormat || typeof onDataFormat !== 'function') {
            throw '必须指定数据处理函数';
        }

        this._api = api;
        this._data = data || {};
        this._page = page;
        this._pageSize = pageSize;
        this._length = 0;
        this._onDataFormat = onDataFormat;
        this._onPageLoad = onPageLoad;
        this._onError = onError;
        this._onFinish = onFinish;

        this._wait = false;
        this._finish = false;
    }

    /**
     * 重置分页器
     */
    reset() {
        this._wait = false;
        this._finish = false;
        this._page = 0;
        this._length = 0;
    }

    /**
     * 下一页
     * @param {function} cb 回调
     */
    next(
        /**
         * 回调
         * @param {string} error 是否遇到错误
         * @param {number} page 当前页
         * @param {boolean} isFinish 是否最终页
         */
        cb
    ) {
        if (this._wait || this._finish) {
            this._wait && console.warn('分页器正在工作中, 请不要重复调用next函数');
            return false;
        }

        this._wait = true;
        this._page++;

        jskit.http.post(this._api, Object.assign(this._data, {
            'page': this._page,
            'page_size': this._pageSize,
        }), (err, data, res) => {
            if (err) {
                this.onNextCallback(err, false, cb);
                return this.onError(err);
            }

            let { length, error } = this._onDataFormat(data, res);

            if (error) {
                this.onNextCallback(error, false, cb);
                return this.onError(error);
            }
            if (typeof length !== 'number') {
                let msg = 'onDataFormat返回值应是对象, 其中length必须为number';
                this.onNextCallback(msg, false, cb);
                return this.onError(msg);
            }

            this._length += length;

            if (length < this._pageSize) {
                this.onNextCallback(null, true, cb);
                this.onPageLoad(data, res);
                return this.onFinish();
            }

            this.onNextCallback(null, false, cb);
            this.onPageLoad(data, res);
        });

        return true;
    }

    /**
     * 获取当前状态
     * @return {object} 当前状态
     */
    getStatus() {
        return {
            page: this._page,
            length: this._length,
            wait: this._wait,
            finish: this._finish,
        };
    }

    onNextCallback(err, isFinish, cb) {
        return cb && cb(err, this._page, isFinish);
    }
    onPageLoad(data, res) {
        this._wait = false;
        return this._onPageLoad && this._onPageLoad(this._page, data, res);
    }
    onError(err) {
        this._page--;
        this._wait = false;
        return this._onError && this._onError(err, this._page + 1);
    }
    onFinish() {
        this._wait = false;
        this._finish = true;
        return this._onFinish && this._onFinish(this._page);
    }
}

export default Paginate;