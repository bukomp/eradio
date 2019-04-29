
const uploadFile = (data) => {
  return fetch("http://lira.fi/school/webradio/back/main.php/upload/", {
    method:"POST",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: data
  }).then(response => response.json())
};

const editFile = (id, data) => {
  return fetch("http://lira.fi/school/webradio/back/main.php/edit/"+id, {
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
};

const deleteFile = (id) => {
  return fetch("http://lira.fi/school/webradio/back/main.php/delete/"+id).then(response => response.json())
};


const getAdmins = (id) => {
  return fetch("http://lira.fi/school/webradio/back/main.php/login",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"id":id})
  }).then(res => res.json())
};