1、网络优化，
2、抓完后刷新
3、微信充值按钮防点击处理
4、H5 https = > http (已处理)
5、图片换CDN_URL(已处理)
6、统计代码 (已处理)
7、离线缓存 MP3 (已处理)
8、其它BUG
9､弹屏微信充值按钮防点击处理


1、支付平台内部错误(已处理)；
2、首页认证失败(已处理)；
3、任务(已处理)； 
4、微信充值按钮防点击处理(已处理)；
5、抓完后刷新优化、
6、详情加弹幕(已处理)； 
7、android sigi(已处理),
8、邀请(已处理);
9、没有认证的个人中心(已处理)

//未处理
10、网络问题优化（缓存，自动刷新）
11、背景音乐在微信


{
11、支付页面    
12、android浏览器兼容问题（Object.assign） (已处理)
13、图片流优化(已处理);
14、抓完后刷新优化(已处理)

13、QQ浏览器打不开
    http://www.fackyou.org/archives/nodejs/2017050424.html
    http://ruanyf.github.io/es-checker/index.cn.html
14、小程序不能开多个WebSocket,其它长链接方式()    
}

v1.1
1、android手机低版浏览器兼容问题（Object.assign) (已处理)
2、QQ浏览器打不开 (已处理)
3、抓完后刷新优化 (已处理90%)
4、jsmpeg 
5、APP内支付页面改为H5  (已处理)
6、弹幕 
7、增加订单详情页（发货多个合并）  (已处理)
8、个人中心增加邀请列表  (已处理)
9、个人中心增加消息  (已处理)
10、个人中心增加我的订单  (已处理)
11、首页样式优化  (已处理)
12、翻页功能  (已处理)
13、首页房间列表(已处理)
13、自动重连
14、发货缺货提示
15、兼容新（视频流）老版本（图片流）
16、热抓中（该分类所有娃娃机都占用中）、有空闲（该娃娃分类中有娃娃机空闲）(已处理)
17、充值页面首充功能(已处理)
18、活动页面改修改(已处理)
19、小程序抓娃娃嵌套web页面
20、动态获取微信公众号二维码
21、有渠道ID隐藏底部下载
22、广告位支持动态传递参数
23、将图片流更换成视频流
24、平台内部错误 异常处理
25、浏览器长按保存图片／自动复制链接，发朋友赚豌豆
26、优化渠道ID标识
27、新增渠道赚福利功能



2017-12-18~22
#微信H5版支付、分享带渠道#

1、样式兼容APP内嵌；
2、任务邀请／APP下载兼容APP处理；
3、修改渠道赚钱分离页面；
4、去除首充翻倍活动
5、微信H5版支付
6、梳理H5版本内嵌在原生APP
7、fingerprint.js ，
8、sign,
9、click and tucth,
10、headlass
11、网页可视

/2017-12-25/
1.修改V1.2BUG
2.公众号吸粉调整
3.分享按钮上报
4.充值页面加高额充值活动
5.充值成功提示页面跳转
6.UDID生成优化

400个微信号 每个用户可以加500好友； 
1、豌豆码
2、注册400个个人微信号
3、小程序：上新，改版，发货，邀请友奖励，活动。
4、公众号运营信息推进
5、小程序和公众号互通
6、客服系统{渠道，用户，充值，常见问题，夜间生成工单}
7、视频测试工具
8、所有房间视频流展示列表

「android浏览器兼容问题（Object.assign 已处理)，支付页面，弹幕，jsmpeg，QQ浏览器打不开（已处理），抓完后刷新优化（已处理）」

小程序问题说明
目前小程序只支持一个WebSocket(https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-socket.html)

解决方案：
1、减少至一个WebSocket 控制流合到李嵩服务端；
2、在小程序内嵌H5页面，小程序只支持内嵌HTTPS的页面；
3、SSE  Server-Sent Events

#1.http被劫持
#2.视频流调度工具
#3.视频流列表

【点点娃娃机】火爆全网的手机在线抓娃娃，远程实时操控、零卡顿，打造完美临场感！

1.详情页面（美化UI(ok)，加音效(ok)，倒计时(ok),多少在玩(ok),背景图优化(ok)，豌豆少要跳充值(ok)，抽中娃娃弹框内的娃娃图片来源,成功后去我的娃娃列表页面(ok),wwj:onclose，客端配置梳理（ok））

首页：http://www.youxideng.cn/ddwwj/?userid={userid}
娃娃机详情页：http://www.youxideng.cn/ddwwj/gamedetail.html?room=1&pid={lalun}&userid={userid}
用户签到：http://www.youxideng.cn/ddwwj/usersign.html?token={token}&auth={auth}&tag=app&userid={userid}
http://ddwwj.youxideng.cn/h5dev/buy.html?app=ios&udid=9e21408b251fd15a6862605e631db16e6c789015&token=a258ceffb93f203bd8b6dd68419e2b01&auth=194:1512798432:$2y$10$SlDNavhR..oM3Vd697CUyu8.j6XSZtP7hFP5cMchJ1jXPoQj0OQgK&userid=194

## v1.2 工作
### 上线前准备工作[gamedetail页面，微信地址];

小程序
Wechat Mini Program

点点娃娃机产品研发所设计技术：
1）服务端：Linux、MySQL、PHP、Nginx、Redis、NodeJS；
2）前端：NodeJS、VUE、ES6、Gulp、Webpack、CSS、HTML、JavaScript、JQuery、Bootstrap、Axios；
3）客户端(iOS/Android):Mac OS、Xcode、ObjectiveC、AFNetworking；
4）产品测试：jmeter接口、安卓APP压力测试monkey、selenium、appium；


//mp3
1.背景:https://asset-cdn.aldsd.net/page/static/ddwwj/mp3/wwj-bg1.mp3?v=1.2 
2.成功:https://asset-cdn.aldsd.net/page/static/ddwwj/mp3/wwj_success.mp3?v=1.2 
3.失败:https://asset-cdn.aldsd.net/page/static/ddwwj/mp3/wwj_fail.mp3?v1.2
4.下抓:https://asset-cdn.aldsd.net/page/static/ddwwj/mp3/wwj-go.mp3

娃娃机APP内嵌域名：https://ddwwj.youxideng.cn/
外部APP内嵌域名：https://ddwwj.fubaihao.cn/
