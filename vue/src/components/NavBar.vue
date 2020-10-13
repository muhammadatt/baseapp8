<template>
  <div id="nav">
    <router-link to="/">
      Home
    </router-link>
    <router-link v-if="loggedIn" :to="{ name: 'dashboard' }">
      Dashboard
    </router-link>
    <router-link
      v-if="!loggedIn"
      :to="{ name: 'user-login' }"
      class="login-button"
    >
      <button>Sign In</button>
    </router-link>
    <div v-else class="pseudo-link logout-link" @click="logout">
      Sign Out
    </div>
  </div>
</template>

<script>
import { authUser } from "@/store/helpers.js";
export default {
  computed: {
    //import user and loggedIn status from our state helper
    ...authUser
  },
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => {
          this.$router.push("user/login");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.2em 1em;
  background: hsl(219, 78%, 55%);
  background: #8bc34a;
}
#nav > a {
  color: white;
  font-weight: normal;
  margin: auto 0.8em auto 0.4em;
}
#nav > a:hover {
  text-decoration: none;
}

#nav > a.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
  font-weight: bold;
}
.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: white;
}

.logout-link {
  margin: auto 0.8em auto auto;
  color: white;
  font-weight: normal;
}

.logout-link:hover {
  color: white;
}

#nav a.login-button {
  margin: auto 0.8em auto auto;
  text-decoration: none;
  border: 0;
}
#nav button {
  margin: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;
  border: 0;
  font-weight: bold;
  &.router-link-active {
    color: #2c3e50;
  }
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
