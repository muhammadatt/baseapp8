import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/user.js";
import * as notification from "@/store/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user, notification
  },
  state: {},
  mutations: {},
  actions: {}
});
