import Toast from './toast'

let currentToast

function createToast({Vue, txt, propsData, onClose}) {
  let Constructor = Vue.extend(Toast);
  let toast = new Constructor({
    propsData
  });
  toast.$slots.default = [txt];
  toast.$mount();
  toast.$on('close', onClose);
  document.body.appendChild(toast.$el);
  return toast;
}

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function (txt, toastOptions) {
      if (currentToast) { currentToast.close() }
      currentToast = createToast({
        Vue, 
        txt, 
        propsData: toastOptions,
        onClose: () => {
          currentToast = null;
        }
      });
    }
  }
}