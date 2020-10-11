export const ConsoleLogApiErrors = {
  methods: {
    ConsoleLogApiErrors(err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status); //e.g. 401
        console.log(err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", err.message);
      }
      console.log(err.config);
    },

    checkIfComponentExists() {
      const keys = Object.keys(this.$options.components);
      const names = keys.map(key => {
        const component = this.$options.components[key];
        let name = "";
        if (component) {
          name = component.name;
        }
        return name;
      });
      return names.includes(this.contentComponent);
    }
  }
};

export const myString = {
  filters: {
    //default toString throws an error on null values, this returns an empty string instead
    myString: function(value) {
      if (!value) return "";
      value = value.toString();
      return value;
    }
  }
};
