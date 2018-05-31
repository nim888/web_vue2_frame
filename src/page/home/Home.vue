<template>
    <section class="wrap" id="app">
        <appframe ref="app" @refresh="onRefresh" @infinite="onInfinite">
           111
        </appframe>
  </section>
</template>

<script>
import "./home.scss";
import api from "../../api";
import jskit from "../../assets/jskit";
import paginate from "../../assets/paginate";
import appframe from "../../components/appframe/appframe.vue";

export default {
  data() {
    return {
      

      
    };
  },
  computed: {
   
  },
  methods: {
    // 下拉刷新
    onRefresh: function(done) {
     
    },
    // 上滑加载
    onInfinite: function(done) {},
    // 回退页面
    onBackPage: function() {
    
    },
    
    // 打开页面
    onToPage: function(url) {
      
      jskit.openPage(url);
    },
    // 初始化
    onInit: function(cb) {
      this.$refs.app.hidePageLoading();
    },
    // 判断是否登录
    isLogin: function(cb) {
     
    },
  
    loadData: function(cb) {
      jskit.http.post(api.GET_HOME_INDEX, {}, (err, data, res) => {
        if (err || !data) {
          this.err = err || "网络开小差啦～";
          this.$toast.show(this.err);
        }

        if(res.code == 0){
          this.data = data
        }
       

        cb && cb();
      });
    },
    loadRoomList: function(cb) {
      jskit.http.post(api.GET_HOME_TOY_LIST, {}, (err, data, res) => {
        // if (err || !data) {
        //   this.err = err || "网络开小差了哦～";
        //   this.$toast.show(this.err);
        // }
        this.roomList = data.list;
        cb && cb();
      });
    },
    onOpenNewPage: function(url){
      jskit.isLogin(true ,(token)=>{
          //start
          jskit.localStorage.getItem(jskit.LOCALSTORAGEKEY.AUTH,(userInfo)=>{
            jskit.localStorage.getItem(location.protocol + jskit.LOCALSTORAGEKEY.UDID_KEY,udid=>{
              let type;
              if(this.isWechat){
                type ='';
              }else{
                type ='app';
              }
              let adurl = url+'&type=appweb&auth='+userInfo.auth+'&token='+userInfo.token+'&userid='+userInfo.userId+'&pic='+this.data.userInfo.avatar+'&name='+this.data.userInfo.nick+'&udid='+udid+'&hostname='+location.hostname;
              //console.log(adurl);
              window.location.href = adurl;
            });
          });
          //end
      });
    },
    // 微信授权-获取信息
    weChatInfo: function(cb){
     
        
    },
    onCopy:function(){
        
        
    }
   
  },
  events: {},
  mounted() {
    // 启用下拉刷新
    this.$refs.app.disableRefresh();
    this.onInit();
    
  },
  components: {
    appframe,
   
  }
};
</script>