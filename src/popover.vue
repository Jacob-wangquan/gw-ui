<template>
  <div class="popover" ref="popover" @click="onClick">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "GwPopover",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    positionContent() {
      document.body.appendChild(this.$refs.contentWrapper);
      // 获取triggerWrapper定位
      let {
        width,
        height,
        top,
        left
      } = this.$refs.triggerWrapper.getBoundingClientRect();
      this.$refs.contentWrapper.style.left = left + window.scrollX + "px";
      this.$refs.contentWrapper.style.top = top + window.scrollY + "px";
    },
    eventHandler(ev) {
        console.log(this.$refs.contentWrapper);
        console.log(ev.target);
        // if (this.$refs.popover && (this.$refs.popover === ev.target || this.$refs.popover.contains(ev.target))) {
        if (this.$refs.contentWrapper && this.$refs.contentWrapper.contains(ev.target)) {
          return ;
        } 
        this.close();
        
    },
    close() {
      this.visible = false;    
      document.removeEventListener("click", this.eventHandler);
    },
    show() {
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
          this.show();
        }
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  transform: translateY(-100%);
}
</style>