import Swiper from 'swiper';

export default function(Vue) {
    Vue.directive('swiper', {
        isFn: true,
        deep: true,
        // bind (){
        //     console.log(this.$arg,'swiper')
        // },
        update(val) {
            if (!val) {
                return;
            }
            //console.log(this.arg,val,'swiper')
            let s = new Swiper(this.el, val);

            // fix rem width bug
            s.$.fn.outerWidth = function(includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this.width() + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this.width();
                } else return null;
            }
        }
    });
}