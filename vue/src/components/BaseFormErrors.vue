<template>
  <div v-if="Object.keys(errors).length" class="form-errors">
    <ul>
      <li
        v-for="(error, index) in error_list"
        :key="index"
        style="text-align:left"
      >
        <span v-html="error"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null
    };
  },
  props: ["errors"],
  computed: {
    error_list: function() {
      
      let errors = [];
      const values = Object.values(this.errors);

      for (const messages of values) {

        //Split multiple error messages for same field onto separate lines
        let messages_array = this.myString(messages).split(",");

        for (const message of messages_array) {
          errors.push(message);
        }

      }

      return errors;
    }
  },
  methods: {
    //toString throws an error on null values, this returns an empty string instead
    myString: function(value) {
      if (!value) return "";
      value = value.toString();
      return value;
    }
  }
  
};
</script>

<style lang="scss" scoped>
.form-errors {
  border-radius: 4px;
  background: #f5d3ce;
  display: block;
  padding: 5px 20px;
  background: #eb5a46;
  color: #fbedeb;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.form-errors ul {
  padding-left: 0.5em;
}

#page > div > div.form-body > div > ul > li > span > a {
  color: #fbf28d;
}
.form-errors a:hover {
  color: #ece168;
  text-decoration: underline;
}
</style>
