<template>
    <div class="ui-alert" :class="{show:show}">
        <div class="ui-alert-box" v-if="type==2"  style="padding:0;background:none">
            <slot name="body"></slot>
        </div>

        <div v-else class="ui-alert-box">
            <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
        </div>

    </div>
</template>
<script>
    import "./alert.scss";
    import jskit from '../../assets/jskit';
    import api from '../../api';
    export default {
        props:[
            'show',
            'transitionName',
            'type'
        ]
    }
</script>
