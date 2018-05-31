import lazyload from '../assets/lazyload';

export default function(Vue){
    Vue.directive('lazyload',{
        isFn : true,
        deep:true,
        bind (){
            lazyload.init({
                offset: window.innerHeight*2 || 500
            });
        },
        // unbind (){

        // },
        // listen (){
        //     console.log('listen')
        // },
        update (){
            Vue.nextTick(lazyload.check)
        }
    });
}
