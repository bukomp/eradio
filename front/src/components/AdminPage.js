import React from 'react';
import '../css/back.css'
import ListFiles from './AdminPage/ListFiles';
import ListSchedules from './AdminPage/ListSchedules';


const AdminPage = (props) => {
  return (
      <div id='interface'>
        <ListFiles/>
        <ListSchedules/>
      </div>
  )
};

export default AdminPage;