<template>
  <div class="notification-bar alert" :class="notificationTypeClass" >
    <span class="closebtn" @click="remove(notification)" >&times;</span>
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    },
    length: {
      type: Number,
      required: false,
      default: 5000
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), this.length)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      return `type-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}

/* The alert message box */
.alert {
  padding: 10px;
  color: white;
  margin-bottom: 15px;
  background-color: gray; /* Red */
}

.type-error{   background-color: #f44336; /* Red */

}

.type-success{   background-color: #0ed461; /* Green */

}

/* The close button */
.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
  color: #c4c3c7;
}
</style>