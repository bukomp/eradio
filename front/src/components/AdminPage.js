import React, {useState, useEffect} from 'react';
import '../css/back.css'
import ListFiles from './AdminPage/ListFiles';
import ListSchedules from './AdminPage/ListSchedules';
import '../misc/radioApi'
import {getFiles} from '../misc/radioApi';


const AdminPage = () => {
  const [files, setFiles] = useState({});
  useEffect(() => {getFiles().then(response => setFiles(response.data))}, []);
  return (
      <div className='interface'>
        <ListFiles files={files}/>
        <ListSchedules/>
      </div>
    );
};

export default AdminPage;