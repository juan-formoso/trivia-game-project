import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Trivia from '../pages/Trivia';

class Switcher extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/trivia" render={ (props) => <Trivia { ...props } /> } />
      </Switch>
    );
  }
}

export default Switcher;
