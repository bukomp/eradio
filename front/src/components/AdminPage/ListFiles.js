import React from 'react';
import ListFile from './ListFile';

const ListFiles = ({files}) => {

  const listEachFileInDB = (inFiles) => {
    return inFiles
    .filter(file => file.media_type==="audio")
    .map(file => <ListFile file={file} key={file.file_id}/>)
  };

  return (
      <div className='listFiles'>
        {files.length && listEachFileInDB(files)}
      </div>
  )
};


export default ListFiles;