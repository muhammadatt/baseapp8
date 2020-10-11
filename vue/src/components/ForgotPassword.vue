<template>
  <div>
    <div class="form-card">
      <div v-if="isVisible">
        <p class="form-title">
          Can't Log In?
        </p>

        <div class="form-body">
          <BaseFormErrors :errors="errors" />

          <form @submit.prevent="submit" class="register">
            <label for="email">We'll send a password recovery link to:</label>
            <input
              v-model="email"
              type="email"
              name="email"
              placeholder="Email Address"
              value
            />

            <button type="submit" name="button" class="submit">
              <span v-if="isLoading" class="spinner"></span>
              <span v-else>Send Link</span>
            </button>
          </form>
        </div>
        <div class="rule"></div>
        <div class="card-footer">
          <router-link :to="{ name: 'user-login' }" class="small-link">
            Remember your password? Log in
          </router-link>
        </div>
      </div>

      <div v-else class="success_message">
        Password reset email has been sent to:
        <p class="sent_email">{{ email }}</p>
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
  data() {
    return {
      email: "",
      errors: [],
      isVisible: true,
      isLoading: false
    };
  },
  validations: {
    email: {
      required: true,
      isEmail: true,
      maxLength: 255
    }
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        this.isLoading = true;
        axios
          .post("http://localhost/baseapp/laravel/public/api/password/email", {
            email: this.email
          })
          .then(() => {
            //hide form after successful submit
            this.isVisible = false;
            this.isLoading = false;
          })
          .catch(err => {
            //TO DO: Supress error message for email not found, for security reasons

            this.ConsoleLogApiErrors(err);
            this.errors = err.response.data.error;
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style scoped>
.success_message {
  vertical-align: middle;
  margin: 25px auto;
}
p.sent_email {
  font-weight: bold;
  font-size: 22px;
}
.form-card {
  min-width: 450px;
}
</style>
