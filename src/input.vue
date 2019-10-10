<template>
  <div class="wrapper" :class="{error}">
    <input type="text" :value="value" :disabled="disabled" :readonly="readonly" 
    @change="$emit('change', $event.target.value)"
    @focus="$emit('focus', $event.target.value)"
    @blur="$emit('blur', $event.target.value)"
    @input="$emit('input', $event.target.value)"
    >
    <template v-if="error">
      <icon name="error" class="error-icon"></icon>
      <span class="error-message">{{error}}</span>
    </template>
  </div>
</template>

<script>
import Icon from './icon'
export default {
  name: 'g-input',
  components: {
    Icon
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  $height: 32px;
  $border-color: #999;
  $border-color-hover: #666;
  $color-error: red;
  $border-radius: 4px;
  $font-size: 12px;
  $box-shadow-color: rgba(0,0,0,.5);
  .wrapper {
    display: inline-flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: $font-size;
    > *:not(:last-child) {
      margin-right: .5em;
    }
    > input {
      height: $height;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      padding: 0 8px;
      font-size: inherit;
      &:hover {
        border-color: $border-color-hover;
      }
      &:focus {
        outline: none;
        box-shadow: insert 0 1px 3px $box-shadow-color;
      }
      &[disabled], &[readonly] {
        border-color: #999;
        color: #999;
        cursor: not-allowed;
      }
    }
    &.error {
      > input {
        border-color: $color-error;
      }
    }
    .error-icon {
      fill: $color-error;
    }
    .error-message {
      color: $color-error;
    }
  }
</style>