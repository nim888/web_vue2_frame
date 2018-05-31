<template>
    <div class="app-loading-wrap" :style="style">
        <div class="object-area" :style="[active ? {} : { animation: 'none' }]">
            <div class="object" :key="i" v-for="i in 4" :style="[{ backgroundColor: color }, active ? {} : { animation: 'none' }]" :id="`object${i}`"></div>
        </div>
    </div>
</template>
<script>
import './loading.scss';
import Vue from 'vue';

export default {
    props: {
        width: { type: Number, default: 60 },
        color: { type: String, default: '#FFDD02' },
        active: { type: Boolean, default: false },
    },
    data() {
        return {
            style: {
                width: `${this.width}px`,
                height: `${this.width}px`,
                marginTop: `-${this.width / 2}px`,
                marginLeft: `-${this.width / 2}px`,
            }
        };
    },
    mounted() {
    },
    methods: {
    },

    components: {
    },
};
</script>