import Vue from 'vue'
import Button from './button'
import ButtonGroup from './button-group'
import Icon from './icon'
import Input from './input'

Vue.component('g-button', Button)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-icon', Icon)
Vue.component('g-input', Input)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    message: 'hello'
  },
  methods: {
    changeValue(e) {
      console.log(e.target.value);
    }
  }
})


// 单元测试
import chai from 'chai'
const expect = chai.expect
{
  const Constructor = Vue.extend(Button)
  const button = new Constructor(
    {
      propsData: {
        icon: 'settings'
      }
    }
  )
  button.$mount('#test')
  let useElement = button.$el.querySelector('use')
  console.log(useElement)
  expect(useElement.getAttribute('xlink:href')).to.eq('#i-settings')
  button.$el.remove()
  button.$destroy()
}