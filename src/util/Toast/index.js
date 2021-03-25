import Vue from 'vue';
import toast from './index.vue';

// Vue.extend;

// webpack.merge, Jquery.extend()
const Toast = Vue.extend(toast);// 新的构造器

const showToast = ({ msg, type }) => {
  const app = new Toast({
    data() {
      return {
        msg,
        type,
      };
    },
    el: document.createElement('div'),
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.show = false;
  }, 2000);
  setTimeout(() => {
    app.exist = false;
  }, 2500);
};

export default showToast;
