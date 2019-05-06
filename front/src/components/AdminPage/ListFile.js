import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import ReactAudioPlayer from 'react-audio-player';
import LoginForm from '../FrontPage/LoginForm';
import Modal from 'react-modal';

const url ='http://media.mw.metropolia.fi/wbma/uploads/';

const ListFile = ({file}) => {
  const fileMeta = JSON.parse(file.title);
  const [modal, setModal] = useState({modalIsOpen: false});

  const openModal = () => {
    setModal({modalIsOpen: true});
  };

  const closeModal = () => {
    setModal({modalIsOpen: false});
  };

  const playButton = (id) => {
    console.log(id);
  };


  return (
      <div className='eachSong'>
        {fileMeta.title} - {fileMeta.artist} <a href={url+file.filename}>download</a>

        <Button variant="outlined" size="small" color="primary" onClick={openModal}>Play</Button>
        <Modal isOpen={modal.modalIsOpen}
               onRequestClose={closeModal}>
          <p>Id:{file.file_id}    </p>
          <p>Filename:   {file.filename}    </p>
          <p> Artist: </p>
          <p> Title: </p>
          <p>Duration in sec: </p>

          <ReactAudioPlayer controls={true} src={url+file.filename}/></Modal>

      </div>
  )
};

export default ListFile;