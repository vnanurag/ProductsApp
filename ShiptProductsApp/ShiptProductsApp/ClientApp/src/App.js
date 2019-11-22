import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Products from '../src/components/Products';

export default () => (
  <Layout>
    <Route path='/' component={Products} />
  </Layout>
);
