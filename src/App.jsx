import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/products/Products';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (

    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/"
              render={() => (
                <>
                  <Products />
                </>
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
