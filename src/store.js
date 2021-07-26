import Vue from "vue";
import Vuex from "vuex";
import DataService from "./service/dataService";
import { vuexfireMutations, firebaseAction } from "vuexfire";
import firebase from "./firebase";
import "firebase/database";
import "firebase/auth";

Vue.use(Vuex);

export const db = firebase
  .database()
  .ref()
  .child("savings");
const store = new Vuex.Store({
  state: {
    token: null,
    user: {},
    savings: {
      necessity: 0,
      emergency: 0,
      fun: 0,
      learning: 0,
      investment: 0,
    },
    dataService: null,
    defaultSavings: {
      necessity: 0,
      emergency: 0,
      fun: 0,
      learning: 0,
      investment: 0,
    },
  },
  actions: {
    new_savings(state, savings) {
      const newSavings = state.commit("updateSavings", savings);
      state.commit("updateStoreSavings", newSavings);
    },
    bindSavings: firebaseAction(({ bindFirebaseRef }) => {
      console.log("bindsavings");
      return bindFirebaseRef(
        "savings",
        db.child(firebase.auth().currentUser.uid)
      );
    }),
  },
  mutations: {
    ...vuexfireMutations,
    login(state, { token, user }) {
      state.token = token;
      state.user = user;
      state.dataService = DataService;
      state.savings = state.defaultSavings;
    },
    logout(state) {
      state.token = null;
      state.user = {};
    },
    updateSavings(state, savings) {
      state.dataService.setSavings(savings);
    },
    updateStoreSavings(state, savings) {
      state.savings = savings;
      console.log("updateUserSavings state (after)", state);
    },
  },
  getters: {
    isLoggedIn: (state) => {
      if (state.token) {
        state.dataService.getSavings();
      }
      return state.token != null && state.user != {};
    },
    getUserSavings: (state) => {
      const value = state.savings;
      console.log("getUserSavings state.savings", state.savings);
      return value;
    },
    getUserId: (state) => {
      return state.user.uid;
    },
  },
});

export default store;
