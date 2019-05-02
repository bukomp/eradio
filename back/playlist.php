<?php

$uriSegments = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
switch($uriSegments[5]){
    case "upload":
        break;
    case "download":
        break;
    default:
        echo '<h1>URL should look like this: http://lira.fi/school/webradio/back/main.php/"any from below here" <br><br>upload<br>edit/"id"<br>delete/"id"</h1>';
        break;
}