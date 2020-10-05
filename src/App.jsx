import React, { Component }/* , { useState, useEffect } */ from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar';
import Products from './components/products/Products';
import Orders from './components/orders/Orders';

import { Provider } from 'react-redux';
import store from './store';
import Register from './components/accounts/Register';
import Login from './components/accounts/Login';
import PrivateRoute from './components/common/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore} from 'redux-persist';
// import Home from './components/Home';
// import { loadUser } from './actions/auth'
// import { render } from '@testing-library/react';

const persistor = persistStore(store);

class App extends Component {

  componentDidMount() {
    // store.dispatch(loadUser());
  }

  render() {
    return (

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Router>
          <CssBaseline />
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
        </PersistGate>
      </Provider>

    );

  }

}

export default App;
