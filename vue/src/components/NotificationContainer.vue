<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      :length=10000
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { mapState } from 'vuex'
export default {
  components: {
    NotificationBar
  },
  computed: mapState('notification', ['notifications'])
}
</script>

<style scoped>
.notification-container {
  min-height: 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 80px;
}
</style>