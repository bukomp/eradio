import React from 'react';
import {listEachFileInDB} from '../../misc/listEachFile';

const ListFiles = ({files}) => {

  return (
      <div className='listFiles'>
        {files.length && listEachFileInDB(files)}
      </div>
  )
};


export default ListFiles;