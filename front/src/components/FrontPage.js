import React, {useState} from 'react';
import '../css/front.css';
import RegistrationForm from './FrontPage/RegistrationForm/RegistrationForm';
import LoginForm from './FrontPage/LoginForm/LoginForm';

const FrontPage = (props) => {
  const [login, setLogin] = useState({isOpen: false, isOpenReg: false,});

  const toggleLogin = () => {
    setLogin({
      isOpen: !login.isOpen
    });
  };

  const toggleRegistration = () => {
    setLogin({
      isOpenReg: !login.isOpenReg
    });
  };

  const logout = () => {
    window.localStorage.clear();
    setLogin({user: null})
  };

/*  return (<div>front</div>);*/
    return (
        <React.Fragment>

          <button onClick={toggleLogin}>Login</button>
          <LoginForm
              show={login.isOpen}
              onClose={toggleLogin}>
          </LoginForm>

          <RegistrationForm
              show={login.isOpenReg}
              onClose={toggleRegistration}>
          </RegistrationForm>

        </React.Fragment>
    );
};

export default FrontPage;