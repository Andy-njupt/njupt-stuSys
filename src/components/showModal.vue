<template>
  <div class="modal">
    <div class="mask" @click="setShowModal(false)"></div>
    <div class="modal-content">
      <h2>编辑表单</h2>
      <form action="#" id="edit-student-form">
        <div>
          <label for="edit-name">姓名</label>
          <input type="text"
          id="edit-name"
          name="name"
          @input="edit('name', $event.target.value)"
          :value="activeStu.name"></div>
        <div><label for="">性别</label>
            <input type="radio" name="sex" id="edit-male" :value='0'
            @change="edit('sex', 0)"
            :checked="activeStu.sex === 0">
            <label for="edit-male" class="sex">男</label>
            <input type="radio" name="sex" id="edit-female" :value="1"
            @change="edit('sex', 1)"
            :checked="activeStu.sex === 1">
            <label for="edit-female" class="sex">女</label>
        </div>
        <div>
          <label for="edit-email">邮箱</label>
          <input type="email" id="edit-email" name="email" :value="activeStu.email"
          @input="edit('email', $event.target.value)"
          ></div>
        <div>
          <label for="edit-number">学号</label>
          <input type="text" id="edit-number" name="sNo" readonly :value="activeStu.sNo"></div>
        <div>
          <label for="edit-birthYear">出生年</label>
          <input
          type="text"
          id="edit-birthYear"
          name="birth"
          :value="activeStu.birth"
          @input="edit('birth', $event.target.value)"
          ></div>
        <div>
          <label for="edit-phone">手机号</label>
          <input type="text"
          id="edit-phone"
          :value="activeStu.phone"
          @input="edit('phone', $event.target.value)"
          name="phone"></div>
        <div>
          <label for="edit-address">住址</label>
          <input type="text" id="edit-address" name="address"
          :value="activeStu.address"
          @input="edit('address', $event.target.value)"
          ></div>
        <div><label for=""></label>
            <button id="edit-submit" class="btn" @click.prevent="commit">提交</button>
        </div>
      </form>
    </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['showModal', 'activeStu']),
  },
  methods: {
    ...mapMutations(['setShowModal']),
    edit(prop, val) {
      this.stu[prop] = val;// 存储改变的值到stu对象中去
    },
    async commit() {
      // console.log(this.stu);
      // 新的值stu，老的值activeStu
      // 对象合并，Object.assign(obj, obj1, obj2)
      // {...obj1, ...obj2}
      const user = { ...this.activeStu, ...this.stu };
      try {
        await this.$api.updateStu(user);
        this.setShowModal(false);// 修改成功，编辑表单页面关闭
        // console.log('修改成功');
        this.$toast({ msg: '修改成功', type: 'success' });
        // 修改成功后，把user合并到activeStu中
        Object.assign(this.activeStu, user);
      } catch (error) {
        // console.log(error);
        this.$toast({ msg: error, type: 'fail' });
      }
    },
  },
  data() {
    return {
      stu: {}, // 把我们改变的值存到这个对象里面去
    };
  },
};
</script>

<style>

</style>
