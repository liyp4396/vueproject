import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
// import helper from "./lib/helper"; //引入js

import "./lib/hotcss/hotcss.js";
import "mint-ui/lib/style.css";

Vue.config.productionTip = false;

Vue.use(VeeValidate);

//如果到其他页面没有登录   跳转到登录页面
//路由全局守卫实现全局登录校验未登录跳转到登录页
// router.beforeEach((to, from, next) => {
//   if (to.path != "/") {
//     //校验用户是否登录
//     //判断 store.getters.getLoginUser 不为空
//     // store.getters.getLoginUser 是个对象 新建helper.js做判断
//     if (helper.getTypes(store.getters.getLoginUser) === "object") {
//       next();
//     } else {
//       next("/");
//     }
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
