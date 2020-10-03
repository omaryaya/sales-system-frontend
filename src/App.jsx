import React, { Component }/* , { useState, useEffect } */ from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/products/Products';
import Orders from './components/orders/Orders';

import { Provider } from 'react-redux';
import store from './store';
import Register from './components/accounts/Register';
import Login from './components/accounts/Login';
import PrivateRoute from './components/common/PrivateRoute';
// import { loadUser } from './actions/auth'
// import { render } from '@testing-library/react';

class App extends Component {

  componentDidMount() {
    // store.dispatch(loadUser());
  }

  render() {
    return (

      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/products" component={Products} />
              <PrivateRoute exact path="/orders" component={Orders} />
              
              <Redirect to="/login" />
            </Switch>
          </div>
        </Router>
      </Provider>

    );

  }

}

export default App;
