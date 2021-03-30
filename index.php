<?php
require_once("utils/_init.php");

require_once("partials/header.php");
?>


    <img src="king.png" alt="Magyar népmesés király" width="200" height="300"> 
    <h2>Küldöncök</h2>
    <br>
    Hol volt, hol nem volt, volt egyszer egy király. Ez a király olyan hatalmas volt, hogy ha eltüsszentette magát, az egész ország népének rá kellett mondani: adj’ Isten egészségére! Hogyha náthás volt, nem is lehetett más szót hallani az országban, mint: “Adj’ Isten egészségére!” 

    A csillagszemű juhász még gondolat sem volt szülei fejében, mikor Nekeresdországban már az volt a szokás, hogy ha a király tüsszent, akkor mindenkinek jó egészséget kell kívánnia neki. Az egyszerű elv megvalósítása azonban komoly fejtörést okozott. A kivitelezésével Furfangot, a főkamarást bízták meg. Főtt is a főkamarás feje, mert úgy kellett a küldöncök útvonalát megtervezni, hogy a kijelölt várakból a küldöncök elindulva, egymás útját nem keresztezve, nem érintve, az egész birodalmat bejárva jussanak el a kijelölt célba. Segíts Furfangnak a küldöncök útvonalának megtervezésében!

    Nekeresdország egy négyzetráccsal ábrázolható. Van benne pár kitüntetett cella, ahonnan a küldöncök indulnak és ahova érkeznek. Egy-egy küldönc útvonalának végpontjait ugyanaz a szám jelzi. A küldönc bármelyik végpontból elindulhat. A küldöncök útvonalait az alábbi szabályok betartásával kell megtervezni:<br>
    <ul>
        <li>Az azonos számokat folytonos útvonallal kell összekötni.</li>
        <li>Az útvonalak csak vízszintesen és függőlegesen haladhatnak úgy, hogy a mezők közepét érinteniük kell, de ott 90 fokkal elfordulhatnak. </li>
        <li>Az útvonalak nem keresztezhetik egymást és nem ágazhatnak el.</li>
        <li>Az útvonalak számozott mezőkön nem mehetnek keresztül, viszont az összes fehér mezőn útvonalnak kell áthaladnia.</li>
    </ul>
    <br>Nehézségi szint (1/2/3):<br>
    <input type="number" id="szint" value="1" max="3" min="1">
   
    <button>Új játék</button>
    <button id="save">Mentés</button>
    <button id="load">Betöltés</button>
    <table oncontextmenu="return false;"><tbody></tbody></table>
    <script src="js/script.js"></script>
    
    
<?php 
    require_once("partials/footer.php");
?>