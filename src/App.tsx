import React from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Routes from './routes';
import history from './services/history';
import client from './services/api';
import GlobalStyles from './styles/global';

function App() {
  return (
    <ApolloProvider client={client as any}>
      <Router history={history}>
        <Routes />
        <GlobalStyles />
      </Router>
    </ApolloProvider>
  );
}

export default App;
