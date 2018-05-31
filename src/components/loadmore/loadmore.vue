<template>
    <div class="mint-loadmore" :class="{ 'drop-overflow': direction === 'down' || topDropped }">
        <div class="mint-loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}" :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
            <slot name="top">
                <!-- <div class="mint-loadmore-top" v-if="topEnabled"> -->
                <!-- <spinner v-show="topStatus === 'loading'" class="mint-loadmore-spinner" :size="20" type="fading-circle"></spinner> -->
                <!-- <span class="mint-loadmore-text">{{ topText }}</span> -->
                <!-- </div>  -->
                <div class="mint-loadmore-top" v-if="topEnabled">
                    <loading :width="25" color="#FFDD02" :active="topStatus === 'loading'"></loading>
                </div>
            </slot>
            <slot></slot>
            <slot name="bottom">
                <!-- <div class="mint-loadmore-bottom" v-if="bottomMethod && direction !== 'down' && !topDropped"> -->
                <!-- <spinner v-if="bottomStatus === 'loading'" class="mint-loadmore-spinner" :size="20" type="fading-circle"></spinner> -->
                <!-- <span class="mint-loadmore-text">{{ bottomText }}</span> -->
                <!-- </div>  -->
                
                <!-- <div class="mint-loadmore-bottom" v-if="bottomMethod && direction !== 'down' && !topDropped">
                    <img v-if="bottomStatus !== 'loading'" :class="{'mint-loadmore-bottom-arrow': true, 'drop': bottomStatus === 'drop'}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAMAAABRPb9kAAAAM1BMVEUAAACXl5eampqampqXl5eYmJiYmJiYmJibm5uYmJiXl5eXl5eXl5eXl5eYmJiqqqqXl5cuX3dsAAAAEHRSTlMAgElc+JB5yULy5eK8dlIGQy20aQAAAFlJREFUKM/tyUsOgCAQBNEGRfDf9z+tMtE0ybBybS3rQZWloFtg+OEbxKMDewJWTg4S5xMDHxEkjhGQVNCXGOhLDPQlBvqSCvqt3KDfysZs3wvte3m/l9z+C6SMBM37JNckAAAAAElFTkSuQmCC" />
                    <span class="mint-loadmore-text">{{ bottomText }}</span>
                </div> -->
            </slot>
        </div>
    </div>
</template>

<style>
.mint-loadmore {
  overflow: hidden;
}

.mint-loadmore.drop-overflow {
  overflow: unset;
}

.mint-loadmore-content {
}

.mint-loadmore-content.is-dropped {
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.mint-loadmore-top,
.mint-loadmore-bottom {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.mint-loadmore-top {
  top: -50px;
}

.mint-loadmore-bottom {
  bottom: -55px;
}

.mint-loadmore-spinner {
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
}

.mint-loadmore-text {
  height: 50px;
  line-height: 50px;
  font-size: 0.7rem;
  vertical-align: middle;
  color: #909090;
}

.mint-loadmore-bottom-arrow {
  width: 0.6rem;
  height: 0.675rem;
  margin-top: -0.2rem;
  margin-right: 0.3rem;
  vertical-align: middle;
  transition: 0.3s;
}

.mint-loadmore-bottom-arrow.drop {
  transform: rotateZ(180deg);
}
</style>

<script type="text/babel">
// import spinner from './spinner/fading-circle.vue';
import loading from '../loading/Loading';
export default {
    name: 'mt-loadmore',
    components: {
        // 'spinner': spinner,
        loading,
    },

    props: {
        // 是否单例
        isSingleton: {
            type: Boolean,
            default: false
        },
        maxDistance: {
            type: Number,
            default: 0
        },
        autoFill: {
            type: Boolean,
            default: true
        },
        distanceIndex: {
            type: Number,
            default: 2
        },
        topPullText: {
            type: String,
            default: '下拉刷新'
        },
        topDropText: {
            type: String,
            default: '释放更新'
        },
        topLoadingText: {
            type: String,
            default: '加载中...'
        },
        topDistance: {
            type: Number,
            default: 70
        },
        topMethod: {
            type: Function
        },
        topEnabled: {
            type: Boolean,
            default: true
        },
        bottomPullText: {
            type: String,
            default: '上拉刷新'
        },
        bottomDropText: {
            type: String,
            default: '释放更新'
        },
        bottomLoadingText: {
            type: String,
            default: '加载中...'
        },
        bottomDistance: {
            type: Number,
            default: 70
        },
        bottomMethod: {
            type: Function
        },
        bottomAllLoaded: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            translate: 0,
            scrollEventTarget: null,
            containerFilled: false,
            topText: '',
            topDropped: false,
            bottomText: '',
            bottomDropped: false,
            bottomReached: false,
            direction: '',
            startY: 0,
            startScrollTop: 0,
            currentY: 0,
            topStatus: '',
            bottomStatus: ''
        };
    },

    watch: {
        topStatus(val) {
            this.$emit('top-status-change', val);
            switch (val) {
                case 'pull':
                    this.topText = this.topPullText;
                    break;
                case 'drop':
                    this.topText = this.topDropText;
                    break;
                case 'loading':
                    this.topText = this.topLoadingText;
                    break;
            }
        },

        bottomStatus(val) {
            this.$emit('bottom-status-change', val);
            switch (val) {
                case 'pull':
                    this.bottomText = this.bottomPullText;
                    break;
                case 'drop':
                    this.bottomText = this.bottomDropText;
                    break;
                case 'loading':
                    this.bottomText = this.bottomLoadingText;
                    break;
            }
        }
    },

    methods: {
        onTopLoaded() {
            this.translate = 0;
            setTimeout(() => {
                this.topStatus = 'pull';
                this.topDropped = false;
            }, 300);
        },

        onBottomLoaded() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.bottomStatus = 'pull';
                    this.bottomDropped = false;
                }, 300);

                if (this.scrollEventTarget === window) {
                    document.body.scrollTop += 50;
                } else {
                    this.scrollEventTarget.scrollTop += 50;
                }
                this.translate = 0;
            });
            if (!this.bottomAllLoaded && !this.containerFilled) {
                this.fillContainer();
            }
        },

        getScrollEventTarget(element) {
            let currentNode = element;
            while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                if (overflowY === 'scroll' || overflowY === 'auto') {
                    return currentNode;
                }
                currentNode = currentNode.parentNode;
            }
            return window;
        },

        getScrollTop(element) {
            if (element === window) {
                return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
            } else {
                return element.scrollTop;
            }
        },

        setScrollTop(element) {
            if (element === window) {
                // document.documentElement.scrollTop = 0;
                window.document.body.scrollTop = 0;
            } else {
                element.scrollTop = 0;
            }
        },

        bindTouchEvents() {
            if (this.isSingleton) {
                window.addEventListener('touchstart', this.handleTouchStart);
                window.addEventListener('touchmove', this.handleTouchMove);
                window.addEventListener('touchend', this.handleTouchEnd);
                return;
            }

            this.$el.addEventListener('touchstart', this.handleTouchStart);
            this.$el.addEventListener('touchmove', this.handleTouchMove);
            this.$el.addEventListener('touchend', this.handleTouchEnd);
        },

        init() {
            this.topStatus = 'pull';
            this.bottomStatus = 'pull';
            this.topText = this.topPullText;
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);
            if (typeof this.bottomMethod === 'function') {
                this.fillContainer();
                this.bindTouchEvents();
            }
            if (typeof this.topMethod === 'function') {
                this.bindTouchEvents();
            }
        },

        fillContainer() {
            if (this.autoFill) {
                this.$nextTick(() => {
                    if (this.scrollEventTarget === window) {
                        this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                            document.documentElement.getBoundingClientRect().bottom;
                    } else {
                        this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                            this.scrollEventTarget.getBoundingClientRect().bottom;
                    }
                    if (!this.containerFilled) {
                        this.bottomStatus = 'loading';
                        this.bottomMethod();
                    }
                });
            }
        },

        checkBottomReached() {
            if (this.scrollEventTarget === window) {
                return Math.ceil(document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight >= document.body.scrollHeight;
            } else {
                return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
            }
        },

        handleTouchStart(event) {
            if (this.topDropped || this.bottomDropped) {
                return;
            }

            this.startY = event.touches[0].clientY;
            this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
            this.bottomReached = false;
            if (this.topStatus !== 'loading') {
                this.topStatus = 'pull';
                this.topDropped = false;
            }
            if (this.bottomStatus !== 'loading') {
                this.bottomStatus = 'pull';
                this.bottomDropped = false;
            }
        },

        handleTouchMove(event) {
            if (this.topDropped || this.bottomDropped) {
                return;
            }
            if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                return;
            }
            this.currentY = event.touches[0].clientY;
            let distance = (this.currentY - this.startY) / this.distanceIndex;
            this.direction = distance > 0 ? 'down' : 'up';
            if (typeof this.topMethod === 'function' && this.direction === 'down' &&
                this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading' && this.topEnabled) {
                event.preventDefault();
                event.stopPropagation();
                if (this.maxDistance > 0) {
                    this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
                } else {
                    this.translate = distance - this.startScrollTop;
                }
                if (this.translate < 0) {
                    this.translate = 0;
                }
                this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
            }

            if (this.direction === 'up') {
                this.bottomReached = this.bottomReached || this.checkBottomReached();
            }
            if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&
                this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
                event.preventDefault();
                event.stopPropagation();
                if (this.maxDistance > 0) {
                    this.translate = Math.abs(distance) <= this.maxDistance
                        ? this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
                } else {
                    this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
                }
                if (this.translate > 0) {
                    this.translate = 0;
                }
                this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
            }
            this.$emit('translate-change', this.translate);
        },

        handleTouchEnd() {
            if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
                this.topDropped = true;
                if (this.topStatus === 'drop') {
                    this.translate = '50';
                    this.topStatus = 'loading';
                    this.topMethod();
                } else {
                    this.translate = '0';
                    this.topStatus = 'pull';
                    setTimeout(_ => this.topDropped = false, 300);
                }
            }
            if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
                this.bottomDropped = true;
                this.bottomReached = false;
                if (this.bottomStatus === 'drop') {
                    this.translate = '-50';
                    this.bottomStatus = 'loading';
                    this.bottomMethod();
                } else {
                    this.translate = '0';
                    this.bottomStatus = 'pull';
                    setTimeout(_ => this.bottomDropped = false, 300);
                }
            }
            this.$emit('translate-change', this.translate);
            this.direction = '';
        },

        activeTopLoad() {
            this.setScrollTop(this.scrollEventTarget);
            this.direction = 'down';
            this.topStatus = 'drop';
            this.topDropped = true;
            this.translate = 50;
            this.$nextTick(_ => this.handleTouchEnd());
        },
    },

    mounted() {
        this.init();
    }
};
</script>
