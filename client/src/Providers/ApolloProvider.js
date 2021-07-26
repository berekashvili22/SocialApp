import React from 'react';
import App from '../App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const ApolloProviderWrapper = () => {
   const httpLink = createHttpLink({
      uri: 'http://localhost:5000'
   });

   const authLink = setContext(() => {
      const jwt = localStorage.getItem('JWT');
      return {
         headers: {
            Authorization: jwt ? `Bearer ${jwt}` : ''
         }
      };
   });

   const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
   });

   return (
      <ApolloProvider client={client}>
         <App />
      </ApolloProvider>
   );
};

export default ApolloProviderWrapper;
