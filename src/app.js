import Vue from 'vue'
import Button from './button'
import ButtonGroup from './button-group'
import Icon from './icon'
import Input from './input'
import Row from './row'
import Col from './col'
import Content from './content'
import Footer from './footer'
import Header from './header'
import Layout from './layout'
import Sider from './sider'
import Toast from './toast'
import plugin from './plugin'

Vue.component('g-button', Button)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-icon', Icon)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-content', Content)
Vue.component('g-footer', Footer)
Vue.component('g-header', Header)
Vue.component('g-layout', Layout)
Vue.component('g-sider', Sider)
Vue.component('g-toast', Toast)

Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    message: 'hello'
  },
  created() {
   
  },
  methods: {
    changeValue(e) {
      console.log(e.target.value);
    },

    showToast() {
      // this.$toast('hello');
      // 也可以传入自定义选项
      this.$toast('message', {
        closeButton: {
          text: '晓得了',
          callback() {
            console.log('I know');
          }
        }
      });
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