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

        <v-toolbar-title>Five Buckets</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="isAuth ? googleLogout() : googleLogin()" text>
        <v-icon>mdi-account</v-icon>
        <span class="mr-2">{{ isAuth ? "logout" : "Login" }}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-container>
            <Savings />
            <v-fade-transition>
              <v-overlay v-if="hover && !isAuth" absolute color="primary">
                <v-btn @click="googleLogin">Please Login</v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-container>
        </template>
      </v-hover></v-main
    >
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
  data: function() {
    return {
      hover: false,
    };
  },
  computed: {
    isAuth() {
      return store.getters.isLoggedIn;
    },
  },
  created() {
    if (!this.isAuth) {
      this.googleLogin();
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
