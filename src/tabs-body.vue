<template>
  <div class="tabs-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GwTabsBody',
  inject: ['eventBus'],
  created() {
    
  }
}
</script>

<style lang="scss">

</style>