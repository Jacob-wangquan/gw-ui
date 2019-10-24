<template>
  <div class="tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GwTabsPane',
  inject: ['eventBus'],
  data() {
    return {
      active: false
    }
  },
  props: {
    name: {
      type: String | Number,
      require: true
    }
  },
  computed: {
    classes() {
      acitve: this.active
    }
  },
  created() {
    this.eventBus.$on('update:selected', (name) => {
      this.active = name === this.name;
    });
  }
}
</script>

<style lang="scss">

</style>