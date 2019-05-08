import React, {useState, useEffect} from 'react';
import '../css/front.css';
import RegistrationForm from './FrontPage/RegistrationForm';
import LoginForm from './FrontPage/LoginForm';
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {Button} from '@material-ui/core';
import MdHeart from 'react-ionicons/lib/MdHeart'
import Modal from 'react-modal';
import ListFile from './AdminPage/ListFile'




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

  const likedSong = () => {

  }


    return (
        <React.Fragment>

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
                    marginLeft: "85%",
                    marginTop: "5px"
                  }}onClick={logout}>Logout</Button>
          }

          {login.loggedIn &&
          <div className="preference">
            <h2>Please check your preferences here</h2>
            <ul>
              <li><p></p></li>
            </ul>
          </div>
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

          <AudioPlayer/>

          {login.loggedIn &&
            <div>
              <Button onclick={likedSong} style={{
                borderRadius: "50%",
                width: "80px",
                height: "70px",
                position: "absolute",
                marginLeft: "298px",
                marginTop: 0
              }}><MdHeart fontSize="80px" color="red"
                          beat={true}/>
              </Button>

              <br/><p style={{fontSize: "22px", marginLeft: "3%"}}> <br/>Press like
                to impact on radio content and save song information in your
                profile</p>
            </div>
          }


        </React.Fragment>

    );
};

export default FrontPage;