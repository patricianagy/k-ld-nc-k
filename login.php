<?php
require_once("utils/_init.php");
if (verify_post("email", "password")) {
  $email = trim($_POST["email"]);
  $password = $_POST["password"];
  $users = $user_storage->query(function ($user) use ($email, $password) {
    return $user["email"] === $email && password_verify($password, $user["password"]);
  });
  $user = array_shift($users);
  if ($user === NULL) {

    $errors[] = "Helytelen felhasználónév vagy jelszó";
  }
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
  if (empty($errors)) {
    $_SESSION["user"] = $user;
    redirect("palyas.php");
  }
}
?>

<?php require_once("partials/header.php"); ?>

<form action="login.php" method="post">
  <label for="email">E-mail</label><br>
  <input type="email" name="email" id="email"><br>
  <label for="password">Jelszó</label><br>
  <input type="password" name="password" id="password"><br>
  <button type="submit">Bejelentkezés</button>
</form>

<?php require_once("partials/footer.php"); ?>