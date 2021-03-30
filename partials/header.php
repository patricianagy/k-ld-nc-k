<!doctype html>

<head>
  <meta charset="utf-8">
  <title>Küldöncök</title>
  
  <link rel="stylesheet" href="style/style.css" type="text/css">
</head>

<body>
  <nav style="padding: 10px;">
  <strong><a href="index.php">Főoldal</a></strong>

    <?php if (isset($_SESSION["user"])): ?>
      <strong><a href="palyas.php">Játék</a></strong>
      <strong>
        <a href="logout.php">
          Kijelentkezés (<?= $_SESSION["user"]["fullname"] ?>)
        </a>
      </strong>
      <?php if(authorize("admin")): ?>
      <strong><a href="new.php"> Új pálya hozzáadása </a></strong> 
      <?php endif ?>
    <?php else: ?>
      <strong><a href="login.php">Bejelentkezés</a></strong>
      <strong><a href="signup.php">Regisztráció</a></strong>
    <?php endif; ?>

    
  </nav>
  <main>