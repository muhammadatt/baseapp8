import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth-sanctum";
//import * as user from "@/store/auth-passport.js";
import * as notification from "@/store/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notification,
    auth
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {
  }
  
  

});
