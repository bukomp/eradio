import { Component} from 'react';
import React from'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';

class App extends Component{
constructor(props) {
  super(props);
  this.state = {
  };
}
  render() {
    return (
        <React.Fragment>
          <RegistrationForm/>
          <LoginForm/>
        </React.Fragment>

    );

  }
}

export default App;
