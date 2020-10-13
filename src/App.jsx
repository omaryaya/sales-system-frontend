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
import Home from './components/Home';

import { Provider } from 'react-redux';
import store from './store';
import Register from './components/accounts/Register';
import Login from './components/accounts/Login';
import PrivateRoute from './components/common/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Customers from './components/customers/Customers';

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
            <Navbar />

            <div className="App">
              <CssBaseline />

              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/products" component={Products} />
                <PrivateRoute exact path="/orders" component={Orders} />
                <PrivateRoute exact path="/customers" component={Customers} />
                <PrivateRoute exact path="/" component={Home} />

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
