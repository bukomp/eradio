import React from 'react';

const ListFile = ({file}) => {
  console.log(file);
  return (
      <div>{file.filename}</div>
  )
};

export default ListFile;