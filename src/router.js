import Vue from "vue";
import Router from "vue-router";
import Maps from "./views/Maps.vue";
import Login from "./views/Login.vue";
import firebase from "firebase/app";
import {currentUser} from "./firebase.config"

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "*",
      name: "Login",
      component: Login
    }, {
      path: "/maps",
      name: "Maps",
      component: Maps,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  /*  let currentUser = firebase
    .auth()
    .currentUser */
  let requiresAuth = to
    .matched
    .some(record => record.meta.requiresAuth)

  /* console.log("currentUser", currentUser)
  console.log(requiresAuth) */

  if (requiresAuth && !currentUser) 
    next('login')
  else 
    next()
});

export default router