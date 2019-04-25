<?php
/**
 * Created by PhpStorm.
 * User: Me
 * Date: 25/04/2019
 * Time: 12.08
 */

function register($user){
    $file = "udata/".$user["id"];

    if(file_exists($file)) {
        return false;
    } else {
        $myFile = fopen($file, "w") or die("Unable to open file!");
        $user["admin"] = false;
        $myJSON = json_encode($user);

        fwrite($myFile, $myJSON);
        fclose($myFile);
        return true;
    }
}