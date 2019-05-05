import React, { Component } from 'react';
import {downloadPlaylist} from '../../misc/playlistApi';
import {Button} from '@material-ui/core';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {
      paused:false,
      playlist:[],
      webFrom:"http://media.mw.metropolia.fi/wbma/uploads/",
      song:null
    };

  }

  componentWillMount(){
    downloadPlaylist().then(res => {
      this.setState(this.sortTodayPlaylist(res));
    })
  }

  sortTodayPlaylist(playlist) {
    //console.log(playlist);
    const playlistTemp = this.state;
    playlistTemp.playReady = true;
    for(let g of playlist.data){
      console.log(g);
      console.log(((g.time -(new Date().getTime() - g.duration))));
      if( ((g.time -(new Date().getTime() - g.duration)))>0 ){
        playlistTemp.playlist.push(g);
      }
    }
    playlistTemp.song = playlistTemp.webFrom+this.playNow();
    console.log(playlistTemp);
    return playlistTemp;
  }

  playNow() {
    if(this.state !== undefined){
      for(let g of this.state.playlist){
        if(((g.time -(new Date().getTime() - g.duration))) < g.duration){

          this.player.current.currentTime = (g.duration - ((g.time -(new Date().getTime() - g.duration))))/1000;
          return g.id;
        }
      }
    }
  }

  resume = () => {
    this.setState({paused: false, muted: false});

  };

  pause = () => {
    this.setState({paused: true, muted: true});
  };

  switchButton = () => {
    switch (this.state.paused){
      case true:
        this.resume();
        break;
      case false:
        this.pause();
        break;
    }

    console.log(this.state);
  };

  audioEnd = () => {
    if(this.state.playlist[1].id !== undefined) {
      const playlistTemp = this.state;
      playlistTemp.song = this.state.webFrom + this.state.playlist[1].id;
      playlistTemp.playlist.shift();
      console.log(playlistTemp);
      this.setState(playlistTemp);
    } else {
      console.log("There is an error on Radio Station :(");
    }
  };

  webPlayer = () => {
    return (
      <React.Fragment>
      <audio autoPlay ref={this.player} muted={this.state.muted} onEnded={this.audioEnd} src={this.state.song}/>
      <Button onClick={this.switchButton}>button</Button>
      </React.Fragment>
    );
  };

  render(){
    return(
      <React.Fragment>
        {this.webPlayer()}
      </React.Fragment>
    );
  }
}

export default AudioPlayer;