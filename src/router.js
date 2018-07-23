import Vue from "vue";
import Router from "vue-router";
import Maps from "./views/Maps.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/maps",
      name: "maps",
      component: Maps
    }
  ]
});