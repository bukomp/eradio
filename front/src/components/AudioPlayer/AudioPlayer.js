import React, { Component } from 'react';
import {downloadPlaylist, songPlayed} from '../../misc/playlistApi';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {
      playlist:[],
      webFrom:"http://media.mw.metropolia.fi/wbma/uploads/"

    };
  }

  sortTodayPlaylist(playlist) {
    //console.log(playlist);
    const date = new Date();
    const playlistTemp = this.state;
    playlistTemp.playReady = true;
    for(let g of playlist.data){
      console.log(g);
      console.log(((g.time -(new Date().getTime() - g.duration))));
      if(
        date.getDate() === g.date.day &&
        date.getMonth()+1 === g.date.month &&
        date.getFullYear() === g.date.year &&
        ((g.time -(new Date().getTime() - g.duration)))>0

      ){
        playlistTemp.playlist.push(g);
      }
    }
    console.log(playlistTemp);
    return playlistTemp;
  }

  playNow() {
    for(let g of this.state.playlist){
      if(((g.time -(new Date().getTime() - g.duration))) < g.duration){

        const player = this.player.current;
        player.currentTime = (g.duration - ((g.time -(new Date().getTime() - g.duration))))/1000;
        return g.id;
      }
    }
  }

  audioEnd = () => {

    this.player.current.src=this.state.webFrom+this.state.playlist[1].id;
    const playlistTemp = this.state;
    playlistTemp.playlist.shift();
    console.log(playlistTemp);
    this.setState(playlistTemp);
    /*//this.setState({playReady:false});
    const tempArr = this.state;
    for(let g of this.state.playlist){
      if(((g.time -(new Date().getTime() - g.duration)))>=0){
        const player = this.player.current;
        player.currentTime = (g.duration - ((g.time -(new Date().getTime() - g.duration))))/1000;
        player.src=this.state.webFrom+this.playNow()
      }
    }*/
  };

  componentDidMount(){
    downloadPlaylist().then(res => {
      this.setState(this.sortTodayPlaylist(res));
    })
  }

  webPlayer = () => {
    return (
      <audio autoPlay controls ref={this.player} onEnded={this.audioEnd}>
        {
          this.state.playReady &&
          <source src={this.state.webFrom+this.playNow()} type="audio/mpeg"/>
        }
      </audio>
    );
  };



  render(){
    return(
      this.webPlayer()
    );
  }
}

export default AudioPlayer;