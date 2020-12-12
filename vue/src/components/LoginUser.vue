<template>
  <div>
    <div class="form-card">
      <p class="form-title">
        Log In To BaseApp
      </p>

      <div class="form-body">
        <BaseFormErrors :errors="errors" />

        <form @submit.prevent="submit" class="register">
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="Email Address"
            value
          />

          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
            value
          />

          <p>
            A journey of a thousand miles begins with the first step.
          </p>

          <button type="submit" name="button" class="submit">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>Log In</span>
          </button>
        </form>
      </div>
      <div class="rule"></div>
      <div class="card-footer">
        <div>
          <router-link :to="{ name: 'user-register' }" class="small-link">
            Sign up for an account
          </router-link>
          |
          <router-link :to="{ name: 'forgot-password' }" class="small-link">
            Forgot your password?
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ConsoleLogApiErrors } from "@/mixins/Mixins.js";
import { FormValidator } from "@/mixins/FormValidator.js";

export default {
  mixins: [ConsoleLogApiErrors, FormValidator],
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      isLoading: false,
    };
  },
  validations: {
    email: {
      required: true,
      isEmail: true,
      maxLength: 255,
    },
    password: {
      required: true,
      maxLength: 255,
    },
  },
  methods: {
    async submit() {
      if (this.validateForm()) {
        this.isLoading = true;
        this.$store
          .dispatch("auth/signIn", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.isLoading = false;
            this.$router.push({ name: "dashboard" });
          })
          .catch((err) => {
            this.ConsoleLogApiErrors(err);
            this.errors = err.response.data.error;
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
.form-card {
  width: 450px;
}
</style>
