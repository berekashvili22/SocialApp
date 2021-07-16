module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
   const errors = {};
   if (username.trim() === '') {
      errors.username = 'Username is required';
   }
   if (email.trim() === '') {
      errors.email = 'Email is required';
   } else {
      const regEx =
         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!email.match(regEx)) errors.email = 'Invalid email address';
   }
   if (password === '') {
      errors.password = 'Password is required';
   } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords does not match';
   }

   return {
      errors,
      valid: Object.keys(errors).length < 1
   };
};

module.exports.validateLoginInput = (username, password) => {
   const errors = {};
   if (username.trim() === '') {
      errors.username = 'Username is required';
   }
   if (password.trim() === '') {
      errors.password = 'Password is required';
   }

   return {
      errors,
      valid: Object.keys(errors).length < 1
   };
};
