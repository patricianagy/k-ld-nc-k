<?php

require_once("utils/_init.php");

$nev = $_POST["nev"];
$szinecskek = $_POST["szinecskek"];
$meg_van = $_POST["meg_van"];

$azonosito = date("Y:m:d:h:i:sa");

$mentes=[
    "user" => $_SESSION["user"]["email"],
    "palya" => $nev,
    "szinecskek" => $szinecskek,
    "meg_van" => $meg_van,
    "azonosito" => $azonosito
];

$mentett_storage->add($mentes);

printf(json_encode($azonosito));

?>