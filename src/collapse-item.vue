<template>
  <div class="collapse-item">
    <div class="title" @click="toggle">{{single}} - {{title}}</div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GwCollapseItem',
  props: {
    title: {
      type: String,
      required: true
    },
    name: ''
  },
  data() {
    return {
      open:false,
      single: false
    }
  },
  inject: ['eventBus'],
  mounted() {
    this.eventBus && this.eventBus.$on('update:selected', (names) => {
      console.log(names)
      if (names.indexOf(this.name) > -1) {
        this.open = true
      } else {
         this.open = false
      }
    })
  },
  methods: {
    toggle() {
      if (this.open) {
        this.eventBus && this.eventBus.$emit('update:removeSelected', this.name);
      } else {
        this.eventBus && this.eventBus.$emit('update:addSelected', this.name);
      }
    }
  }
}
</script>

<style lang="scss">
  $gray: #ddd;
  $border-radius: 4px;
  .collapse-item {
    
    .title {
      margin-top: -1px;
      margin-left: -1px;
      margin-right: -1px;
      border: 1px solid $gray;
      min-height: 32px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      cursor: pointer;
    }
    &:first-child {
      .title {
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
    }
    &:last-child {
      .title:last-child {
        border-bottom-left-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
    }
    .content {
      padding: 8px;
    }
  }
</style>