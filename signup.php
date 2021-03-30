<?php
require_once("utils/_init.php");
if (verify_post("email", "password", "fullname")) {
  $email = trim($_POST["email"]);
  $password = $_POST["password"];
  $fullname = trim($_POST["fullname"]);
  $users = $user_storage->query(function ($user) use ($email) {
    return $user["email"] === $email;
  });

  $kukac=false;
  $pont=false;
  $helpemail= str_split($email);
  for($i=0; $i<strlen($email); $i++ ){
    if($helpemail[$i]==='@'){
      $kukac=true;
    }
    if($kukac){
      if($helpemail[$i]==='.'){
        $pont=true;
      }
    }
  }
  if(!$kukac || !$pont){
    $errors[]="Helytelen e-mail cím";
  }
  if (!empty($users)) {

    $errors[] = "Már regisztráltak ezzel az e-mail címmel";
  }
  if ($password === "") {
    $errors[] = "Kötelező jelszót megadni";
  }
  if ($fullname === "") {
    $errors[] = "Teljes név kell";
  }
  if (empty($errors)) {
    $user = [
      "email" => $email,
      "password" => password_hash($password, PASSWORD_DEFAULT),
      "fullname" => $fullname,
      "role" => "jatekos",
      "kesz" => []
    ];
    $user_storage->add($user);
    redirect("login.php");
  }
}
?>

<?php require_once("partials/header.php"); ?>

<form action="signup.php" method="post">
  <label for="email">E-mail</label><br>
  <input type="email" name="email" id="email" placeholder="küldönc@citromail.hu"><br>
  <label for="password">Jelszó</label><br>
  <input type="password" name="password" id="password"><br>
  <label for="fullname">Teljes név</label><br>
  <input type="text" name="fullname" id="fullname"><br>
  <button type="submit">Regisztálok</button>
</form>

<?php require_once("partials/footer.php"); ?>