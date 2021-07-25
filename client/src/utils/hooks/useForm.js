import { useState } from 'react';

const useForm = (registerUser, initialState = {}) => {
   const [values, setValues] = useState(initialState);

   const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      registerUser();
   };

   return { onChange, onSubmit, values };
};

export default useForm;
