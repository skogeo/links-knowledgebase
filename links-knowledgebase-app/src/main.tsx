import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { createTheme, MantineProvider } from '@mantine/core';
import { setContext } from '@apollo/client/link/context';
import App from './App.js';
import './index.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:1337/graphql', // Replace with your actual GraphQL endpoint
});

const theme = createTheme({
  /** Put your mantine theme override here */
});

const authLink = setContext(async (_, { headers }) => {
  // Assume the token is stored somewhere like localStorage
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),

  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </MantineProvider>
  </React.StrictMode>
);
