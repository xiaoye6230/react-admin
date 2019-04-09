import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Product from './index'
import SaveUpdate from './saveUpdate'
import Detail from './detail'

export default class Products extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product/index' component={Product} />
        <Route path='/product/SaveUpdate' component={SaveUpdate} />
        <Route path='/product/detail' component={Detail} />
        <Redirect to='/product/index'/>
      </Switch>
    )
  }
}
