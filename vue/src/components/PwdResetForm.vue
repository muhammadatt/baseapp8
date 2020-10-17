<template>
  <div>
    <div class="form-card">
      <p class="form-title">Change your password</p>
      <div class="form-body">
        <BaseFormErrors :errors="errors" />
        <form @submit.prevent="submit">
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

          <input
            v-model="password_confirmation"
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value
          />
          <p></p>
          <button type="submit" name="button" class="submit">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>Change Password</span>
          </button>
        </form>
      </div>
      <div class="rule"></div>
      <div class="card-footer">
        <router-link :to="{ name: 'user-login' }" class="small-link">
          Go to Login Page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ConsoleLogApiErrors } from "@/mixins/Mixins.js";
import { FormValidator } from "@/mixins/FormValidator.js";
import axios from "axios";

export default {
  mixins: [ConsoleLogApiErrors, FormValidator],
  created() {
    //To Do: Validate Token on page load before showing form
  },
  data() {
    return {
      email: this.$route.query.email,
      password: "",
      password_confirmation: "",
      errors: [],
      token: null,
      alert: {},
      isLoading: false,
    };
  },
  validations: {
    email: {
      required: true,
      isEmail: true,
      maxLength: 255
    },
    password: {
      required: true,
      minLength: 8,
      maxLength: 255
    },
    password_confirmation: {
      required: true,
      sameAsPassword: "password"
    }
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        this.isLoading = true;
        axios
          .post("/api/password/reset", {
            password: this.password,
            password_confirmation: this.password_confirmation,
            token: this.$route.params.token,
            email: this.email
          })
          .then(() => {
            this.isLoading = false;
            this.alert = {
              style: "success",
              message:
                "Password reset successful. You may now log in with your new password."
            };
          })
          .catch(err => {
            this.isLoading = false;
            this.ConsoleLogApiErrors(err);
            this.errors = err.response.data.error;
          });
      }
    }
  }
};
</script>

<style scoped>
.form-card {
  width: 450px;
}
</style>
