import {Component} from 'react';
import React from'react';
import {BrowserRouter as Router, Switch, Route, NavLink, BrowserRouter} from 'react-router-dom';

import './App.css';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import FrontOffice from "./pages/frontOffice";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

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

          <Router basename='/school/webradio/front'>
            <button onClick={this.toggleLogin}>Login</button>
            <Route exact path="/" render={(props) => (
              <FrontOffice
                {...props}
                show={this.state.isOpen}
                onClose={this.toggleLogin}>
              </FrontOffice>
            )}/>
            <Route path="/player" render={(props) => (
              <AudioPlayer/>
            )}/>


          </Router>

  );

  }
}

export default App;
/*<Route exact path="/" render={(props) => (
              <LoginForm
                {...props}
                show={this.state.isOpen}
                onClose={this.toggleLogin}>
              </LoginForm>
            )}/>
            <Route exact path="/register" render={(props) => (
              <RegistrationForm
                {...props}
                show={this.state.isOpenReg}
                onClose={this.toggleRegistration}>
              </RegistrationForm>
            )}/>*/