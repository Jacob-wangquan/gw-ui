<template>
  <div class="layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GwLayout',
  data() {
    return {
      layoutClass: {
        hasSider: false
      }
    }
  },
  mounted() {
    this.$children.forEach((vm) => {
      if(vm.$options.name === 'GwSider') {
        this.layoutClass.hasSider = true;
      }
    });
  }
}
</script>

<style lang="scss">
  .layout {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid #333;
    &.hasSider {
      flex-direction: row;
    }
  }
</style>