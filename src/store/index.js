import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stuList: [],
    totalPage: 0,
    count: 0,
    size: 25,
    showModal: false,
    activeStu: {},
    nowPage: 1,
  },
  mutations: {
    setStuList(state, list) {
      state.stuList = list;
    },

    setTotalPage(state, count) {
      state.count = count;
      state.totalPage = Math.ceil(count / state.size);
    },
    setShowModal(state, bool) {
      state.showModal = bool;
    },
    setActiveStu(state, stu) {
      state.activeStu = stu;
    },
    setNowPage(state, p) {
      state.nowPage = p;
    },
  },
  actions: {
    async getStuList({ commit, state }, page) { // {commit.state}是Action 函数接受一个与 store
      // 实例具有相同方法和属性的 context 对象
      const { data: { cont: count, findByPage: list } } = await api.getStu(page, state.size);
      commit('setStuList', list);
      commit('setTotalPage', count);
      commit('setNowPage', page);
    },
    async delStu({ state, dispatch }, sNo) {
      await api.delStu(sNo);
      // 删完之后还有多少页
      let page = Math.ceil((state.count - 1) / state.size);
      if (state.nowPage > page) {
        page = state.nowPage - 1;
      } else {
        page = state.nowPage;
      }
      dispatch('getStuList', page);
    },
  },
  modules: {
  },
});
