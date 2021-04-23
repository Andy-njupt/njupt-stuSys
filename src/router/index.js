import Vue from 'vue';
import VueRouter from 'vue-router';// 用路由完成页面的跳转

import login from '@/views/login/index.vue';// 登录
import logon from '@/views/logon/index.vue';// 注册
import main from '@/views/main/index.vue';// 主页面
import addStu from '@/views/main/addStu/index.vue';// 主页面下的添加学生
import stuList from '@/views/main/stuList/index.vue';// 主页面下的学生列表
import notFound from '@/views/notFound/index.vue';// 访问的组件不存在，则进入到404页面
import Cookie from '../util/cookie';// cookie模块

Vue.use(VueRouter);// 使用路由

const routes = [
  {
    path: '/notFound', // 404
    component: notFound,
  },
  {
    path: '/login', // 登录
    component: login,
  },
  {
    path: '/logon', // 注册
    component: logon,
  },
  {
    path: '/main', // 主页面
    component: main,
    redirect: '/main/stuList', // 默认跳转到这个页面（重定向）
    children: [
      {
        path: 'stuList', // 学生列表
        name: 'stuList', // 方便引用，直接:to='{name: "stuList"}'即可
        component: stuList,
      },
      {
        path: 'addStu', // 添加学生
        name: 'addStu',
        component: addStu,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history', // vue-router模型是hash模式
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'active', // 精准匹配
});

router.beforeEach((to, from, next) => { // 全局路由守卫
  console.log(to);
  if (to.path === '/') { // 访问根路径 ，直接到/login
    next('/login');
    return;
  }
  // notFound,
  // 路径对应的组件是否存在，
  if (to.matched.length === 0) { // to.matched路由下对应的组件，是个数组
    next('/notFound');
    return;
  }
  if (to.matched[0].path === '/main') {
    const username = Cookie.getCookie('username');// 拿到cookie，看是否存在
    if (username) {
      next();
    } else {
      next('/login');
    }
  }
  next();
});

export default router;
