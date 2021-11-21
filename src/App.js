import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Chat from "./components/Chat";

export class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/chat" component={Chat} />
      </Switch>
    );
  }
}

export default App;
