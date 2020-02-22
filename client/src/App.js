import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import Layout from './components/Layout/Layout';

import Map from './pages/Map/Map';
import Events from './pages/Events/Events';
import Top from './pages/Top/Top';
import Profile from './pages/Profile/Profile';
import Event from './pages/Event/Event';

import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './App.css';

const token = localStorage.getItem('token');
const client = new ApolloClient({
  link: new HttpLink({
    // uri: 'http://localhost:4000/graphql',
    uri: 'https://arnoapi.herokuapp.com/graphql',
    headers: {
      token: token || ''
    }
  }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div className="App">
        {token ? (
          <Layout>
            <Switch>
              <Route exact path="/" component={Map} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/top" component={Top} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/event/:id" component={Event} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        ) : (
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
