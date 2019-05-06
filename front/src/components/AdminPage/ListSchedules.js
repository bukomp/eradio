import React from 'react';
import {listEachFileInPlaylist} from '../../misc/listEachFile';
import {getFileInfo} from '../../misc/userApi';



const ListSchedules = ({files}) => {
  const x= getFileInfo(1988).then(e =>console.log(JSON.parse(e.data.title).title));

  return (
      <div className='listSchedules'>
        {files.length && listEachFileInPlaylist(files)}
      </div>
  )
};

export default ListSchedules;