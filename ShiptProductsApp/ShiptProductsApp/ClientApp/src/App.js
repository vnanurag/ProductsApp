﻿import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Products from '../src/components/Products';

export default () => (
  <Layout>
    <Route exact path='/Home' component={Home} />
    <Route path='/counter' component={Counter} />
        <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
        <Route path='/' component={Products} />
  </Layout>
);
