import newFetch from 'axios';
const url = 'http://media.mw.metropolia.fi/wbma/';

export const addFavourite = (token, songId) => {
  const body = {'file_id':songId};
  const headers = {headers: {'x-access-token': token}};
  return newFetch.post(url+'favourites', body, headers);
};

export const removeFavourite = (token, songId) => {
  const headers = {headers:{'x-access-token':token}};
  return newFetch.delete(url+'favourites/file/'+songId,headers);
};

export const getFavouriteList = (token) => {
  const headers = {headers: {'x-access-token': token}};
  return newFetch.get(url+'favourites', headers);
};

export const getFileInfo = (songId) => {
  return newFetch.get(url+'/media/'+songId);
};

/*axios.get('https://example.com/getSomething', {
  headers: {
    Authorization: 'Bearer ' + token //the token is a variable which holds the token
  }
})*/

/*
axios.post('https://example.com/postSomething', {
      email: varEmail, //varEmail is a variable which holds the email
      password: varPassword
    },
    {
      headers: {Authorization: 'Bearer ' + varToken}
    })*/
