<?php


header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

function download(){
    $playlistFile = fopen("playlist.json","r");
    $playlist = fread($playlistFile, filesize("playlist.json"));
    $playlist = json_decode($playlist,true);
    fclose($playlistFile);
    $tempArr = ["data" => []];

    foreach ($playlist["data"] as $g){
        $uri = "http://media.mw.metropolia.fi/wbma";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $uri."/media/".$g["id"]);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec ($ch);
        curl_close ($ch);
        $result = json_decode($result, true);
        $metaData = json_decode($result["title"], true);
        $g["filename"] = $result["filename"];
        $g["title"] = $metaData["title"];
        $g["artist"] = $metaData["artist"];
        $g["duration"] = $metaData["duration"];
        array_push($tempArr["data"], $g);
    }
    $tempArr = json_encode($tempArr);
    return $tempArr;
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
    default:
        echo '<h1>URL should look like this: http://lira.fi/school/webradio/back/playlist.php/"any from below here" <br><br>download<br>upload</h1>';
        break;
}

//(new Date().getTime())+" / "+(new Date().getTime()+118000)+" / "+(new Date().getTime()+6000+118000)