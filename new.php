<?php 

require_once("utils/_init.php");
authorize_page("admin");

$palyak=$palyak_storage->findAll();

if(verify_post("nev","nehezseg","szelesseg","magassaga","mezok")){
    $nev=$_POST["nev"];
    $nehez=$_POST["nehezseg"];
    $szelesseg=$_POST["szelesseg"];
    $magas=$_POST["magassaga"];
    $mezok=$_POST["mezok"];

    foreach($palyak as $index => $palya){
        if($palya["nev"]===$nev){
            $errors[]="Már létezik ilyen nevű pálya";
        break;
        }
    }
    if($nev===""){
        $errors[]="Kötelező mező: név";
    }
    if($nehez===""){
        $errors[]="Kötelező mező: nehézség";
    }
    if($szelesseg===""){
        $errors[]="Kötelező mező: szélesség";
    }
    if($magas===""){
        $errors[]="Kötelező mező: magasság";
    }
    if($mezok===""){
        $errors[]="Kötelező mező: pálya elrendezése";
    }


    $string=str_replace(']', '', $mezok);
        $string=str_replace('[', '', $string);
        $string=explode(",",$string);
        array_pop($string);
        $mentett_palya=[];
        foreach ($string as $mmmmezo) {
            $mentett_palya[]=(int)$mmmmezo;
        }

    if(empty($errors)){
        $uj = [
            "nev" => $nev,
            "oldottak" => 0,
            "nehezseg" => $nehez,
            "mezok" => $mentett_palya,
            "meret" => $szelesseg,
            "magassag" => $magas
        ];
        $palyak_storage->add($uj);
    }
    
}
require_once("partials/header.php");
?>

<form method="POST">
    <label for="nev">Pálya neve</label><br>
    <input type="text" name="nev" id="nev"><br>
    <label for="nehezseg">Nehézség</label><br>
    <select  name="nehezseg" id="nehezseg">
        <option value="1">1~könnyű</option>
        <option value="2">2~közepes</option>
        <option value="3">3~nehéz</option>
        <option value="4">4~extra</option>
    </select><br>
    <label for="szelesseg">Pálya szélessége</label><br>
    <input type="number" name="szelesseg" id="szelesseg"><br>
    <label for="magassaga">Pálya magassaga</label><br>
    <input type="number" name="magassaga" id="magassaga"><br>
    <label for="mezok">Pálya elrendezése</label><br>
    <textarea type="text" name="mezok" id="mezok"></textarea><br>
    <button type="submit">Új pálya létrehozása</button>
</form>

<?php require_once("partials/footer.php") ?>