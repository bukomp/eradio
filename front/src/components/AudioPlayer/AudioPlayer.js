import React, { Component } from 'react';
import {downloadPlaylist} from '../../misc/playlistApi';
import {Button} from '@material-ui/core';

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
    playlistTemp.playReady = true;
    for(let g of playlist.data.data){
      console.log(g);
      console.log(((g.time -(new Date().getTime() - g.duration))));
      if( ((g.time -(new Date().getTime() - g.duration)))>0 ){
        playlistTemp.playlist.push(g);
      }
    }

    if(playlistTemp.playlist.length >= 1)playlistTemp.song = playlistTemp.webFrom+playlistTemp.playlist[0].id;
    console.log(playlistTemp);
    return playlistTemp;
  }

  audioEnd = () => {
    if(this.state.playlist[1] !== undefined) {
      const playlistTemp = this.state;
      playlistTemp.song = this.state.webFrom + this.state.playlist[1].id;
      this.player.current.src=playlistTemp.song;
      playlistTemp.playlist.shift();
      console.log(playlistTemp);
      this.setState(playlistTemp);
    } else {
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
      });
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

  }

  readyPlayer = () => {
    return(
      <React.Fragment>
        <audio
          controls
          ref={this.player}
          onEnded={this.audioEnd}
        />
        <Button onClick={this.audioPlay}>Play</Button>
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