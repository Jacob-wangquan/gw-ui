<template>
  <button class="g-button" :class='iconPosition === "right" ? "reverse" : ""' @click="$emit('click')">
    <g-icon v-if="icon && !loading" :name="icon"></g-icon>
    <g-icon v-if="loading" class="loading" name="loading"></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template> 

<script>
export default {
  props: {
    icon: {}, 
    loading: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator(value) {
        return value === 'left' || value === 'right';
      }
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
@keyframes spin{
  0% {transform: rotate(0deg)}
  100% { transform: rotate(360deg) }
}
.g-button {
  font-size: var(--font-size);
  height: var(--button-height);
  padding: 0 1em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background: var(--button-bg);
  display: inline-flex;
  justify-content: center;
  align-items: center; /* align-items */
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    border-color: var(--border-color-hover);
  }
  &:active {
    background-color: var(--button-active-bg);
  }
  &:focus {
    outline: none;
  }
  &.reverse {
    direction: rtl;
  }
  .content {
    margin: 0 0.1em;
  }
  .loading {
    animation: spin 1.5s infinite linear;
  }
}

</style>