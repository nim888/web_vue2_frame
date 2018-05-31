# 框架描述
- 这一个基于webpack vue2 没有路由的多页面应用框架：框架支持H5版，微信公众号、及iOS and Android内嵌

- 开发完成后可执行npm run build 后会生成dist目录，dist发布到Test环境。测试通后可将dist目录发布到Produce CDN服务器。

# 安装
- cd ddwwj_code
- npm install
- npm start
- npm run build 

# 目录
- [目录](#%E7%9B%AE%E5%BD%95)
- [公共库](#%E5%85%AC%E5%85%B1%E5%BA%93)
    - [函数库](#%08%E5%87%BD%E6%95%B0%E5%BA%93)
        - [assets/paginate (分页器)](#assetspaginate-%E5%88%86%E9%A1%B5%E5%99%A8)
            - [初始化](#%E5%88%9D%E5%A7%8B%E5%8C%96)
            - [下一页 next](#%E4%B8%8B%E4%B8%80%E9%A1%B5-next)
            - [获取当前状态 getStatus](#%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E7%8A%B6%E6%80%81-getstatus)
            - [重置 reset](#%E9%87%8D%E7%BD%AE-reset)
        - [assets/jskit (常用函数库)](#assetsjskit-%E5%B8%B8%E7%94%A8%E5%87%BD%E6%95%B0%E5%BA%93)
            - [日期格式化](#%E6%97%A5%E6%9C%9F%E6%A0%BC%E5%BC%8F%E5%8C%96)
            - [日期文本兼容处理](#%E6%97%A5%E6%9C%9F%E6%96%87%E6%9C%AC%E5%85%BC%E5%AE%B9%E5%A4%84%E7%90%86)
            - [生成随机数](#%E7%94%9F%E6%88%90%E9%9A%8F%E6%9C%BA%E6%95%B0)
            - [函数同步执行, 最后一个函数结束后回调](#%E5%87%BD%E6%95%B0%E5%90%8C%E6%AD%A5%E6%89%A7%E8%A1%8C-%E6%9C%80%E5%90%8E%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E7%BB%93%E6%9D%9F%E5%90%8E%E5%9B%9E%E8%B0%83)
            - [函数防止重复执行 PreventRepetitiveExecution](#%E5%87%BD%E6%95%B0%E9%98%B2%E6%AD%A2%E9%87%8D%E5%A4%8D%E6%89%A7%E8%A1%8C-preventrepetitiveexecution)
            - [HTTP POST请求](#http-post%E8%AF%B7%E6%B1%82)
            - [页面绑定禁用TOUCH事件](#%E9%A1%B5%E9%9D%A2%E7%BB%91%E5%AE%9A%E7%A6%81%E7%94%A8touch%E4%BA%8B%E4%BB%B6)
           
    - [组件](#%E7%BB%84%E4%BB%B6)
        - [timer (定时器)](#timer-%E5%AE%9A%E6%97%B6%E5%99%A8)
        - [appframe](#appframe)
            - [appframe 模板](#appframe-%E6%A8%A1%E6%9D%BF)
            - [引入的基础库](#%E5%BC%95%E5%85%A5%E7%9A%84%E5%9F%BA%E7%A1%80%E5%BA%93)
            - [ref](#ref)
            - [函数](#%E5%87%BD%E6%95%B0)
                - [启用下拉刷新](#%E5%90%AF%E7%94%A8%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)
                - [禁用下拉刷新](#%E7%A6%81%E7%94%A8%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)
                - [手动激活下拉刷新](#%E6%89%8B%E5%8A%A8%E6%BF%80%E6%B4%BB%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)
                - [启用上滑加载](#%E5%90%AF%E7%94%A8%E4%B8%8A%E6%BB%91%E5%8A%A0%E8%BD%BD)
                - [禁用上滑加载](#%E7%A6%81%E7%94%A8%E4%B8%8A%E6%BB%91%E5%8A%A0%E8%BD%BD)
                - [重置上滑加载](#%E9%87%8D%E7%BD%AE%E4%B8%8A%E6%BB%91%E5%8A%A0%E8%BD%BD)
                - [隐藏没有更多提示](#%E9%9A%90%E8%97%8F%E6%B2%A1%E6%9C%89%E6%9B%B4%E5%A4%9A%E6%8F%90%E7%A4%BA)
                - [显示没有更多提示](#%E6%98%BE%E7%A4%BA%E6%B2%A1%E6%9C%89%E6%9B%B4%E5%A4%9A%E6%8F%90%E7%A4%BA)
                - [隐藏页面加载提示](#%E9%9A%90%E8%97%8F%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E6%8F%90%E7%A4%BA)
                - [显示页面加载提示](#%E6%98%BE%E7%A4%BA%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E6%8F%90%E7%A4%BA)
                - [初始化分页器](#%E5%88%9D%E5%A7%8B%E5%8C%96%E5%88%86%E9%A1%B5%E5%99%A8)
            - [事件](#%E4%BA%8B%E4%BB%B6)
                - [下拉刷新](#%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)
                - [上滑加载](#%E4%B8%8A%E6%BB%91%E5%8A%A0%E8%BD%BD)
    - [过滤器](#%E8%BF%87%E6%BB%A4%E5%99%A8)
        - [数字单位 num-unit](#%E6%95%B0%E5%AD%97%E5%8D%95%E4%BD%8D-num-unit)
        - [时间单位 time-unit](#%E6%97%B6%E9%97%B4%E5%8D%95%E4%BD%8D-time-unit)
        - [日期单位 date-unit](#%E6%97%A5%E6%9C%9F%E5%8D%95%E4%BD%8D-date-unit)
        - [日期格式化 date-format](#%E6%97%A5%E6%9C%9F%E6%A0%BC%E5%BC%8F%E5%8C%96-date-format)
    - [指令](#%E6%8C%87%E4%BB%A4)
       
- [第三方库](#%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93)
    - [Vue](#vue)
    - [loadmore](#loadmore)
    - [懒加载](#%E6%87%92%E5%8A%A0%E8%BD%BD)
    - [banner切换](#banner%E5%88%87%E6%8D%A2)

# 公共库
## 函数库
### assets/paginate (分页器)
> 分页器

#### 初始化
``` javascript
import Paginate from './paginate';

let paginate = new Paginate({
    api: '/api/test',
    data: {
        'user_id': 1,
    },
    // 当前页, 默认值0, 可不传
    page: 0,
    // 页面大小, 默认值10, 可不传
    pageSize: 10,
    // 数据格式化函数, 在api请求到数据且没有问题时调用. 必传
    onDataFormat: function (data, response) {
        // data 参考jskit.http.post
        // response 参考jskit.http.post

        // 需要返回一个对象, 包含length和error参数
        return {
            // length表示当前页数据大小, 如果小于pageSize则认为最后一页, 必须返回
            length: data.length,
            // 如果有错误请返回error, 将会终止当前页的后续操作
            error: '终止当前页查询, onPageLoad/onFinish不会被触发, 触发onError',
        }
    },
    // 页面加载完成, 非必传
    onPageLoad: function (page, data, response) {
        console.log(page, '加载完成');
    },
    // 错误处理, 非必传
    onError: function (err, page) {
        console.log(page, err);
    },
    // 最后一页加载完成, 非必传
    onFinish: function (page) {
        console.log('最后一页, 共', page, '页');
    },
});
```

#### 下一页 next
``` javascript
// 加载下一页
paginate.next();

// 可传入callback
paginate.next((error, page, isFinish) => {
    // 在页面加载完成后会早于onPageLoad调用该函数
    // error 错误
    // page 当前页
    // isFinish 是否最后一页
});
```


### assets/jskit (常用函数库)
#### 日期格式化
> 引入jskit自动注入到Date
``` javascript
new Date().format('yyyy-MM-dd hh:mm:ss');
```

#### 日期文本兼容处理
> 防止new Date();时因日期格式问题导致返回Invalid Date
``` javascript
jskit.utils.date('2017-07-07 00:00:00'); // Date 2017/07/07 00:00:00;
jskit.utils.date('2017/07/07 00:00:00'); // Date 2017/07/07 00:00:00;
```

#### 生成随机数
``` javascript
jskit.utils.random(min, max);
```

#### 函数同步执行, 最后一个函数结束后回调
``` javascript

let func1 = cb => setTimeout(_ => { console.log('func1'); cb(); }, 1000);
let func2 = cb => setTimeout(_ => { console.log('func2'); cb(); }, 500);
let func3 = cb => setTimeout(_ => { console.log('func3'); cb(); }, 2000);

jskit.utils.asyncFuncs([func1, func2, func3], _ => console.log('all done'));

// output:
//   func2
//   func1
//   func3
//   all done
```

#### 函数防止重复执行 PreventRepetitiveExecution
``` javascript
let func = cb => setTimeout(_ => { console.log('func'); cb && cb(); }, 1000);

func();
func();
func();

// output:
//   func
//   func
//   func

jskit.pre.exec(func, done => func(done));
jskit.pre.exec(func, done => func(done));
jskit.pre.exec(func, done => func(done));

// output:
//   func
```

#### HTTP POST请求
**任何时候发起请求都应该使用该方法**
``` javascript
jskit.http.post(url, data, (err, data, response) => {
    // err 是否有错误, 没有错误则为空
    // data 数据, 为response.data的数据
    // response 在data不满足的情况下使用
});
```

#### 页面绑定TOUCH事件操作
``` javascript
jskit.touchpage.addTouch();
jskit.touchpage.removeToutch();
```



## 组件
### timer (定时器)
``` html
<timer
    :time="new Date(2017-10-20 00:00:00)"
    <!-- 计时开始事件 -->
    @timer-start
    <!-- 计时结束事件 -->
    @timer-stop>
</timer>
```


### lazyImg (懒加载图片组件)
``` html
<Lazy-Img
    :src="item.icon"
    <!-- 类型["icon", "pic"] 默认"pic" -->
    type="icon">
</Lazy-Img>

```

### appframe
> appframe主要作用是引入公共的库, 公共的过滤器, 并在其中包装了一层, 具体函数看下面.  
> 每个**页面**组件尽量在外层包裹appframe.

#### appframe 模板
``` html
<appframe 
    ref="app"
    @refresh="onRefresh"
    @infinite="onInfinite">
    <!-- slot header APP头部插槽 -->
    <!-- slot outer-top scroller外部-头部插槽 -->
    <!-- 子组件写在这里 -->
    <!-- slot no-more 没有更多插槽 -->
    <!-- slot outer-bottom scroller外部-底部插槽 -->
</appframe>
```
---

#### 引入的基础库
* [jskit](#assetsjskit-%E5%B8%B8%E7%94%A8%E5%87%BD%E6%95%B0%E5%BA%93)
* [filters](#%E8%BF%87%E6%BB%A4%E5%99%A8)
* [directives](#%E6%8C%87%E4%BB%A4)

#### ref
> 获得appframe组件对象

#### 函数
##### 启用下拉刷新
``` javascript
this.$refs.app.enableRefresh();
```

##### 禁用下拉刷新
``` javascript
this.$refs.app.disableRefresh();
```

##### 手动激活下拉刷新
``` javascript
this.$refs.app.activeRefresh();
```

##### 启用上滑加载
``` javascript
this.$refs.app.enableInfinite();
```

##### 禁用上滑加载
``` javascript
this.$refs.app.disableInfinite();
```

##### 重置上滑加载
> 调用该函数会将全部加载完成状态重置, 并且启用上滑加载
``` javascript
this.$refs.app.resetInfinite();
```

##### 隐藏没有更多提示
``` javascript
this.$refs.app.hideNoMoreTips();
```

##### 显示没有更多提示
``` javascript
this.$refs.app.showNoMoreTips();

// 显示并设置为完全加载状态
this.$refs.app.showNoMoreTips(true);
```

##### 隐藏页面加载提示
``` javascript
this.$refs.app.hidePageLoading();
```

##### 显示页面加载提示
``` javascript
this.$refs.app.showPageLoading();
```

##### 初始化分页器
> 调用该函数会托管上滑加载, 默认的上滑加载事件将不会触发  
> 注意, 调用该函数后会自动启用并重置上滑加载, 同时加载第一页数据

> opts参考[分页器](#assetspaginate-%E5%88%86%E9%A1%B5%E5%99%A8)
``` javascript
this.$refs.app.initPaginate(opts);
```

---

#### 事件
##### 下拉刷新
``` javascript
function onRefresh(done) {
    // 如果有开启上滑加载, 记得重置上滑加载
    this.$refs.app.resetInfinite();
    
    done();
}
```

##### 上滑加载
``` javascript
function onInfinite(done) {
    // 如果是最后一页, 将显示没有更多插槽内容
    done(isLastPage);
}
```

---

## 过滤器
> 全局过滤器, 引入后自动注册到Vue

### 数字单位 num-unit
> 给数字增加单位, 防止数字太长溢出控件
``` javascript
// 请自行脑补模板:
{{ 0 | num-unit }}          // 0
{{ 100 | num-unit }}        // 100
{{ 100000 | num-unit }}     // 10.0w
{{ 1000000 | num-unit }}    // 1.0m
```

### 时间单位 time-unit
> 将数字(精确到秒)转换为如下格式: 3小时
``` javascript
// 请自行脑补模板:

// 59秒
{{ 59 | time-unit }}
// 2分钟
{{ 120 | time-unit }}
// 3小时
{{ 10800 | time-unit }}
```

### 日期单位 date-unit
> 将日期转换为如下格式: 2个月前
``` javascript
// 请自行脑补模板:

// 刚刚
{{ new Date() | date-unit }}
// 1个月前(和当前时间比对)
{{ new Date('2017-07-07 07:07:07') | date-unit }}
// 1秒前
{{ new Date('2017-07-07 07:07:07') | date-unit(new Date('2017-07-07 07:07:08')) }}
```

### 日期格式化 date-format
``` javascript
// 请自行脑补模板:
// 2017-09-01 19:04:04
{{ new Date() | date-unit }}
// 2017-07-07 07:07:07
{{ new Date('2017-07-07 07:07:07') | date-format }}
// 2017_07_07 07_07_07
{{ new Date('2017-07-07 07:07:07') | date-format('yyyy_MM_dd hh_mm_ss') }}
```
---

# 第三方库
## Vue
* [Vue](https://cn.vuejs.org/v2/guide/)

## loadmore
* [mint-ui loadmore(只用了这一个, 单独拿出来了, 见src/components/loadmore)](http://mint-ui.github.io/docs/#/zh-cn2/loadmore)

## 懒加载
* [vue-lazyload](https://www.npmjs.com/package/vue-lazyload)

## banner切换
* [vue-awesome-swiper](https://www.npmjs.com/package/vue-awesome-swiper)

## 视频流软解码
* [mpeg.js](https://www.npmjs.com/package/jsmpeg)
