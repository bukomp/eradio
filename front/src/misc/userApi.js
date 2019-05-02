
function addFavourite(token, songId) {
  return fetch("http://media.mw.metropolia.fi/wbma/favourites",{
    method:"POST",
    headers:{
      'x-access-token':token,
    },
    body: JSON.stringify({"file_id":songId})
  }).then(res => res.json())
}

function removeFavourite(token, songId) {
  return fetch("http://media.mw.metropolia.fi/wbma/favourites/file/"+songId,{
    method:"DELETE",
    headers:{
      'x-access-token':token,
    },
    body: JSON.stringify({"file_id":songId})
  }).then(res => res.json())
}

function getFavouriteList(token) {
  return fetch("http://media.mw.metropolia.fi/wbma/favourites",{
    method:"GET",
    headers:{
      'x-access-token':token,
    }
  }).then(res => res.json())
}