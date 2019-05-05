import React from 'react';
import ListFile from './ListFile';

const ListFiles = ({files}) => {
  //console.log(files);

  const listEachFile = (inFiles) => {
    return inFiles
    .filter(file => file.media_type==="audio")
    .map(file => <ListFile file={file} key={file.file_id}/>
    )};

  return (
      <div id='listFiles'>
        {files.length && listEachFile(files)}
      </div>
  )
};


export default ListFiles;