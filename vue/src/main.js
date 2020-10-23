import Vue from "vue";
import App from "./App.vue";
import router from "@/router/route.js";
import store from "@/store/store.js";
import "nprogress/nprogress.css";
import axios from "axios";
import DefaultLayout from "@/views/layouts/Default.vue";
import NoHeaderLayout from "@/views/layouts/NoHeader.vue";

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
//Base Url for backend server
axios.defaults.baseURL = 'http://baseapp8.test/' ;//'127.0.0.1:8000/'; //process.env.VUE_APP_LARAVEL_URL; //'http://baseapp8.test/';
//console.log('backend url: ' + axios.defaults.baseURL );


//Global Registration of Layout files
Vue.component("default-layout", DefaultLayout);
Vue.component("no-header-layout", NoHeaderLayout);

//Automatic global registration of all BaseComponents in components dir
const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  store,
  created() {
    //const userJSON = sessionStorage.getItem("user");
    //eek, empty user gets actually gets saved in local storage as the string "undefined"
    //if (userJSON && userJSON !== "undefined") {
    //  const userObj = JSON.parse(userJSON);
    //  this.$store.commit("SET_USER_DATA", userObj);
    //}
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
   
  
   axios.interceptors.response.use(
    response => response,
    error => {
       //If we get cookie error 419, automatically request a new cookie (usually means session is expired)
      if (error.response.status === 419) {
        //this.$store.dispatch("auth/getCookie");
        axios.get('/sanctum/csrf-cookie')
        error.response.data.error = {'message' : "CSRF Failed. Please try again" };
      } else {
        //There's no data.error property sent for Larvel system errors, 
        //so if the data.error property is missing, append the system error message 
        error.response.data.error = error.response.data.error ?? {'message' : error.message };
      }
      return Promise.reject(error);
      //throw new Error("CSRF Failure");
    }
  );

  },
  render: (h) => h(App),
}).$mount("#app");
