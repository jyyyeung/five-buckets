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
      const newSavings = state.dataService.setSavings(savings);
      console.log(newSavings);
      state.savings = savings;
    },
  },
  getters: {
    isLoggedIn: (state) => {
      console.log(state);
      if (state.token) {
        state.dataService.getSavings();
        // console.log(state.dataService);
        // console.log(savings);
      }
      return state.token != null && state.user != {};
    },
    getUserSavings: (state) => {
      return state.savings;
    },
    getUserId: (state) => {
      return state.user.uid;
    },
  },
});

export default store;
