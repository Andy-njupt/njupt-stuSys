<template>
  <form action="#" id="register">
    <h2>注册
        <router-link to="login">登录</router-link>
    </h2>
    <div>
        <label for="username">
            用户名:
        </label>
        <input type="text" id="username" name="username" v-model="username">
    </div>
    <div>
        <label for="account">
            账号:
        </label>
        <input type="text" id="account" name="account" v-model="account">
    </div>
    <div>
        <label for="password">密码:</label>
        <input type="password" id="password" name="password" v-model="password">
    </div>
    <div>
        <label for="rePassword">确认密码:</label>
        <input type="password" id="rePassword" name="rePassword" v-model="rePassword">
    </div>
    <div>
        <label for=""></label>
        <input class="btn" type="submit" value="注册" @click.prevent="logon">
        <input class="btn" type="reset" value="重置" @click.prevent="reset">
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      account: '',
      password: '',
      rePassword: '',
    };
  },
  methods: {
    reset() {
      this.username = '';
      this.account = '';
      this.password = '';
      this.rePassword = '';
    },
    async logon() {
      if (this.account && this.username && this.password && this.rePassword) {
        if (this.password === this.rePassword) {
          try {
            await this.$api.logon(`account=${this.account}&password=${this.password}&rePassword=${this.rePassword}&username=${this.username}`);
            this.$toast({ msg: '注册成功', type: 'success' });
            this.$router.push('/login');
          } catch (error) {
            this.$toast({ msg: error, type: 'fail' });
          }
        } else {
          this.$toast({ msg: '密码不一致', type: 'fail' });
        }
      }
    },
  },
};
</script>

<!-- @import css-loader, style-loader, 利用vue-loader -->
<style scoped src="../login/index.css">
/* @import url(../login/index.css); */
</style>
