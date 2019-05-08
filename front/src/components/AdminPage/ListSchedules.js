import React from 'react';
import ListFilesInSchedule from './ListFilesInSchedule';



const ListSchedules = ({files}) => {
  const listEachFileInPlaylist = (inFiles) => {
    return inFiles
    .map(file => <ListFilesInSchedule file={file} key={file.id}/>);}

  return (
      <div className='listSchedules'>
        {typeof (files.data) ==='object' && listEachFileInPlaylist(files.data)}
      </div>
  )
};

export default ListSchedules;