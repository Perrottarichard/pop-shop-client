import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import './styles.css'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('pop-shop-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})
const linky = new HttpLink({ uri: 'https://pop-shop-server.herokuapp.com' })
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: authLink.concat(linky as any) as any
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById('root')
);