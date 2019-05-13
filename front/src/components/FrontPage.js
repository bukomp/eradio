import React, {useState, useEffect} from 'react';
import '../css/front.css';
import {addFavourite} from '../misc/userApi';
import RegistrationForm from './FrontPage/RegistrationForm';
import LoginForm from './FrontPage/LoginForm';
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import {Button} from '@material-ui/core';
import MdHeart from 'react-ionicons/lib/MdHeart';
import MdPlay from 'react-ionicons/lib/MdPlay';
import MdMusicalNote from 'react-ionicons/lib/MdMusicalNote';


const FrontPage = (props) => {
  const [login, setLogin] = useState(
      {isOpen: false, isOpenReg: false, loggedIn: false});
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
    if (id !== null && id !== undefined && id !== "undefined" && id !==
        "null") setMusic({
      musicPlayingId: id
    });
    setTimeout(console.log(music.musicPlayingId), 500);
  };

  const toggleRegistration = () => {
    setLogin({
      isOpenReg: !login.isOpenReg
    });
  };

  const logout = () => {
    setLogin({
      loggedIn: false
    });
    window.localStorage.clear();
    setLogin({user: null})
  };

  const likedSong = () => {
    if (music.musicPlayingId !== null && music.musicPlayingId !== undefined &&
        music.musicPlayingId !== "undefined" && music.musicPlayingId !==
        "null") {
      console.log(window.localStorage.getItem('token'));
      addFavourite(window.localStorage.getItem('token'), music.musicPlayingId).
          then(res => console.log(res)).
          catch(err => console.log(err))
    }
  };

    return (
        <React.Fragment>

          {!login.loggedIn &&
          <header className={"loginHeader"}>
            <div className={"right"}>
              <h3> Press <MdPlay/> button in the middle to enjoy the radio listening</h3></div>
            <div className={"left"}><Button className={"LoginButton"} variant={"contained"}
                  style={{
                    borderRadius: 35,
                    backgroundColor: "lightslategrey",
                    padding: "14px 15px",
                    fontSize: "30px",
                    width: "150px",
                    marginLeft: "40%",
                    marginTop: "10px",
                    zIndex: "999",
                    fontFamily: "Font",
                    fontWeight: "bold"

                  }}
                    onClick={toggleLogin}>Login</Button></div>

          </header>
          }
          {login.loggedIn &&
          <header className="right"> <Button variant={"contained"}
                  style={{
                    borderRadius: 35,
                    backgroundColor: "lightslategrey",
                    padding: "14px 20px",
                    fontSize: "30px",
                    width: "150px",
                    marginLeft: "5%",
                    marginTop: "5px",
                    fontFamily: "Font",
                    fontWeight: "bold"
                  }}onClick={logout}>Logout</Button></header>
          }

          {login.loggedIn &&
          <div className={"preference"}>
            <h2>Check your preferences here</h2>
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
            margin: "25px 0 25px 10px",
            fontSize: "26px",
            fontFamily: "Font",
            fontWeight: "bold"
          }} onClick={toggleRegistration}>Be an active listener. Press here.</Button>
          </LoginForm>


          <RegistrationForm
              show={login.isOpenReg}
              onClose={toggleRegistration}>
          </RegistrationForm>


          <div className="player"> <AudioPlayer getSongId={getSongId}/></div>

          {login.loggedIn &&
            <div>
              <div className={"like"}><Button onClick={likedSong} style={{
                borderRadius: "50%",
                width: "80px",
                height: "77px",
              }}><MdHeart fontSize="83px" color="red"
                          beat={true}/>
              </Button></div>

              <br/><div className={"likeText"}><p>Press <MdHeart/> to impact on radio content and save song's name in preference list</p></div>
            </div>
          }
        </React.Fragment>

    );
};

export default FrontPage;