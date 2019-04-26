<?php
/**
 * Created by PhpStorm.
 * User: Edvard Shalaev
 * Date: 24/04/2019
 * Time: 10.56
 */

$uri = "http://media.mw.metropolia.fi/wbma";

function upload($data, $uri, $token){
    var_dump($data['file']);
/*
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $uri."/media");
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        //'Content-Type: application/json',
        'x-access-token:'.$token
    ]);
    $result = curl_exec ($ch);
    curl_close ($ch);
    return $result;*/
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
        'x-access-token:'.$token
    ]);
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
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$result = curl_exec ($ch);
$result = json_decode($result);
curl_close ($ch);


$uriSegments = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
switch($uriSegments[5]){
    case "upload":
        echo upload($_POST, $uri, $result->token);
        break;
    case "edit":
        echo edit($_POST, $uri, $uriSegments[6], $result->token);
        break;
    case "delete":
        echo songDelete($uri, $uriSegments[6], $result->token);
        break;
}


