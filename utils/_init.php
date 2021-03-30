<?php

$root_dir = __DIR__ . "/../";

session_start();

require_once("${root_dir}/utils/utils.php");
require_once("${root_dir}/utils/storage.php");

$palyak_storage = new JSONStorage("${root_dir}/storage/palyak.json");
$user_storage = new JSONStorage("${root_dir}/storage/users.json");
$mentett_storage = new JSONStorage("${root_dir}/storage/mentett.json");


$errors = [];