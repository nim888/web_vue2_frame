<template>
     <div class="popinvites">
            <div class="bg"></div>
            <div class="info">
                <span class="closebtn" @click="onClose()"></span>
                <div class="heads">
                    <p class="tl">关注公众号领取豌豆奖励</p>
                    <div class="decs" v-if="codeStatus">
                        <h2>您的豌豆码</h2>
                        <p>{{wandoucode}}</p>
                        <input id="foos" type="text" v-model="copystr"  readonly  data-field="date"/>
                        <button class="btncopy" @click="onCopy()"  readonly  data-field="date"data-clipboard-action="copy" data-clipboard-target="#foos">点击复制豌豆码</button>

                    </div>
                </div>
                <div class="bodys">
                    <p v-text="codetext"></p>
                    <p class="pic"><img :src="wechatpic" /></p>
                  
                </div>
            </div>
        </div>
</template>

<script>
    import "./index.scss";
    import jskit from '../../assets/jskit';
    import api from '../../api';
    import Clipboards from "clipboard";

    export default {
        props:[
            'onInviteClose',
        ],
        data() {
            return {
                wechatpic:'',
                userid:'',
                copystr:'',
                codeStatus:false,
                codetext:'长按图片识别二维码，成功关注公众号并回复豌豆码可获得20豌豆奖励(奖励将在1小时内发放)'
            };
        },
        methods: {
            onClose:function(){ 
                this.onInviteClose();
            },
            onCopy:function(){
                this.copystr= this.copystr;
                var clipboard = new Clipboards('.btncopy');
                clipboard.on('success', (e)=> {
                    setTimeout(()=>{
                        this.$toast.show('豌豆码已复制成功！');
                    },1500);
                });
               
            }
        },
        mounted() {
            jskit.localStorage.getItem(jskit.LOCALSTORAGEKEY.AUTH,info=>{
                this.userid = info.userId;
                jskit.localStorage.getItem(jskit.LOCALSTORAGEKEY.CHANNEL_ID,v=>{  
                    this.channelid= v;
                    if(this.channelid==null||this.channelid==undefined){
                        //this.wechatpic='https://wwj-open.aiwanba.com/wechat/promote/qr?uid=' + info.userId+'t='+jskit.utils.getNonce(10);
                        jskit.http.post('https://wwj-open.aiwanba.com/wechat/promote/qr/find?uid='+info.userId,{}, (err,data,res)=>{                   
                           //alert(JSON.stringify(data));
                           this.copystr = data.data.code;
                           let resdata = data.data;

                           //resdata.type =1;
                            if(data.code==0){
                                //alert(JSON.stringify(data));
                                if(resdata.type==0){
                                    //没有奖励 hide code
                                    //this.codeStatus = false;
                                    this.codetext = '关注点点娃娃机公众号，赚取更多豌豆奖励！';
                                }else if(resdata.type & 3 ||resdata.code==''){
                                    //服务号 hide code
                                    //this.codeStatus = false;
                                    this.codetext = '长按图片识别二维码，成功关注公众号即可领取20豌豆奖励';
                                }else{
                                    //show code 订阅号
                                    this.codeStatus = true;
                                    this.wandoucode = resdata.code;
                                }
                                this.wechatpic=resdata.url+'?t='+jskit.utils.getNonce(10);
                                //alert(this.wechatpic);
                            }
                            
                       });
                       return;
                   }else{
                    this.wechatpic='https://cps.aiwanba.com/api/open/wechat/qr/'+info.userId+'?ch='+v+'t='+jskit.utils.getNonce(10); 
                   }
                  // alert(this.wechatpic);
                  // this.wechatpic='https://cps.aiwanba.com/api/open/wechat/qr/'+info.userId+'?ch='+v+'t='+jskit.utils.getNonce(10); 
                });     
            });
        }
    }
</script>
