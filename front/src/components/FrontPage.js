import React, {useState, useEffect} from 'react';
import '../css/front.css';
import RegistrationForm from './FrontPage/RegistrationForm';
import LoginForm from './FrontPage/LoginForm';
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {Button} from '@material-ui/core';
import MdHeart from 'react-ionicons/lib/MdHeart'




const FrontPage = (props) => {
  const [login, setLogin] = useState({isOpen: false, isOpenReg: false, loggedIn:false});

  const toggleLogin = () => {
    setLogin({
      isOpen: !login.isOpen
    });
  };

  const signIn = () => {
    setLogin({
      loggedIn: true
    });
  };

  const toggleRegistration = () => {
    setLogin({
      isOpenReg: !login.isOpenReg
    });
  };

  const logout = () => {
    setLogin({
      loggedIn:false
    });
    window.localStorage.clear();
    setLogin({user: null})
  };



    return (
        <React.Fragment>
          <AudioPlayer/>
          {!login.loggedIn &&
          <Button variant={"contained"}
                  style={{
                    borderRadius: 35,
                    backgroundColor: "lightslategrey",
                    padding: "14px 20px",
                    fontSize: "18px",
                    width: "150px",
                    margin: "25px 0 15px 75%",
                    zIndex: "999",
                    position: "absolute"
                  }}
                  onClick={toggleLogin}>Login</Button>
          }
          {login.loggedIn &&
          <Button variant={"contained"}
                  style={{
                    borderRadius: 35,
                    backgroundColor: "lightslategrey",
                    padding: "14px 20px",
                    fontSize: "18px",
                    width: "150px",
                    margin: "25px 0 15px 75%"
                  }}onClick={logout}>Logout</Button>
          }
          <LoginForm
              show={login.isOpen}
              onClose={toggleLogin}
              signIn={signIn}
              isSignedIn={login.loggedIn}
          >

          <Button style={{
            margin: "25px 0 25px 0",
            fontSize: "25px",
          }} onClick={toggleRegistration}>Be an active listener. Register here.</Button>
          </LoginForm>

          <RegistrationForm
              show={login.isOpenReg}
              onClose={toggleRegistration}>
          </RegistrationForm>
          {login.loggedIn &&

            <div>
              <Button style={{
                borderRadius: "50%",
                width: "80px",
                height: "70px"
              }}><MdHeart fontSize="60px" color="red"
                          beat={true}/>
              </Button>

              <p style={{fontSize: "15px"}}> Did you like this song? Press like
                to impact on radio content and save song information in your
                profile</p>
            </div>
          }

        </React.Fragment>

    );
};

export default FrontPage;