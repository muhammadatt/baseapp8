<template>
  <div v-if="errors" class="inline-error-block">
    <!--
      <div v-for="(error, index) in errors" :key="index" class="inline-error">
        <span v-html="error"></span>
      </div>
      -->
    <div v-html="errors[0]" class="inline-error"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //error: null
    };
  },
  props: ["errors"],
  computed: {}
};
</script>

<style lang="scss" scoped>
.inline-error-block {
  margin-bottom: 5px;
}
div.inline-error {
  text-align: left;
  padding: 0;
  margin: 0;
  color: red;
  font-size: 12px;
}
</style>
