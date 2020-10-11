<template>
  <div>
    <BaseAlert v-bind:alert="alert" />
    <h1>This is your Dashboard</h1>
    <p v-if="isLoading">
      Loading events . . .
    </p>
    <template v-else>
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </template>

 
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import EventCard from "@/components/EventCard";
import { ConsoleLogApiErrors } from "@/mixins/Mixins.js";
import NProgress from "nprogress";

export default {
  mixins: [ConsoleLogApiErrors],
  components: { EventCard },
  data() {
    return {
      isLoading: true,
      events: [],
      errorMessage: "",
      alert: {}
    };
  },
  mounted() {
    NProgress.configure({ parent: '#page' });
    NProgress.start();
    axios
      .get("http://localhost/baseapp/laravel/public/api/events/get-details")
      .then(({ data }) => {
        this.events = data.success;
        this.isLoading = false;
        this.alert = {
          style: "success",
          message: "Events loaded."
        };

        const notification = {
          type: "success",
          message: "Events loaded successfully"
        };
        this.$store.dispatch("notification/add", notification, { root: true });
        NProgress.done();
      })
      .catch(err => {
        this.isLoading = false;
        this.errorMessage = "Failed to receive events.";
        const notification = {
          type: "error",
          message: "There was a problem fetching events."
        };
        this.$store.dispatch("notification/add", notification, { root: true });
        this.ConsoleLogApiErrors(err);
        NProgress.done();
      });
  },
  computed: mapState({
    username: state => state.user.user.name
  })
};
</script>

<style></style>
