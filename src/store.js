import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  //跳转页面之前  把当前登录的用户信息放到vuex  到store.js定义vuex代码
  state: {
    // LoginUser: sessionStorage.getItem("LoginUser")
    //   ? JSON.parse(sessionStorage.getItem("LoginUser"))
    //   : null
  },
  mutations: {
    //initUser突变  要映射到login.vue去
    // initUser(state, payload) {
    //   state.LoginUser = payload;
    // }
  },
  actions: {},
  //添加getters 给main.js
  getters: {
    // getLoginUser(store) {
    //   return store.LoginUser;
    // }
  }
});
