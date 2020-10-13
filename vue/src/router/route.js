import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RegisterUser from "@/components/RegisterUser.vue";
import LoginUser from "@/components/LoginUser.vue";
import Dashboard from "@/components/Dashboard.vue";
import PwdResetForm from "@/components/PwdResetForm"
import ForgotPassword from "@/components/ForgotPassword"
import Error404 from '@/views/404.vue'
import Assets from '@/components/Assets'

//import NProgress from 'nprogress'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    //meta: { requiresAuth: true } //This is a custom flag. We look for this setting in the BeforeEach route guard below
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },

  // USER //
  {
    path: "/user/register",
    name: "user-register",
    meta: {layout: "no-header-layout"},
    component: RegisterUser
  },
  {
    path: "/user/login",
    name: "user-login",
    meta: {layout: "no-header-layout"},
    component: LoginUser
    //TO DO: If already logged in, redirect to Dashboard
  },
  {
    path: "/password/reset",
    name: "forgot-password",
    meta: {layout: "no-header-layout"},
    component: ForgotPassword
  },
  {
    path: "/assets",
    name: "assets",
    component: Assets
  },
  {
    path: "/password/reset/:token",
    name: "password-reset",
    meta: {layout: "no-header-layout"},
    component: PwdResetForm
  },

  /* Default route for Not Found/ 404. Make sure this is last! */

  { path: '*', meta: {layout: "no-header-layout"}, component: Error404 }


];

/* Enable Vue History Mode */

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


/** Before each Route:
*
* 1. Show progress bar animation
* 2. Check if desired Route requires Auth and if so, if user is logged in
*
***/

router.beforeEach((to, from, next) => {

  // Start the route progress bar.
  //NProgress.start()
  //NProgress.configure({ parent: "#page" })

  const loggedIn = localStorage.getItem('user');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({name: "user-login"});
      console.log("I am not logged in. Logged in status: " + loggedIn);
    } else {
      console.log("I am logged in. Logged in status: " + loggedIn);
      next();
    }
    
  } else next();

});

// Complete the animation of the route progress bar.

router.afterEach(() => {
  
  //NProgress.done()
})

export default router;
