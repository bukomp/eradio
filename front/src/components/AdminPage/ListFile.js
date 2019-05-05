import React from 'react';
const url ='http://media.mw.metropolia.fi/wbma/uploads/';

const ListFile = ({file}) => {
  return (
      <div>{file.filename} <a href={url+file.filename}>download</a></div>
  )
};

export default ListFile;