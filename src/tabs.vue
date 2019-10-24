<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'GwTabs',
  props: {
    selected: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(data) {
        return ['horizontal', 'vertical'].indexOf(data) > -1
      }
    }
  },
  data() {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  created() {
    
  },
  mounted() {
    this.checkChildren();
    this.selectTab();
  },
  methods: {
    checkChildren() {
      if (this.$children.length === 0) {
        console && console.warn && console.warn('tabs的子组件应该是tabs-head和tabs-body');
      }
    },
    selectTab() {
      this.$children.forEach((vm) => {
        if (vm.$options.name === 'GwTabsHead') {
          vm.$children.forEach((childVm) => {
            if (childVm.$options.name === 'GwTabsItem' && childVm.name === this.selected) {
              this.eventBus.$emit('update:selected', this.selected, childVm);
            }
          });
        }
      });
    }
  }
}
</script>

<style lang="scss">

</style>