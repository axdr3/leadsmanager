import React, { useState, useEffect } from "react";

import { Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Dashboard from "./leads/Dashboard";
import Register from "./accounts/Register";
import Login from "./accounts/Login";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import { addInterceptors } from "../axiosApi";

// Alert Options

addInterceptors(store);
const alertOptions = {
  timeout: 3000,
  position: "middle",
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 100000,
  },
};

function App(props) {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <React.Fragment>
            <Header />
            <Alerts />
            <div className="container-sm">
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
