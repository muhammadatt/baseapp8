<template>
  <div id="app">
    <component :is="layout">
      <router-view :key="$route.fullPath" id="page" class="page" />
    </component>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    }
  }
};
</script>

<style lang="scss">
@import "./assets/global.scss";
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px);
}
</style>
