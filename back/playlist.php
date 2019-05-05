<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
function download(){
    $playlistFile = fopen("playlist.json","r");
    $playlist = fread($playlistFile, filesize("playlist.json"));
    //$playlist = json_encode($playlist);
    fclose($playlistFile);

    return $playlist;
}

function played(){
    $playlistFile = fopen("playlist.json","r");
    $playlist = fread($playlistFile, filesize("playlist.json"));
    $playlist = json_decode($playlist);
    fclose($playlistFile);

    foreach ($playlist["data"] as $u){
        if($u["played"] == false){
            $u["played"] = true;
            return true;
        }
    }
    return false;
}

$uriSegments = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
switch($uriSegments[5]){
    case "upload":
        break;
    case "download":
        echo download();
        break;
    /*case "played":
        echo played();
        break;*/
    default:
        echo '<h1>URL should look like this: http://lira.fi/school/webradio/back/playlist.php/"any from below here" <br><br>download<br>upload</h1>';
        break;
}

//(new Date().getTime())+" / "+(new Date().getTime()+118000)+" / "+(new Date().getTime()+6000+118000)