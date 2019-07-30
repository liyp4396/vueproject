import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login.vue";
import Home from "./views/Home.vue";
import User from "./views/User.vue";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/user",
      name: "User",
      component: User
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
