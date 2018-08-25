<template>
  <div class="container has-text-centered">
    <h1 class="title section">
      <font-awesome-icon icon="dice" /> Dicemap
    </h1>
    <form>
      <div class="field">
        <div class="control has-icons-left">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="envelope" />
          </span>
          <input class="input" type="text" v-model="email" placeholder="Email"><br>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="key" />
          </span>
          <input class="input" type="password" v-model="password" placeholder="Password"><br>
        </div>
      </div>
      <div class="field">
        <button class="button is-primary" @click="signIn">Sign In</button>
      </div>
    </form>
  </div>
</template>

<script>
//import firebase from "firebase/app";
import { currentUser, signInWithEmailAndPassword } from "@/firebase.config";
/* 
import "firebase/auth";
 */
export default {
  name: "login",
  created() {
    if (currentUser) {
      this.$router.replace("/maps");
    }
  },
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      signInWithEmailAndPassword(this.email, this.password).then(
        () => {
          this.$router.replace("/maps");
        },
        err => {
          alert(err.message);
        }
      );
    }
  }
};
</script>

<style scoped>
form {
  margin: 0 auto;
  max-width: 280px;
}
</style>
