import React from 'react';
import {listEachFileInPlaylist} from '../../misc/listEachFile';


const ListSchedules = ({files}) => {

  return (
      <div className='listSchedules'>
        {files.length && listEachFileInPlaylist(files)}
      </div>
  )
};

export default ListSchedules;