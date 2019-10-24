<template>
  <div class="wrapper" :class="toastClasses">
    <div class="toast" ref="wrapper" >
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="$slots.default[0]"></div>
      <div class="line" ref="line"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">{{closeButton.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GwToast',
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    autoCloseDelay: {
      type: Number,
      default: 5
    },
    closeButton: {
      type: Object,
      default: () => {
        return {
          text: '关闭',
          callback: undefined
        }
      }
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'middle'].indexOf(value) > -1
      }
    }
  },
  computed: {
    toastClasses() {
      return {
        [`position-${this.position}`] : true
      }
    }
  },
  data () {
    return {

    }
  },
  mounted() {
    this.execAutoClose();
    this.updateStyle();
  },
  methods: {
    execAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoCloseDelay * 1000);
      }
    },
    updateStyle() {
      this.$nextTick(() => {
        this.$refs.line.style.height = this.$refs.wrapper.getBoundingClientRect().height + 'px';
      });
    },
    close() {
      this.$el.remove();
      this.$emit('close');
      this.$destroy();
    },
    onClickClose() {
      this.close();
      if (this.closeButton && typeof this.closeButton.callback === 'function') {
        this.closeButton.callback(this);
      }
    }
  }
}
</script>

<style lang="scss">
  $font-size: 14px;
  $toast-min-height: 40px;
  $toast-bg: rgba(0,0,0,0.75);
  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .wrapper {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    $animation-duration: 300ms;
    &.position-top {
      top: 0;
      .toast {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        animation: slide-down $animation-duration;
      }
    }
    &.position-bottom {
      bottom: 0;
      .toast {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        animation: slide-up $animation-duration;
      }
    }
    &.position-middle {
      top: 50%;
      transform: translate(-50%, -50%);
      .toast {
        animation: slide-in $animation-duration;
      }
    }
  }
  .toast {
    border: 1px solid #666;
    font-size: $font-size;
    line-height: 1.5;
    min-height: $toast-min-height;
    display: flex;
    align-items: center;
    background: $toast-bg;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0,0,0,0.5);
    padding: 8px 16px;
    color: #fff;
    .line {
      height: 100%;
      border-left: 1px solid #666;
      margin-left: 10px;
    }
    .close {
      padding-left: 10px;
      flex-shrink: 0;
      cursor: pointer;
    }
    
  }
  
</style>