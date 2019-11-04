<template>
  <div class="popover" ref="popover" >
    <div ref="contentWrapper" class="content-wrapper" v-if="visible" :class="{[`position-${position}`] : true}">
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper" style="display: inline-block">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "GwPopover",
  props: {
    popClassName: {
      type: String
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click', 'hover'].indexOf(value) >= 0
      }
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    openEvent() {
      if (this.trigger === 'click') {
        return 'click'
      } else {
        return 'mouseenter'
      }
    },
    closeEvent() {
      if (this.trigger === 'click') {
        return 'click'
      } else {
        return 'mouseleave'
      }
    }
  },
  mounted() {
    if (this.trigger === 'click') {
      this.$refs.popover.addEventListener('click', this.onClick)
    } else {
      this.$refs.popover.addEventListener(this.openEvent, () => {
        this.open()
      })
      this.$refs.popover.addEventListener(this.closeEvent, () => {
        this.close()
      })
    }
  },
  beforeDestroy() {
    const {contentWrapper, popover} = this.$refs;
    if (!contentWrapper) return;
    popover.appendChild(contentWrapper)

    if (this.trigger === 'click') {
      popover.removeEventListener('click', this.onClick)
    } else {
      popover.removeEventListener(this.openEvent, () => {
        this.open()
      })
      popover.removeEventListener(this.closeEvent, () => {
        this.close()
      })
    }
    
  },
  methods: {
    positionContent() {
      let {contentWrapper, triggerWrapper} = this.$refs;
      document.body.appendChild(contentWrapper);
      // 获取triggerWrapper定位
      let {
        width,
        height,
        top,
        left
      } = triggerWrapper.getBoundingClientRect();
      let {height: height2} = contentWrapper.getBoundingClientRect();
      let positions = {
        top: {
          top: top + window.scrollY,
          left: left + window.scrollX
        },
        bottom: {
          top: top + height  + window.scrollY,
          left: left + window.scrollX
        },
        left: {
          top: top - Math.abs(height - height2) / 2 + window.scrollY,
          left: left + window.scrollX
        },
        right: {
          top: top - Math.abs(height - height2) / 2 + window.scrollY,
          left: left + width + window.scrollX
        }
      };
      contentWrapper.style.left = positions[this.position].left + "px";
      contentWrapper.style.top = positions[this.position].top + "px";
      
    },
    eventHandler(ev) {
        if (this.$refs.popover && (this.$refs.popover === ev.target || this.$refs.popover.contains(ev.target))) {return}
        if (this.$refs.contentWrapper && this.$refs.contentWrapper.contains(ev.target)) {
          return ;
        } 
        this.close();
        
    },
    close() {
      this.visible = false;    
      document.removeEventListener("click", this.eventHandler);
    },
    open() {
      this.visible = true;
      // this.$nextTick(() => {
          setTimeout(() => {
            this.positionContent();
            document.addEventListener("click", this.eventHandler);
          }, 10);
          // });
    },
    onClick(e) {
      if (this.$refs.triggerWrapper.contains(e.target)) {
        if (this.visible === true) {
          this.close();
        } else {
          this.open();
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
$border-color: #333;
$border-radius: 4px;
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  position: absolute;
  background: #fff;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
  padding: .5em 1em;
  max-width: 20em;
  word-break: break-all;
  &::before, &::after {
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before, &::after {
      left: 10px;
      border-bottom: none;
    }
    &::before {
      border-top-color: black;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before, &::after {
      left: 10px;
      border-top: none;
    }
    &::before {
      border-bottom-color: black;
      bottom: 100%;
    }
    &::after {
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before, &::after {
      top: 50%;
      transform: translateY(-50%);
      border-right: none;
    }
    &::before {
      border-left-color: black;
      left: 100%;
    }
    &::after {
      border-left-color: white;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before, &::after {
      top: 50%;
      transform: translateY(-50%);
      border-left: none;
    }
    &::before {
      border-right-color: black;
      right: 100%;
    }
    &::after {
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }
}
</style>