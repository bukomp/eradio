import React from 'react';
import {Button} from '@material-ui/core';
import ReactAudioPlayer from 'react-audio-player';
const url ='http://media.mw.metropolia.fi/wbma/uploads/';

const ListFile = ({file}) => {
  console.log(file);

  const editButton = (id) => {
    //TODO: add modal window to edit file's meta
    console.log(id);
  };

  const playButton = (id) => {
    //TODO: add modal window to play file
    console.log(id);
  };

  return (
      <div className='eachSong'>
        {file.filename} <a href={url+file.filename}>download</a>
        <Button variant="outlined" size="small" color="primary" onClick={() => {editButton(file.file_id)}}>Edit</Button>
        <Button variant="outlined" size="small" color="primary" onClick={() => {playButton(file.file_id)}}>Play</Button>
        <ReactAudioPlayer controls={true} src={url+file.filename}/>
      </div>
  )
};

export default ListFile;