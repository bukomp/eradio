import React, {useState} from 'react';
import '../css/front.css';
import RegistrationForm from './FrontPage/RegistrationForm';
import LoginForm from './FrontPage/LoginForm';
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {Button, TableFooter} from '@material-ui/core';
import {Router, Switch, Route} from 'react-router-dom';
import MdHeart from 'react-ionicons/lib/MdHeart'




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
                    margin: "25px 0 15px 75%"
                  }}
                  onClick={toggleLogin}>Login</Button>

          <LoginForm
              show={login.isOpen}
              onClose={toggleLogin}>

          <Button style={{
            margin: "25px 0 25px 0",
            fontSize: "25px",
          }} onClick={toggleRegistration}>Be an active listener. Register here.</Button>
          </LoginForm>

          <RegistrationForm
              show={login.isOpenReg}
              onClose={toggleRegistration}>
          </RegistrationForm>

           <TableFooter><Button style={{
          }}><MdHeart fontSize="60px" color="red" beat={true} />
            <p style={{fontSize: "15px"}}> Did you like this song? Press like to impact on radio content and save song information in your profile</p></Button>
        </TableFooter>

        </React.Fragment>

    );
};

export default FrontPage;