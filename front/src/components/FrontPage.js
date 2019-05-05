import React, {useState} from 'react';
import '../css/front.css';
import RegistrationForm from './FrontPage/RegistrationForm/RegistrationForm';
import LoginForm from './FrontPage/LoginForm/LoginForm';
import AudioPlayer from "./AudioPlayer/AudioPlayer";

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
    window.location.href = '/';
    setLogin({user: null})

  };

/*  return (<div>front</div>);*/
    return (
        <React.Fragment>
          <AudioPlayer/>
          <button onClick={toggleLogin}>Login</button>
          <LoginForm
              show={login.isOpen}
              onClose={toggleLogin}>
          <button className="registration" onClick={toggleRegistration}>Be an active listener. Register here.</button>
          </LoginForm>

          <RegistrationForm
              show={login.isOpenReg}
              onClose={toggleRegistration}>
          </RegistrationForm>
        </React.Fragment>
    );
};

export default FrontPage;