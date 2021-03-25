<template>
   <form action="#" id="login">
      <h2>登录
          <router-link to="/logon">注册</router-link>
      </h2>
      <div>
          <label for="account">
              账号:
          </label>
          <input type="text" id="account" v-model="account">
      </div>
      <div>
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="password">
      </div>
      <div>
          <label for=""></label>
          <input class="btn" type="submit" value="提交" id="submit-btn" @click.prevent="commit">
          <input class="btn" type="reset" value="重置" @click.prevent="reset">
      </div>
    </form>
</template>

<script>
export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
  created() {
    this.$cookie.setCookie('username', '', -1);// 清空cookie
  },
  methods: {
    reset() {
      this.account = '';
      this.password = '';
    },
    async commit() {
      if (this.account && this.password) {
        try {
          // 登录请求
          await this.$api.login(`account=${this.account}&password=${this.password}`);
          // 调用自己写的插件
          this.$toast({ msg: '登录成功', type: 'success' });
          // 登录成功保存cookie
          this.$cookie.setCookie('username', this.account);
          // 跳转到主页面
          this.$router.push('/main');
        } catch (error) {
          // 失败则打印错误信息
          this.$toast({ msg: error, type: 'fail' });
        }
      }
    },
  },
};
</script>

<style scoped src="./index.css">
/* @import url(./index.css); */
/* 使用scr+scoped 会添加hash 实现局部css*/
</style>
