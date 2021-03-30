<?php

require_once("utils/_init.php");


$user_email=$_SESSION["user"]["email"];
$azon=$_POST["azonosito"];
$palya=$_POST["palya"];
$kell=NULL;
$saves = $mentett_storage->findAll();
foreach($saves as $index => $mentett){
    if($mentett["user"]===$user_email && $mentett["azonosito"]=== $azon && $mentett["palya"]===$palya){
        $kell=$mentett;
    break;
    }
}

printf(json_encode($kell["szinecskek"].":".$kell["meg_van"]));


?>