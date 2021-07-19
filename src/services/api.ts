// import ApolloClient from 'apollo-boost';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:3333/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3333/graphql',
  options: {
    reconnect: true
  }
});


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

