import Toast from './toast'

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function (txt, toastOptions) {
      let Constructor = Vue.extend(Toast);
      let toast = new Constructor({
        propsData: {
          closeButton: toastOptions.closeButton
          //  || {
          //   text: '知道了',
          //   callback() {
          //     console.log('关闭toast');
          //   }
          // }
        }
      });
      toast.$slots.default = [txt];
      toast.$mount();
      document.body.appendChild(toast.$el);
    }
  }
}