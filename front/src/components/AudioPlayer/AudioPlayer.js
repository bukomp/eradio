import React, { Component } from 'react';
import {downloadPlaylist} from '../../misc/playlistApi';
import {Button} from '@material-ui/core';
import MdPlay from 'react-ionicons/lib/MdPlay';
import vinyl from '../../img/vinyl.png';
import '../../css/front.css';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      playlist: [],
      webFrom: "http://media.mw.metropolia.fi/wbma/uploads/",
      song: "",
      playReady:false
    };
    this.player = React.createRef();
  }

  sortTodayPlaylist(playlist) {
    console.log(playlist);
    const playlistTemp = this.state;
    for(let g of playlist.data.data){
      console.log(g);
      console.log(((g.time -(new Date().getTime() - g.duration))));
      if( ((g.time -(new Date().getTime() - g.duration)))>0 ){
        playlistTemp.playlist.push(g);
      }
    }
    if(playlistTemp.playlist.length > 0){playlistTemp.song = playlistTemp.webFrom+playlistTemp.playlist[0].filename;playlistTemp.playReady = true;}
    console.log(playlistTemp);
    return playlistTemp;
  }

  audioEnd = () => {
    if(this.state.playlist[1] !== undefined) {
      const playlistTemp = this.state;
      playlistTemp.song = this.state.webFrom + this.state.playlist[1].filename;
      this.player.current.src=playlistTemp.song;
      playlistTemp.playlist.shift();
      console.log(playlistTemp);
      this.setState(playlistTemp);
    } else {/*
      this.player.current.pause();
      downloadPlaylist().then(res => {
        this.setState(this.sortTodayPlaylist(res),()=>{
          if(this.state.playlist[0] !== undefined) {
            console.log(this.state.song);
            this.audioLoad();
            this.player.current.play().then(()=>{this.player.current.autoplay=true}).catch(err => {console.log(err);})
          } else {
            this.emptyPlaylist();
          }
        });
      });*/
      this.emptyPlaylist();
    }
  };

  audioLoad = () => {
    const g = this.state.playlist[0];
    this.player.current.src = this.state.song;
    this.player.current.currentTime = (g.duration - ((g.time - (new Date().getTime() - g.duration)))) / 1000;
  };

  audioPlay = () => {
    if(!this.state.playReady){
      downloadPlaylist().then(res => {
        this.setState(this.sortTodayPlaylist(res),()=>{
          if(this.state.playlist[0] !== undefined) {
            console.log(this.state.song);
            this.audioLoad();
            this.player.current.play().then(()=>{this.player.current.autoplay=true}).catch(err => {console.log(err);})
          } else {
            this.emptyPlaylist();
          }
        });
      });
    } else {
      switch (this.state.paused) {
        case true:
          this.player.current.muted=false;
          this.setState({paused:false});
          break;
        case false:
          this.player.current.muted=true;
          this.setState({paused:true});
          break;
      }
    }
  };

  emptyPlaylist(){
    console.log("sorry, playlist is empty");
  }

  readyPlayer = () => {
    return(
      <React.Fragment>
        <audio
          ref={this.player}
          onEnded={this.audioEnd}
        />
        <div style={{background: `url(${vinyl}) no-repeat`, height: "521px", width: "640px", position: "relative", margin: "auto"}}>
          <Button style={{
          borderRadius: "50%",
          width: "55px",
          height: "60px",
          top: "44%",
          left: "36%",
          position: "absolute",
        }} onClick={this.audioPlay}><MdPlay fontSize="50px"/></Button></div>
      </React.Fragment>
    );
  };

  render() {
    return(
      <React.Fragment>
        {this.readyPlayer()
        }
      </React.Fragment>
    );
  }
}

export default AudioPlayer;