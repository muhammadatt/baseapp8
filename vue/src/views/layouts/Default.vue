<template>
  <div id="app">
    <NavBar />
    <NotificationContainer
      v-show="!isNotifierLoaded"   
      @notification-container-loaded="disableGlobalNotification"
    />
    <slot />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {

  data() {
    return {
      isNotifierLoaded: false
    };
  },
  methods: {
    disableGlobalNotification() {
      this.isNotifierLoaded = true;
    }
  },
  components: {
    NavBar,
    NotificationContainer: () => import("@/components/NotificationContainer.vue"),

  }
};
</script>