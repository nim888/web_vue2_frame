import Vue from 'vue';
//online
let USERHOST = '/';
USERHOST = location.protocol + '//api.aiwanba.com/api/';
let HOST = location.protocol + "//wwj-api.aiwanba.com/";
let USER_DEV = '';

//test dev
// USERHOST = location.protocol + '//api.aiwanba.com/api/';
// let HOST = location.protocol + '//wwj-api-dev.aiwanba.com/';
// let USER_DEV = '-test';

export default {
    //首页
    GET_HOME_INDEX: HOST + 'index/data', //首页
    GET_HOME_ROOM_LIST: HOST + 'room/list', //游戏房间
    GET_HOME_MY_GRESHCOIN: HOST + 'my/freshCoin', // 新人红包
    GET_HOME_TOY_LIST: HOST + 'toy/list', // 首页 娃娃分类
    //详情
    GET_ROOM_DETAIL: HOST + 'room/detail', //'房间详情'
    GET_ALBUM_DETAIL: HOST + 'album/detail', //'专辑详情'
    GET_GAME_START: HOST + 'game/start', //'房间详情开始游戏'
    GET_GAME_ROOM: HOST + 'room/status', //'房间详情开始游戏前状态'
    GET_GAME_TOY_ROOMS: HOST + 'toy/rooms', // 同一娃娃房间列表
    POST_FEEDBACK: HOST + '/my/feedback', // 用户申诉
    POST_GAME_CANCEL: HOST + '/game/cancel', // 不了
    POST_ROOM_SAY: HOST + '/room/say', // 发表言论
    POST_ROOM_LISTEN: HOST + '/room/listen', // 接收言论
    POST_NEWYEAR_ACTIVE: HOST + 'active/FirecrackersTip', // 鞭炮接口


    //用户中心
    GET_USER_INFO: HOST + 'my/index', //个人中心
    POST_PHONE_STATE: USERHOST + 'user' + USER_DEV + '/exists', //手机号验证
    POST_PHONE_VAL: USERHOST + 'user' + USER_DEV + '/val', //手机验证码 
    POST_USER_REG: USERHOST + 'user' + USER_DEV + '/reg', //用户注册
    POST_USER_FORGET: USERHOST + 'user' + USER_DEV + '/forget', //找回密码
    POST_USER_LOGIN: USERHOST + 'user' + USER_DEV + '/login', //用户
    POST_USER_NAME: HOST + 'my/nick', //修改用户名
    POST_USER_PASS: USERHOST + 'user' + USER_DEV + '/pass', //修改密码
    GET_MY_TOYS: HOST + 'my/toys', //我抓到的娃娃
    GET_USERSIGN: HOST + 'my/sign', //签到
    GET_MY_GAMES: HOST + 'my/games', //我的抓取记录
    POST_GAME_DETAIL: HOST + 'game/detail', // 娃娃的详情页
    GET_TASK_INDEX: HOST + 'task/index ', // 任务中心
    GET_TASK_INFO: HOST + 'todayTask/info', // 任务详情-列表
    GET_TASK_ACCEPT: HOST + 'todayTask/accept', // 任务领取
    GET_TASK_EXCHANGE: HOST + 'todayTask/exchange', // 任务积分领取奖励
    GET_INVITE_LIST: HOST + 'invite/list', // 邀请列表
    POST_SHIP_DETAIL: HOST + 'ship/detail', // 订单详情
    GET_SHIP_LIST: HOST + 'ship/list', // 发货列表
    GET_MY_MESSAGE: HOST + 'my/messages', // 消息列表
    GET_MY_CARDS: HOST + 'my/card', // 我的特权-卡
    GET_CARD_DISCARDCONT: HOST + 'card/discardCont', // 放弃连抓卡

    //统计
    GET_STAT: USERHOST + 'stat', //PV上报
    // 邀请相关
    GET_INVITE_INFO: HOST + 'invite/info', // 邀请码-获取
    POST_INVITE_BIND: HOST + 'invite/bind', // 提交邀请码

    // 发货相关
    GET_SHIP_APPLY: HOST + 'ship/apply', // 申请发货页
    POST_SHIP_SAVE: HOST + 'ship/save', // 提交申请发货
    POST_SHIP_ADDRESS: HOST + 'ship/addAddress', // 保存地址
    POST_GAME_EXCHANNGE: HOST + 'game/exchange', // 保存地址
    POST_ADDRESS_LIST: HOST + 'address/list', // 发货地址列表
    POST_ADDRESS_LIST: HOST + 'address/list', // 发货地址列表
    POST_ADDRESS_DELETE: HOST + 'address/delete', // 刪除发货地址
    POST_ADDRESS_ADD: HOST + 'address/add', // 增加发货地址
    POST_ADDRESS_UPDATE: HOST + 'address/update', // 增加发货地址
    POST_ADDRESS_DEFAULT: HOST + 'address/default', // 设置默认发货地址
    // 支付相关
    GET_PAY_LIST: HOST + 'pay/list', // 支付页面-列表、信息等
    POST_PAY_CREATE: HOST + 'pay/create', // 支付
    GET_MY_COINS: HOST + 'my/coins', // 交易明细
    GET_PAY_QUERY: HOST + 'pay/query', //订单状态
    GET_PAY_THREE: HOST + 'pay/three', //是否开启3元充值

    // 微信授权、头像等信息
    GET_WECHAT_GRANT: 'http://wechat.youxideng.cn/wechat/default/login', // 微信授权页
    GET_WECHAT_LOGIN: USERHOST + 'user' + USER_DEV + '/third-login', // 获取微信信息
    GET_BIND_PHONE: USERHOST + 'user' + USER_DEV + '/bind-phone', // 获取微信信息
    POST_SHARE_TODAYINFO: HOST + 'invite/todayInfo',
    POST_SHARE_AWARD: HOST + 'invite/acceptShareAward',

    //答题Answer
    GET_ANSWER_HOME: HOST + 'question/info', //答题首页
    GET_ANSWER_START: HOST + 'question/start', //开始答题
    POST_ANSWER: HOST + 'question/get', //答题详情
    POST_ANSWER_SUBMIT: HOST + 'question/post', //提交答题
    GET_ANSWER_RESULT: HOST + 'question/top', //答题排行
    GET_ANSWER_MY: HOST + 'question/my', //我的答题
    GET_WITHDRAW: HOST + 'withdraw/init', //提现状态
    POST_CASH: HOST + 'withdraw/cash', // 我要提现
    POST_CASH_CANCEL: HOST + '/withdraw/cancelCash', //取消提现



}