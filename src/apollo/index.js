import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
  notifyOnNetworkStatusChange: true,
  connectToDevTools: true,
  cache: new InMemoryCache(),
});

export default client;