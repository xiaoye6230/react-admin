import React, { Component } from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';

import Logo from './pages/logo';
import Admin from './pages/admin';

import './assets/less/reset.less';

export default class App extends Component {
    render(){
        return (
            <Switch>
                <Route path='/logo' component={Logo} />
                <Redirect to='/logo' />
                <Route path='/' component={Admin} />                
            </Switch>
        )
    }
}