<template>
  <div>
    <div class="header">
         <div class="logo">
             <img src="@/assets/1.jpg" alt="">
             <span>南</span>
             <span>京</span>
             <span>邮</span>
             <span>电</span>
             <span>大</span>
             <span>学</span>
         </div>
         <ul class="user">
             <li class="username" id="username">{{ username }}</li>
             <router-link tag="li" class="logout" to="/login">退出
             </router-link>
         </ul>
     </div>
     <div class="left-menu">
         <dl class="menu">
             <dt>学生管理</dt>
             <router-link tag="dd" :to="{name: 'stuList'}">学生列表</router-link>
             <router-link tag="dd" :to="{name: 'addStu'}">新增学生</router-link>
         </dl>
     </div>
     <div class="right-content">
       <router-view></router-view>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  created() {
    // 从cookie中取到用户名
    this.username = this.$cookie.getCookie('username');
  },
};
</script>

<style>
@import url('./index.css');
</style>
