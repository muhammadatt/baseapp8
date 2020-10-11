<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      :length=50000
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
  computed: mapState('notification', ['notifications']),
  created(){
    this.$emit('notification-container-loaded', true);
  }
}
</script>
