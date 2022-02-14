import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Stores } from './components/Stores';
import { Products } from './components/Products';
import { Customers } from './components/Customers';
import { Sales } from './components/Sales';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/Customers' component={Customers} />
        <Route path='/Products' component={Products} />
        <Route path='/Stores' component={Stores} />
        <Route path='/Sales' component={Sales} />
      </Layout>
    );
  }
}
