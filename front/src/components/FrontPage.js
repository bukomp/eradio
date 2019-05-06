import React, {useState} from 'react';
import '../css/front.css';
import RegistrationForm from './FrontPage/RegistrationForm';
import LoginForm from './FrontPage/LoginForm';
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {Button} from '@material-ui/core';


const FrontPage = (props) => {
  const [login, setLogin] = useState({isOpen: false, isOpenReg: false});

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

    return (
        <React.Fragment>
          <AudioPlayer/>
          <Button variant={"contained"}
                  style={{
                    borderRadius: 35,
                    backgroundColor: "lightslategrey",
                    padding: "14px 20px",
                    fontSize: "18px",
                    width: "150px",
                    margin: "25px 0 15px 60%"
                  }}
                  onClick={toggleLogin}>Login</Button>

          <LoginForm
              show={login.isOpen}
              onClose={toggleLogin}>

          <Button style={{
            margin: "15px 0 25px 0",
            fontSize: "25px",
          }} onClick={toggleRegistration}>Be an active listener. Register here.</Button>
          </LoginForm>

          <RegistrationForm
              show={login.isOpenReg}
              onClose={toggleRegistration}>
          </RegistrationForm>

        </React.Fragment>
    );
};

export default FrontPage;