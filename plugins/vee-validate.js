import { extend, localize } from "vee-validate";
import { required, email, min, max,confirmed, image, integer } from "vee-validate/dist/rules";

const dictionary = {
    en: {
        messages: {
            required: () => '* Required',
        },
    },
};
  
// Install required rule.
extend('required', {
    ...required,
    message: 'This field is required'
  });

  extend('image', {
    ...image,
    message: 'This field must be an image'
  });

  extend('min', {
    ...min,
    message: 'This field must be at least 8 characters'
  });
  extend('max', {
    ...max,
    message:'This field may not be more than 20 characters'
  });
  extend('integer', {
    ...integer,
    message:'this field should only contain numbers'
  });

  extend('confirmed', {
    ...confirmed,
    message: 'password confirmation does not match'
  });
// Install email rule.
extend("email", email);

localize(dictionary);