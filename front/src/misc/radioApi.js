import newFetch from 'axios';
const url = 'http://lira.fi/school/webradio/back/main.php/';

export const uploadFile = (data) => {
  return fetch(url+'upload/', {
    method:"POST",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: data
  }).then(response => response.json())
};

export const editFile = (id, data) => {
  return fetch(url+"edit/"+id, {
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
};

export const deleteFile = (id) => {
  return fetch(url+"delete/"+id).then(response => response.json())
};


export const getAdmins = (id) => {
  return fetch(url+"login",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"id":id})
  }).then(res => res.json())
};

export const getFiles = () => {
  return newFetch.get(url+'files');
};
