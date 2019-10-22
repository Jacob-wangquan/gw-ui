<template>
  <div class="toast">
    <slot></slot>
    <span class="line"></span>
    <span class="close" v-if="closeButton" @click="onClickClose">{{closeButton.text}}</span>
  </div>
</template>

<script>
export default {
  name: 'GwToast',
  props: {
    autoClose: {
      type: Boolean,
      default: false
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
    }
  },
  data () {
    return {

    }
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.close();
      }, this.autoCloseDelay * 1000);
    }
  },
  methods: {
    close() {
      this.$el.remove();
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
  $toast-height: 40px;
  $toast-bg: rgba(0,0,0,0.75);
  .toast {
    border: 1px solid #666;
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    font-size: $font-size;
    line-height: 1.5;
    height: $toast-height;
    display: flex;
    align-items: center;
    background: $toast-bg;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0,0,0,0.5);
    padding: 0 16px;
    color: #fff;
  }
  .line {
    height: 100%;
    border-left: 1px solid #666;
    margin-left: 10px;
  }
  .close {
    padding-left: 10px;
  }
</style>