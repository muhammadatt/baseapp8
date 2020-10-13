//For cookie-based authentication via Laravel Sanctum

import axios from "axios";

export default {
  namespaced: true,

  state: {
    //user: null
    user: JSON.parse(sessionStorage.getItem(`user`)) || null,
  },

  getters: {

    user(state) {
      return state.user;
    },
    
    loggedIn(state) {
        return !!state.user;
      }
  },

  mutations: {

    SET_USER(state, userData) {
      state.user = userData;
      sessionStorage.setItem("user", JSON.stringify(userData));
    }
  },

  actions: {
    async signIn ({ dispatch }, credentials) {
      //Get CSRF cookie (Allow us to submit post request to Laravel login endpoint)
      await axios.get('/sanctum/csrf-cookie')
      //Authenticate user or return auth errors
      await axios.post('/api/login', credentials)
      //If auth is successful, send a request to make sure auth is working and get user details
      return dispatch('getUser')
    },
    /*
    async login({ dispatch }, credentials) {
      await axios.get("/sanctum/csrf-cookie").then( () => {

      //Authenticate or return errors
      return axios.post("/api/login", credentials).then(() => {      
        //After succssful authentication, get user details
        return dispatch("getUser");
      });
    });

    },*/

    async register({ dispatch }, credentials) {
      await axios.post('/api/register', credentials);
      return dispatch('getUser')
    },

    async logout({ commit }) {
      await axios.post("/api/logout");
      commit("SET_USER", null);

    },

    //Grab details for the authenticated user and set authenticated flag to true
    getUser({ commit }) {
      return axios
        .get("/api/user")
        .then(response => {
          commit("SET_USER", response.data);
        })
        //if user request fails, set frontend user to null
        .catch(() => {
          commit("SET_USER", null);
        });
    }
  }
};
