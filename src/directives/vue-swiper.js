import Swiper from 'swiper';

export default function(Vue){
    Vue.directive('swiper',{
        isFn : true,
        deep:true,
        // bind (){
        //     console.log(this.$arg,'swiper')
        // },
        update (val){
            if(!val){
                return;
            }
            //console.log(this.arg,val,'swiper')
            new Swiper(this.el,val);
        }
    });
}
