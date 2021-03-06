//for JWT based authentication via Laravel Passport

import axios from "axios";

export const state = {
  //user: null
  user: JSON.parse(sessionStorage.getItem(`user`)) || null,
};

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData;
    sessionStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  },
  CLEAR_USER_DATA() {
    sessionStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    //location.reload();
  }
};

export const actions = {
  register({ commit }, credentials) {
    return axios
      .post("/api/register", credentials)
      .then(({ data }) => {
        const userData = data.success;
        //console.log("user data is", userData);
        commit("SET_USER_DATA", userData);
      });
  },
  login({ commit }, credentials) {
    return axios
      .post("/api/login", credentials)
      .then(({ data }) => {
        const userData = data.success;
        commit("SET_USER_DATA", userData);
      });
  },
  logout({ commit }) {
    commit("CLEAR_USER_DATA");
    location.reload();
    location.replace('/');
  }
};

export const getters = {
  loggedIn(state) {
    return !!state.user;
  }
};
