<?php 
require_once("utils/_init.php");

if(!is_logged_in()){
    redirect("index.php");
}

$palyak=$palyak_storage->findAll();

require_once("partials/header.php");
?>

<?php foreach($palyak as $key => $palya):?>
<article>
<h2>
    <a href="jatek.php?nev=<?=$key?>">
        <?= $palya["nev"]?>
    </a>
</h2>
<ul>
    <li><?= $palya["oldottak"]?> fő oldotta meg </li>
    <li>Nehézség: <?= $palya["nehezseg"]?></li>
    <li><?php 
        $van=false;
        foreach($_SESSION["user"]["kesz"] as $kpalya ){
        if($kpalya===$palya["nev"]){
            $van=true;
            
            }
        }
        if(!$van){
            echo("Még nem oldottad meg ezt a pályát!");
        }else{
            echo("Már megoldottad ezt a pályát!");
        }
        ?>
        </li>
    <?php if(authorize("admin")): ?>
    <li>
    <button id="delete" value="<?= $palya["nev"] ?>">Töröl</button>
    </li>
    <?php endif ?>
        
</ul>
</article>
<?php endforeach;?>
<?php
require_once("partials/footer.php");
?>


<script>
let buttonz=document.querySelectorAll("button#delete");
async function torol(e){
  let nev=e.target.value;
  const formdata = new FormData();
    formdata.set("nev",nev);    
    const response=await fetch("delete.php",{
        method:"POST",
        body:formdata
    });
    let valami=await response.json();
    console.log(valami);
    if(response.ok){
        let art=e.target.parentNode.parentNode.parentNode;
        art.parentNode.removeChild(art);
        let buttonz=document.querySelectorAll("button#delete");
        for(const button of buttonz){
            button.addEventListener("click",torol);
        };
    }
    
}
for(const button of buttonz){
  button.addEventListener("click",torol);
}



</script>