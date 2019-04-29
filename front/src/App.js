import {React, Component} from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

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
        </React.Fragment>

    );
    
  }
}

export default App;
