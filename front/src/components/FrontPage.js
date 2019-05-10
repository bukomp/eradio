import React, {useState, useEffect} from 'react';
import '../css/front.css';
import {addFavourite} from '../misc/userApi'
import RegistrationForm from './FrontPage/RegistrationForm';
import LoginForm from './FrontPage/LoginForm';
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {Button} from '@material-ui/core';
import MdHeart from 'react-ionicons/lib/MdHeart'
import MdMusicalNote from 'react-ionicons/lib/MdMusicalNote'


const FrontPage = (props) => {
  const [login, setLogin] = useState({isOpen: false, isOpenReg: false, loggedIn:false});
  const [music, setMusic] = useState({musicPlayingId: null});

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

  const getSongId = (id) => {
    if(id !== null && id !== undefined && id !== "undefined" && id !== "null")setMusic({
      musicPlayingId: id
    })
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
    if(music.musicPlayingId !== null && music.musicPlayingId !== undefined && music.musicPlayingId !== "undefined" && music.musicPlayingId !== "null")addFavourite(window.localStorage.getItem('token'), music.musicPlayingId).this(res => console.log(res)).catch(err => console.log(err));
  };

    return (
        <React.Fragment>

          {!login.loggedIn &&
          <Button className={"LoginButton"} variant={"contained"}
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
                    marginLeft: "75%",
                    marginTop: "5px"
                  }}onClick={logout}>Logout</Button>
          }

          {login.loggedIn &&
          <div className="preference">
            <h2>Please check your preferences here</h2>
            <ul>
              <li><MdMusicalNote/></li>
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


          <AudioPlayer getSongId={getSongId}/>

          {login.loggedIn &&
            <div>
              <Button onClick={likedSong} style={{
                borderRadius: "50%",
                width: "80px",
                height: "70px",
                position: "absolute",
                marginLeft: "298px",
                marginTop: 0
              }}><MdHeart fontSize="80px" color="red"
                          beat={true}/>
              </Button>

              <br/><p style={{fontSize: "20px", marginLeft: "3%"}}> <br/>Press like
                to impact on radio content and save song information in your
                profile</p>
            </div>
          }


        </React.Fragment>

    );
};

export default FrontPage;