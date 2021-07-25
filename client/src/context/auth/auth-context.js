import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
   user: null
};

if (localStorage.getItem('JWT')) {
   const decodedJWT = jwtDecode(localStorage.getItem('JWT'));
   if (decodedJWT.exp * 1000 < Date.now()) {
      localStorage.removeItem('JWT');
   } else {
      initialState.user = decodedJWT;
   }
}

const AuthContext = createContext({
   user: null,
   login: (userData) => {},
   logout: () => {}
});

function authReducer(state, action) {
   switch (action.type) {
      case 'LOGIN':
         return {
            ...state,
            user: action.payload
         };
      case 'LOGOUT':
         return {
            ...state,
            user: null
         };
      default:
         return state;
   }
}

function AuthProvider(props) {
   const [state, dispatch] = useReducer(authReducer, initialState);

   const login = (userData) => {
      localStorage.setItem('JWT', userData.token);
      dispatch({
         type: 'LOGIN',
         payload: userData
      });
   };

   const logout = () => {
      localStorage.removeItem('JWT');
      dispatch({ type: 'LOGOUT' });
   };

   return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
