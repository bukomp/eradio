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

export const fileCreateRealTime = () => {
  function getDuration(src) {
    return new Promise(function(resolve) {
      const audio = new Audio();
      audio.onloadedmetadata = () => {resolve(audio.duration*1000)};
      audio.src = src;
    });
  }

  fetch("http://media.mw.metropolia.fi/wbma/media/user/1103").then(resp => resp.json()).then(resp => {
    for(let g of resp){
      if(g.media_type === "audio")getDuration("http://media.mw.metropolia.fi/wbma/uploads/"+g.filename).then(res => {
        const title = JSON.parse(g.title);
        title.duration = Math.floor(res);
        const titleU = JSON.stringify(title);
        fetch("http://media.mw.metropolia.fi/wbma/media/"+g.file_id, {
          method:"PUT",
          headers: {      'Content-Type': 'application/json',
            'x-access-token':""
          },
          body:JSON.stringify({"title":titleU})
        }).then(res => res.json())
          .then(res => {console.log(res);})
          .catch(err => console.log(err));
        //console.log(JSON.stringify({"title":titleU}));
      })
    }

  });
};









