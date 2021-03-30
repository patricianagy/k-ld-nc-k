<?php
require_once("utils/_init.php");

if(!is_logged_in()){
    redirect("index.php");
}

if(!verify_get("nev")){
    redirect("palyas.php");
}

$sorszam=$_GET["nev"];
$palya=$palyak_storage->find($sorszam);
$max =0;
foreach($palya["mezok"] as $mezo){
    if ($mezo > $max){
        $max=$mezo;
    }
}

$mentettek=$mentett_storage->findAll();

require_once("partials/header.php");
?>

<table oncontextmenu="return false;">
    <tbody>
        <?php foreach ($palya["mezok"] as $m => $mezo):?>
        <?php if($m!=0 && $m%$palya["meret"]===0):?>
        </tr>    
        <?php endif ?>
        <td>
            <?php if($mezo!=0){
                echo($mezo);
            }
            ?>
        </td>
        <?php endforeach ?>
    </tbody>
</table>

<button id="save">Mentés</button>

<?php foreach($mentettek as $index => $saved): ?>
<div id="uj">
<?php if($saved["user"]=== $_SESSION["user"]["email"] && $palya["nev"]===$saved["palya"]): ?>
<button id="load"><?=$saved["azonosito"] ?></button>
<?php endif ?>
<?php endforeach ?>
</div>
<?php 
    require_once("partials/footer.php");
?>

<script type="text/javascript">
    var meret = <?php echo $palya["meret"]?>;
    var neve = "<?php echo $palya["nev"]?>";
    var szinecskek = <?php echo $max?>;
</script>
<script type="module" src="js/jatek.js"></script>
