let clicked=false;
let x,y;
let value;
let table,trk,tdk;
let color;
let used= [];
let ready=[];

function change(){
    for(let i=0; i<=colors;i++){
            ready[i]=false;
        }
    initTable();
    changeColor();
}


function initTable(){
 tdk=document.querySelectorAll("td");
    let i=0;
    let j=0;
    for(const td of tdk){
        td.dataset.x=i;
        td.dataset.y=j;
        td.dataset.color="";
        td.addEventListener("mouseover",hover);
        td.addEventListener("mousedown", () => {
            if(event.button===0 && event.target.innerText!==""){
                if(ready[parseInt(event.target.innerText)-1]===false){
                clicked=true; 
                x=event.target.dataset.x;
                y=event.target.dataset.y;
                value=event.target.innerText;
                color=event.target.dataset.color;
                }
            }else if(event.button===2){
                color=event.target.dataset.color;
                clicked=false; 
                badPosition(event);
                win(event);
                used= [];
            }
        });
        td.addEventListener("mouseup",() => {
            if((event.button===0&&clicked)||event.button===2){
            clicked=false; 
            badPosition(event);
            win(event);
            used= [];
            color="";
            }
        });
        j++;
        if(j==meret){
            j=0;
            i++;
        }
        
    }
}






function changeColor(){
    for(const td of tdk){
        if(td.innerText==="1") {td.dataset.color="#3399ff";td.style.backgroundColor="#3399ff"}
        if(td.innerText==="2"){ td.dataset.color="#61f226";td.style.backgroundColor="#61f226"}
        if(td.innerText==="3"){ td.dataset.color="#d926f2";td.style.backgroundColor="#d926f2"}
        if(td.innerText==="4"){ td.dataset.color="#f22639";td.style.backgroundColor="#f22639"}
        if(td.innerText==="5"){ td.dataset.color="#3e40cd";td.style.backgroundColor="#3e40cd"}
        if(td.innerText==="6"){ td.dataset.color="#c70039";td.style.backgroundColor="#c70039"}
        if(td.innerText==="7"){ td.dataset.color="#48c9b0";td.style.backgroundColor="#48c9b0"}
        if(td.innerText==="8"){ td.dataset.color="#097518";td.style.backgroundColor="#097518"}
        if(td.innerText==="9"){ td.dataset.color="#88557b";td.style.backgroundColor="#88557b"}
        if(td.innerText==="10"){ td.dataset.color="#ea6e6e";td.style.backgroundColor="#ea6e6e"}
        if(td.innerText==="11"){ td.dataset.color="#ff5733";td.style.backgroundColor="#ff5733"}
    }
}





function hover(event){
    if(clicked){
        if(ready[parseInt(value)-1]){
            if(event.target===used[used.length-1]){
                ready[parseInt(value)-1]=false;
            }else{
                badPosition(event);
            }
        }else{
            if(event.target.innerText === "" && event.target.dataset.color === ""){
                const targetX = parseInt(event.target.dataset.x);
                const targetY = parseInt(event.target.dataset.y);
                const relatedTargetX = parseInt(event.relatedTarget.dataset.x);
                const relatedTargetY = parseInt(event.relatedTarget.dataset.y);
                if(targetX  ===  relatedTargetX + 1 && targetY  ===  relatedTargetY ){
                    switchNext(event);
                }else if(targetX  ===  relatedTargetX - 1 && targetY  ===  relatedTargetY){
                    switchNext(event);
                }else if(targetY  ===  relatedTargetY + 1 && targetX  ===  relatedTargetX){
                    switchNext(event);
                }else if(targetY  ===  relatedTargetY -1 && targetX  ===  relatedTargetX){
                    switchNext(event);
                }
            }
            if(event.target === used[used.length-2]){
                used[used.length-1].style.backgroundColor="";
                used[used.length-1].dataset.color="";
                used.length=used.length-1
            }else if (event.target !== used[used.length-1]){
                badPosition(event);  
            }
        }
    }
}

function switchNext(event){
    event.target.style.backgroundColor=event.relatedTarget.dataset.color;
    event.target.dataset.color=event.relatedTarget.dataset.color;
    used.push(event.target);
}


function badPosition(event){
    if(event.target.innerText!==value||(event.target.innerText===value&&(event.target.dataset.x==x && event.target.dataset.y==y))||
    event.button===2
    ){
        tdk=document.querySelectorAll("td");
        for(const td of tdk){
            if(td.innerText==="" && td.dataset.color===color){
                td.dataset.color="";
                td.style.backgroundColor="";
            }
            if(td.innerText!==""){
                ready[parseInt(td.innerText)-1]=false;
            }
        }
        x=-1;
        y=-1;
        color="";
        value="";
        clicked=false;
    }else{
        ready[parseInt(value)-1]=true;
    }
}

async function win(event){
    badPosition(event);
    tdk=document.querySelectorAll("td");
    let end=true;
    for(const td of tdk){
        if(td.dataset.color==""){end=false;}
    }
    if(end===true){
        alert("Teljesítetted a küldetést!");
        const fd = new FormData();
        fd.set("nev",neve);
        await fetch("ready.php",{
            method:"POST",
            body: fd
        });
        change();
    }
}



function deleteWhenSave(){
    tdk=document.querySelectorAll("td");
    for(const td of tdk){
        if(td.innerText==="" && td.dataset.color===color){
            td.dataset.color="";
            td.style.backgroundColor="";
        }
    }
    color="";
}

async function saveByTime(){
    deleteWhenSave();
    let colours=[];
    let i=0;
    tdk=document.querySelectorAll("td");
    for(const td of tdk){
        colours[i]=td.dataset.color;
        i++;
    }
    const fd = new FormData;
    fd.set("nev",neve);
    fd.set("colors",colours);
    fd.set("meg_van",ready);
    const response=await fetch("saved.php",{
        method:"POST",
        body: fd
    });

    let time=await response.json();

    document.getElementById("uj").innerHTML += '<button id="load">'+time+'</button>';
}



async function loadByTime(e){
    const fd = new FormData;
    let idopont=e.target.innerText;
    fd.set("azonosito",idopont);
    fd.set("palya",neve);
    const response=await fetch("load.php",{
        method:"POST",
        body: fd
    });
    if(response.ok){
        let map=await response.json();
        console.log(map);
        let str = map.split(":");
        let c = str[0];
        let m = str[1];
        let colour = c.split(",");
        m=m.split(",");
        let i=0;
        tdk=document.querySelectorAll("td");
        for(const td of tdk){
            td.dataset.color=colour[i];
            td.style.backgroundColor=td.dataset.color;
            i++;
        }
        for (let index = 0; index < m.length; index++) {
            const element = m[index];
            if(element==="false"){
                ready[index]=false;
            }else{
                ready[index]=true;
            }
        }

    }

}


let loads=document.querySelectorAll("#load");
for (let index = 0; index < loads.length; index++) {
    const element = loads[index];
    element.addEventListener("click",loadByTime);
}
const savebtn = document.querySelector("#save");
savebtn.addEventListener("click", saveByTime);

change();