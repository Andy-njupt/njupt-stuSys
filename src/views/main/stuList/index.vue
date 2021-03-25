<template>
  <div id="student-list">
    <sys-table></sys-table>
    <transition>
      <show-modal v-if="showModal"></show-modal>
    </transition>
    <turn-page :totalP="totalPage" :nowP="nowPage" @currentPage="turnPage"></turn-page>
  </div>
</template>

<script>
import sysTable from '@/components/sysTable.vue';
import showModal from '@/components/showModal.vue';
import turnPage from '@/components/turnPage.vue';
import { mapState } from 'vuex';

export default {
  components: {
    sysTable,
    showModal,
    turnPage,
  },
  computed: {
    // 当一个组件需要获取多个状态时，将这些状态都声明为计算属性会有些重复和冗余，使用mapState辅助函数帮助我们生成计算属性
    ...mapState(['showModal', 'nowPage', 'totalPage']),
  },
  methods: {
    turnPage(p) {
      this.$store.dispatch('getStuList', p);
    },
  },
};
</script>

<style>
/* v-enter, v-enter-to, v-enter-active */
/* v-leave, v-leave-to, v-leave-active */
.v-enter, .v-leave-to {
  top: -100%;
  opacity: 0;
}
.v-enter-to, .v-leave {
  top: 0;
  opacity: 1;
}
.v-enter-active, .v-leave-active {
  transition: all .5s;
}

</style>
