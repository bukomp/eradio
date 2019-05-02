import {Component} from 'react';
import React from'react';
import {Router, Switch, Route, NavLink, BrowserRouter} from 'react-router-dom';
import './App.css';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";

class App extends Component{
constructor(props) {
  super(props);
  this.state = {
    isOpen: false,
    isOpenReg: false,
  };
}
  toggleLogin = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleRegistration = () => {
    this.setState({
      isOpenReg: !this.state.isOpenReg
    });
  };

  logout = () => {
    window.localStorage.clear();
    this.setState({user: null})
  };

  render() {
    return (

        <React.Fragment>

          <button onClick={this.toggleLogin}>Login</button>
          <LoginForm
              show={this.state.isOpen}
              onClose={this.toggleLogin}>
          </LoginForm>

          <RegistrationForm
              show={this.state.isOpenReg}
              onClose={this.toggleRegistration}>
          </RegistrationForm>

        </React.Fragment>
  );

  }
}

export default App;
