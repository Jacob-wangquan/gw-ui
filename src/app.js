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
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsBody from './tabs-body'
import TabsItem from './tabs-item'
import TabsPane from './tabs-pane'
import Popover from './popover'
import Collapse from './collapse'
import CollapseItem from './collapse-item'

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
Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)
Vue.component('g-popover', Popover)
Vue.component('g-collapse', Collapse)
Vue.component('g-collapse-item', CollapseItem)

Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    message: 'hello',
    selectedTab: 'tab1',
    selectedCollapse: ['1']
  },
  created() {
   
  },
  methods: {
    changeValue(e) {
      console.log(e.target.value);
    },

    showToastTop() {
      // this.$toast('hello');
      // 也可以传入自定义选项
      this.$toast('点击了toast', {
        closeButton: {
          text: '晓得了',
          callback() {
            console.log('I know');
          }
        },
        enableHtml: false,
        position: 'top'
      });
    },
    showToastMiddle() {
      // this.$toast('hello');
      // 也可以传入自定义选项
      this.$toast('点击了toast', {
        closeButton: {
          text: '晓得了',
          callback() {
            console.log('I know');
          }
        },
        enableHtml: false,
        position: 'middle'
      });
    },
    showToastBottom() {
      // this.$toast('hello');
      // 也可以传入自定义选项
      this.$toast('点击了toast', {
        closeButton: {
          text: '晓得了',
          callback() {
            console.log('I know');
          }
        },
        enableHtml: false,
        position: 'bottom'
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