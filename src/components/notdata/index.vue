<template>
   <div class="notdate">
        <i></i>
        <slot name="text"></slot>
        <button v-if="isBtn" @click="onExperience">{{buttonText}}</button>
    </div>
</template>
<script>
    import "./index.scss";
    export default {
        props:{
            buttonText: {type: String, default: '立即体验'},
            // 是否显示按钮
            isBtn: { type: Boolean, default: false },
        },
        data() {
            return {

            }
        },
        methods: {
            onExperience: function(){
                this.$emit('experience-btn');
            }
        }
    }
</script>