<template>
  <div>
    <div class="form-card">
      <div class="form-title">
        Sign Up For BaseApp
      </div>

      <div class="form-body">
        

        <form @submit.prevent="register" class="register">
          <input
            v-model="name"
            type="text"
            name="name"
            placeholder="First Name"
            value
          />
          <BaseInlineErrors :errors="errors.name" />  

          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="Email Address"
            value
             
          />
          <BaseInlineErrors :errors="errors.email" /> 

          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
            value
          />
          <BaseInlineErrors :errors="errors.password" />  

          <p>
            By signing up, you confirm that you've read and accepted our
            <strong>Terms of Service</strong> and
            <strong>Privacy Policy</strong>.
          </p>

          <button type="submit" name="button" class="submit">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>Sign Up</span>
          </button>
        </form>
      </div>
      <div class="rule"></div>
      <div class="card-footer">
        <router-link :to="{ name: 'user-login' }" class="small-link">
          Already have an account? Log in
        </router-link>
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
      name: "",
      email: "",
      password: "",
      errors: [],
      isLoading: false
    };
  },
  validations: {
    name: {
      required: true,
      maxLength: 255
    },
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
  },
  methods: {
    register() {
      if (this.validateForm()) {
        //if passes client validation, submit to server
        this.isLoading = true;
        this.$store
          .dispatch("register", {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({ name: "dashboard" });
          })
          .catch(err => {
            //this.ConsoleLogApiErrors(err);
            this.errors = err.response.data.error;
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-card {
  width: 450px;
}
</style>
