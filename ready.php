<?php 

require_once("utils/_init.php");

$palyak=$palyak_storage->findAll();
$juzersz=$user_storage->findAll();

$nev=$_POST["nev"];



foreach($palyak as $index => $palya){
    if($palya["nev"]===$nev){
        $palya["oldottak"]=$palya["oldottak"]+1;
        $palyak_storage->update($index,$palya);
    break;
    }
}

foreach($juzersz as $index => $juzer){
    if($_SESSION["user"]["email"]===$juzer["email"]){
        $juzer["kesz"][]=$nev;
        $_SESSION["user"]["kesz"][]=$nev;
        $user_storage->update($index,$juzer);
    break;
    }
}

/////

?>