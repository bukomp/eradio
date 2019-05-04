
function downloadPlaylist() {
  return fetch('http://lira.fi/school/webradio/back/playlist.php/download/').then(res => res.json());
}

function uploadPlaylist(data) {

}

function songPlayed(){
  return fetch('http://lira.fi/school/webradio/back/playlist.php/played/').then(res => res.json());
}

export {downloadPlaylist, songPlayed};