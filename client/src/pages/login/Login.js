import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../../utils/hooks/useForm';
import { AuthContext } from '../../context/auth/auth-context';

const Login = (props) => {
   const { login } = useContext(AuthContext);
   const [errors, setErros] = useState({});

   const { onChange, onSubmit, values } = useForm(loginUserCallback, {
      username: '',
      password: ''
   });

   const [loginUser, { loading }] = useMutation(LOGIN_USER, {
      update(_, { data: { login: userData } }) {
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

   function loginUserCallback() {
      loginUser();
   }
   return (
      <div className="form-container">
         <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
            <h1>Login</h1>
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
               label="Password"
               placeholder="Password..."
               name="password"
               value={values.password}
               onChange={onChange}
               error={!!errors.password}
               type="password"
            />

            <Button type="submit" primary>
               Login
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

const LOGIN_USER = gql`
   mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
         id
         email
         username
         createdAt
         token
      }
   }
`;

export default Login;
