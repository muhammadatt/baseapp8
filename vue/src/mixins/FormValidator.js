export const FormValidator = {
  methods: {
    validateForm() {
      this.errors = [];

      // {0} = field name; {1} comparison value for the given rule 
      var templates = {
        required: `{0} is required`,
        minLength: `{0} must contain at least {1} characters`,
        maxLength: `{0} must contain no more than {1} characters`,
        isEmail: `{0} must be a valid email address`,
        sameAsPassword: `Password confirmation does not match password`
      };

      var ruleset = {
        //Rules return true if input is valid

        minLength: function(input, min_length) {
          return String(input).length >= min_length;
        },

        //compare_field should be the name of the orginal password field e.g. "password"
        sameAsPassword: function(input, compare_field) {
          let compare_value = this[compare_field];
          return input === compare_value;
        },

        maxLength: function(input, max_length) {
          return String(input).length <= max_length;
        },

        required: function(input, required) {
          return required != true || (input && typeof input === "string");
        },

        isEmail: function(input) {
          var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return helpers.regex_match(input, regex);
        },

        isUrl: function(input) {
          var regex = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/;
          return helpers.regex_match(input, regex);
        }
      };

      var helpers = {
        regex_match: function(input, regex) {
          return regex.test(input);
        },

        capitalize: function(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        },

        //Borrowed this clever string interpolation function from:
        //https://github.com/semisleep/simple-vue-validator

        err_msg: function(template) {
          var args = Array.prototype.slice.call(arguments, 1);
          return template.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
          });
        }
      };

      for (const [field, rules] of Object.entries(this.$options.validations)) {
        var subArray = [];
        for (const [rule, value] of Object.entries(rules)) {
          //Get user input from the given field
          let input = this[field].trim();

          //Apply given validation rule; returns true if input is validated
          let func = ruleset[rule].bind(this);
          let valid = func(input, value);

          if (!valid) {
            let template = templates[rule];

            //Construct error message from template
            let message = helpers.err_msg(
              template,
              helpers.capitalize(field),
              value
            );
            
            subArray.push(message);
            
          }
          
        }
        if (subArray.length) this.errors[field] = subArray;
        
      }

      //Returns true if form contains no errors
      if (!Object.keys(this.errors).length) {
        return true;
      } else {
        return false;
      }
    }
  }
};
