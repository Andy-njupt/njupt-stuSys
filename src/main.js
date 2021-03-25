import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import Cookie from './util/cookie';
import showToast from './util/Toast';

Vue.config.productionTip = false;
// 把一些方法绑定到vue原型上
Vue.prototype.$api = api;
Vue.prototype.$cookie = Cookie;
Vue.prototype.$toast = showToast;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
