import Vue from "vue";
import App from "./App.vue";
import router from "@/router/route.js";
import store from "@/store/store.js";
import "nprogress/nprogress.css";
//import axios from "axios";
import DefaultLayout from "@/views/layouts/Default.vue";
import NoHeaderLayout from "@/views/layouts/NoHeader.vue";

Vue.config.productionTip = false;

//Global Registration of Layout files
Vue.component("default-layout", DefaultLayout);
Vue.component("no-header-layout", NoHeaderLayout);

//Automatic global registration of all BaseComponents in components dir
const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  store,
  created() {
    const userJSON = localStorage.getItem("user");
    //eek, empty user gets actually gets saved in local storage as the string "undefined"
    if (userJSON && userJSON !== "undefined") {
      const userObj = JSON.parse(userJSON);
      this.$store.commit("SET_USER_DATA", userObj);
    }

    //This automatically logs a user out our app if they receive a 401 ("Unauthorized") response to any API request.
    //Need to be careful is this is what we want.

    /*
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );

    */
  },
  render: h => h(App)
}).$mount("#app");
