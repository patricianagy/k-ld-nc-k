<?php


require_once("utils/_init.php");
$palyak=$palyak_storage->findAll();
$mentett=$mentett_storage->findAll();
$juzerek=$user_storage->findAll();
if(verify_post("nev")){
    $nev=$_POST["nev"];
    foreach($palyak as $index => $palya){
        if($palya["nev"]===$nev){
            $palyak_storage->delete($index);
            $palyak_storage->save();
        break;
    }
}

$b=TRUE;
while($b){
    $b=FALSE;
    $mentett=$mentett_storage->findAll();
    foreach($mentett as $index => $m){
        if($m["palya"]===$nev){
            $mentett_storage->delete($index);
            $mentett_storage->save();
            $b=TRUE;
        break;
    }
}
}
foreach($juzerek as $index => $juzer){
    foreach($juzer["kesz"] as $i => $kesz){
        if($kesz===$nev){
            unset($juzer["kesz"][$i]);
            if($_SESSION["user"]["email"]===$juzer["email"]){
                unset($_SESSION["user"]["kesz"][$i]);
            }
        }
    }
    $user_storage->update($index,$juzer);
}
}

printf(json_encode("asd"));
?>