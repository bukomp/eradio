<?php
/**
 * Created by PhpStorm.
 * User: Edvard Shalaev
 * Date: 24/04/2019
 * Time: 10.56
 */

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$uri = "http://media.mw.metropolia.fi/wbma";


function upload($data, $file, $uri, $token){

    $info = pathinfo($file['file']['name']);
    $ext = $info['extension']; // get the extension of the file
    $newName = $data['title'].".".$ext;
    $target = 'tempFile/'.$newName;
    move_uploaded_file( $file['file']['tmp_name'], $target);

    $cFile = curl_file_create($target,mime_content_type($target));


    $post = array('title'=>$data['title'], 'description'=>$data['description'], 'file'=> $cFile);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_URL,$uri."/media");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type:multipart/form-data',
        'Access-Control-Allow-Origin:*',
        'x-access-token:'.$token
    ]);

    $result = curl_exec ($ch);
    curl_close ($ch);


    unlink($target);


    return $result;
}

function edit($data, $uri, $id, $token){
    $data = http_build_query($data);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $uri."/media/".$id);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'x-access-token: '.$token,
        'Access-Control-Allow-Origin:*',
        'Content-Type: application/x-www-form-urlencoded'
    ]);
    $result = curl_exec ($ch);
    $error = curl_error($ch);
    curl_close ($ch);
    return $result.$error;
}

function songDelete($uri, $id, $token){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $uri."/media/".$id);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Access-Control-Allow-Origin:*',
        'x-access-token: '.$token
    ]);
    $result = curl_exec ($ch);
    curl_close ($ch);
    return $result;
}

function checkAdmin($id){
    $isAdmin = null;
    $adminsFile = fopen("admins","r");
    $admins = fread($adminsFile, filesize("admins"));
    $admins = json_decode($admins);
    fclose($adminsFile);
    foreach ($admins as $u){
        if($u == $id){
            $isAdmin = true;
            break;
        } else {
            $isAdmin = false;
        }
    }
    return json_encode($isAdmin);
}

function getFiles($uri){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $uri."/media/user/1103");
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec ($ch);
    curl_close ($ch);
    return $result;
}

$adminData = [
    "username" => "webradio",
    "password" => "webRadio2019!"
];

$myJSON = json_encode($adminData);
$ch = curl_init();
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_URL, $uri."/login");
curl_setopt($ch, CURLOPT_POSTFIELDS, $myJSON);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Access-Control-Allow-Origin:*',
    'Content-Type: application/json'
]);
$result = curl_exec ($ch);
$result = json_decode($result);
curl_close ($ch);


$uriSegments = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
switch($uriSegments[5]){
    case "upload":
        echo upload($_POST, $_FILES, $uri, $result->token);
        break;
    case "edit":
        echo edit($_POST, $uri, $uriSegments[6], $result->token);
        break;
    case "delete":
        echo songDelete($uri, $uriSegments[6], $result->token);
        break;
    case "login":
        echo checkAdmin($_POST['id']);
        break;
    case "files":
        echo getFiles($uri);
        break;
    default:
        echo '<h1>URL should look like this: http://lira.fi/school/webradio/back/main.php/"any from below here" <br><br>upload<br>edit/"id"<br>delete/"id"</h1>';
        break;
}


