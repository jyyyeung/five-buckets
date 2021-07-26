<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="isAuth ? googleLogout() : googleLogin()" text>
        <v-icon>mdi-account</v-icon>
        <span class="mr-2">{{ isAuth ? "logout" : "Login" }}</span>
      </v-btn>
    </v-app-bar>

    <v-main> <Savings /> </v-main>
  </v-app>
</template>

<script>
import Savings from "./components/SavingsTable";
import { login, logout } from "./service/auth";
import store from "./store";
export default {
  name: "App",

  components: {
    Savings,
  },
  computed: {
    isAuth() {
      return store.getters.isLoggedIn;
    },
  },
  created() {
    if (!this.isAuth) {
      this.googleLogin();
    } else {
      // userdb.on("value", (snapshot) => {
      //   console.log("created", snapshot.val());
      // });
      // getData(this.userdb)
      // .then((data) => {
      //   console.log("getData ref.val()", data);
      //   const savings = data
      //     ? data
      //     : this.setSavings(store.state.defaultSavings);
      //   store.commit("updateStoreSavings", savings);
      // })
      // .catch((error) => {
      //   console.error("getData", error);
      // });
    }
  },
  methods: {
    googleLogin() {
      login();
    },
    googleLogout() {
      logout();
    },
  },
};
</script>
