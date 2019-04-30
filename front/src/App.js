import { Component} from 'react';
import React from'react';
import {Router, Route} from 'react-router-dom';
import './App.css';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";


class App extends Component{
constructor(props) {
  super(props);
  this.state = {
  };
}
  render() {
    return (
      <Router basename='/school/webradio/front/'>
        <div className='container'>
          <Route exact path="/" render={(props) => (
            <React.Fragment>
            <RegistrationForm/>
            <LoginForm/>
            </React.Fragment>
          )}/>
        </div>
      </Router>
    );

  }
}

export default App;
