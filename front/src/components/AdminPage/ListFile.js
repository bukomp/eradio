import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import ReactAudioPlayer from 'react-audio-player';
import Modal from 'react-modal';

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

const ListFile = ({file}) => {

  const [modal, setModal] = useState({modalIsOpen: false});
  const fileMeta = JSON.parse(file.title);


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
        <Modal isOpen={modal.modalIsOpen} style={customStyles}>
          <Button onClick={closeModal} style={{marginLeft: 600}}>close</Button>
          <p>Id:{file.file_id}    </p>
          <p> Artist: {JSON.parse(file.title).artist}  </p>
          <p> Title:{JSON.parse(file.title).title} </p>
          <p>Duration in sec: {JSON.parse(file.title).duration/1000}</p>

          <ReactAudioPlayer controls={true} src={url+file.filename}/>
         </Modal>

      </div>
  )
};

export default ListFile;