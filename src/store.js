import Vue from "vue";
import Vuex from "vuex";
import DataService from "./service/dataService";

Vue.use(Vuex);

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
  },
  actions: {
    new_savings(state, savings) {
      const newSavings = state.commit("updateSavings", savings);
      state.commit("updateStoreSavings", newSavings);
    },
  },
  mutations: {
    login(state, { token, user }) {
      state.token = token;
      state.user = user;
      state.dataService = DataService;
    },
    logout(state) {
      state.token = null;
      state.user = {};
    },
    updateSavings(state, savings) {
      return state.dataService.setSavings(savings);
    },
    updateStoreSavings(state, savings) {
      state.savings = savings;
    },
  },
  getters: {
    isLoggedIn: (state) => {
      if (state.token) {
        state.dataService.getSavings();
      }
      return state.token != null && state.user != {};
    },
    getUserSavings: async (state) => {
      let value = await state.dataService
        .getSavings()
        .then((val) => {
          console.log(val);
          // value = val;
          return val;
        })
        .then((result) => {
          return result;
        });

      return value;
    },
    getUserId: (state) => {
      return state.user.uid;
    },
  },
});

export default store;
