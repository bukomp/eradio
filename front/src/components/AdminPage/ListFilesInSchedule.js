import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import Modal from 'react-modal';
import ReactAudioPlayer from 'react-audio-player';

const url ='http://media.mw.metropolia.fi/wbma/uploads/';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const ListFilesInSchedule = ({file}) => {
  const fileHour = new Date(file.time).getHours();
  const fileMinutes = new Date(file.time).getMinutes();

  const [modal, setModal] = useState({modalIsOpen: false});

  const openModal = () => {
    setModal({modalIsOpen: true});
  };

  const closeModal = () => {
    setModal({modalIsOpen: false});
  };

  return (
      <div className='eachSong'>
        <strong>{fileHour}:{fileMinutes}</strong> {file.title} - {file.artist} <a href={url+file.filename}>download</a>
        <Button variant="outlined" size="small" color="primary" onClick={openModal}>Play</Button>
        <Modal isOpen={modal.modalIsOpen} style={customStyles}>
          <Button onClick={closeModal} style={{marginLeft: 600}}>close</Button>
          <p>Id: {file.id}    </p>
          <p>Artist: {file.artist}  </p>
          <p>Title: {file.title} </p>
          <p>Duration in sec: {file.duration/1000}</p>

          <ReactAudioPlayer controls={true} src={url+file.filename}/>
        </Modal>

      </div>
  )
};

export default ListFilesInSchedule;


/*
artist: "Sting"
duration: 118230
filename: "5425508c187ffad52be2758eeff75431.mp3"
id: 1982
time: 1557313449894
title: "Yes"
*/
