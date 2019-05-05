import newFetch from 'axios';
const url = 'http://lira.fi/school/webradio/back/main.php/';

export const downloadPlaylist = () => {
  return newFetch.get(url+'download/');
};

export const uploadPlaylist = (data) => {
};

export const songPlayed = () => {
  return newFetch.get(url+'played/');
};