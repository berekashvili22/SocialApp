import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../../utils/hooks/useForm';
import { AuthContext } from '../../context/auth/AuthContext';

const Register = (props) => {
   const { login } = useContext(AuthContext);
   const [errors, setErros] = useState({});

   const { onChange, onSubmit, values } = useForm(registerUserCallback, {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
   });

   const [addUser, { loading }] = useMutation(REGISTER_USER, {
      update(_, { data: { register: userData } }) {
         // userData is destructured from result.data.login;
         // context login
         login(userData);
         props.history.push('/');
      },
      onError(err) {
         setErros(err.graphQLErrors[0].extensions.errors);
      },
      variables: values
   });

   function registerUserCallback() {
      addUser();
   }

   return (
      <div className="form-container">
         <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <h1>Register</h1>
            <Form.Input
               label="Username"
               placeholder="Username..."
               name="username"
               value={values.username}
               onChange={onChange}
               error={!!errors.username}
               type="text"
            />
            <Form.Input
               label="Email"
               placeholder="Email..."
               name="email"
               value={values.email}
               onChange={onChange}
               error={!!errors.email}
               type="email"
            />
            <Form.Input
               label="Password"
               placeholder="Password..."
               name="password"
               value={values.password}
               onChange={onChange}
               error={!!errors.password}
               type="password"
            />
            <Form.Input
               label="Confirm Password"
               placeholder="Confirm Password..."
               name="confirmPassword"
               value={values.confirmPassword}
               onChange={onChange}
               error={!!errors.confirmPassword}
               type="password"
            />
            <Button type="submit" primary>
               Register
            </Button>
         </Form>
         {Object.keys(errors).length > 0 && (
            <div className="ui error message">
               <ul className="list">
                  {Object.values(errors).map((value) => (
                     <li key={value}>{value}</li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

const REGISTER_USER = gql`
   mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
   ) {
      register(
         registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
         }
      ) {
         id
         email
         username
         createdAt
         token
      }
   }
`;

export default Register;
