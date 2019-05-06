import React, {useState, useEffect} from 'react';
import '../css/back.css'
import ListFiles from './AdminPage/ListFiles';
import ListSchedules from './AdminPage/ListSchedules';
import '../misc/radioApi'
import {getFiles} from '../misc/radioApi';
import {downloadPlaylist} from '../misc/playlistApi';


const AdminPage = () => {
  const [files, setFiles] = useState({});
  const [schedule, setSchedule] = useState({});

  useEffect(() => {getFiles().then(response => setFiles(response.data))}, []);
  useEffect(() => {downloadPlaylist().then(response =>setSchedule(response.data))},[]);

  return (
      <div className='interface'>
        <ListFiles files={files}/>
        <ListSchedules files={schedule}/>
      </div>
    );
};

export default AdminPage;