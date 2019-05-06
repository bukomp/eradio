import ListFile from '../components/AdminPage/ListFile';
import React from 'react';
import {getFileInfo} from './userApi';

export const listEachFileInDB = (inFiles) => {
  return inFiles
  .filter(file => file.media_type==="audio")
  .map(file => <ListFile file={file} key={file.file_id}/>)
};

export const listEachFileInPlaylist = (inFiles) => {
  return inFiles
  .map (file => getFileInfo(1988))
  .map(file => <ListFile file={file} key={file.id}/>)
};