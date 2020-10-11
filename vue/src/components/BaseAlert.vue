<template>
  <transition name="fade">
    <div
      v-if="isVisible && alert.message"
      class="alert"
      :class="notificationTypeClass"
    >
      <span class="closebtn" @click="close">&times;</span>
      <p>{{ alert.message }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    alert: {
      type: Object,
      required: true,
      default: function() {
        return { message: "", style: "info" };
      }
    }
  },
  data() {
    return {
      isVisible: true
    };
  },
  computed: {
    notificationTypeClass() {
      return `alert-${this.alert.style}`;
    }
  },
  methods: {
    close() {
      this.isVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>

$primary-red: #eb5a46;
$primary-green: #22b958;
$primary-blue: #0079bf;
$primary-orange: #ff840f;

.notification-bar {
  margin: 1em 0 1em;
}

/* The alert message box */
.alert {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert p {
  color: white;
  font-weight: 600;
}

.alert-danger {
  background-color: $primary-red;
  border-color: #ebcccc;
  color: white;
}

.alert-success {
  background-color: $primary-green;
  border-color: #d0e9c6;
  color: white;
}

.alert-info {
  background-color: $primary-blue;
  border-color: #bcdff1;
  color: white;
}

.alert-warning {
  background-color: $primary-orange;
  border-color: #faf2cc;
  color: white;
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
  color: #d4ecdd;
}

/* Fade Transition Effect */
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.1s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>
