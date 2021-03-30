const easy = [
    [0,0,0,2,0],
    [0,1,0,0,0],
    [0,0,2,0,0],
    [3,0,0,3,0],
    [1,0,0,0,0],
  ]

  const medium = [
    [2,0,0,9,0,0,0,5,0],
    [1,0,0,8,0,11,0,0,5],
    [0,2,0,0,6,0,7,0,0],
    [0,0,0,0,0,11,0,10,0],
    [0,0,0,7,0,0,0,0,0],
    [0,0,0,4,0,0,0,0,0],
    [0,0,0,0,0,0,0,3,6],
    [0,9,0,4,8,0,0,0,0],
    [0,1,0,0,0,0,0,10,3],
]

const hard = [
    [1,0,0,0,3,0,5,0,2],
    [0,0,0,0,0,0,8,5,0],
    [7,4,0,6,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,2],
    [0,0,4,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,7,0,0,0,0,3,0,0],
    [0,0,0,6,0,0,0,0,8],
]

let difficulty;
let size;
let clicked=false;
let x,y;
let value;
let table,trk,tdk;
let color;
let used= [];
let ready=[];

function change(){
    const diff=document.querySelector("input")
    if(parseInt(diff.value)  ===  1){
        initGame(easy, 5);
    }else if(parseInt(diff.value)  ===  2){
        initGame(medium, 9);
    }else if(parseInt(diff.value)  ===  3){
        initGame(hard, 9);
    }
    initTable();
    changeColor();
}

function initGame(_diff, _size){
    difficulty=_diff;
    size=_size;
    ready=[];
    for(let i=0; i<_diff.size;i++){
        ready[i]=false;
    }
}


const btn=document.querySelector("button");
btn.addEventListener("click",change);


function initTable(){
    table = document.querySelector("tbody")
    table.innerHTML="";
    for(let i=0;i<size;i++){
        table.innerHTML+="<tr></tr>"
    }
    trk=document.querySelectorAll("tr");
    
    for(const tr of trk) {
        for(let i=0;i<size;i++)
        {
            tr.innerHTML+="<td></td>"
        }
    }
    tdk=document.querySelectorAll("td");
    let i=0;
    let j=0;
    for(const td of tdk){
        td.dataset.x=i;
        td.dataset.y=j;
        td.dataset.color="";
        td.addEventListener("mouseover",hover);
        if(difficulty[i][j]!=0){
            td.innerText=difficulty[i][j];
        }
        td.addEventListener("mousedown", () => {
            if(event.button === 0 && event.target.innerText !== ""){
                if(ready[parseInt(event.target.innerText)-1] === false){
                clicked=true; 
                x=event.target.dataset.x;
                y=event.target.dataset.y;
                value=event.target.innerText;
                color=event.target.dataset.color;
                }
            }else if(event.button === 2){
                color=event.target.dataset.color;
                clicked=false; 
                badPosition(event);
                win(event);
                used= [];
            }
        });
        td.addEventListener("mouseup",() => {
            if((event.button === 0 && clicked) || event.button === 2){
            clicked=false; 
            badPosition(event);
            win(event);
            used= [];
            color="";
            }
        });
        j++;
        if(j==size){
            j=0;
            i++;
        }
    }
}






function changeColor(){
    for(const td of tdk){
        if(td.innerText === "1") {td.dataset.color="#3399ff";td.style.backgroundColor="#3399ff"}
        if(td.innerText === "2"){ td.dataset.color="#61f226";td.style.backgroundColor="#61f226"}
        if(td.innerText === "3"){ td.dataset.color="#d926f2";td.style.backgroundColor="#d926f2"}
        if(td.innerText === "4"){ td.dataset.color="#f22639";td.style.backgroundColor="#f22639"}
        if(td.innerText === "5"){ td.dataset.color="#3e40cd";td.style.backgroundColor="#3e40cd"}
        if(td.innerText === "6"){ td.dataset.color="#c70039";td.style.backgroundColor="#c70039"}
        if(td.innerText === "7"){ td.dataset.color="#48c9b0";td.style.backgroundColor="#48c9b0"}
        if(td.innerText === "8"){ td.dataset.color="#097518";td.style.backgroundColor="#097518"}
        if(td.innerText === "9"){ td.dataset.color="#88557b";td.style.backgroundColor="#88557b"}
        if(td.innerText === "10"){ td.dataset.color="#ea6e6e";td.style.backgroundColor="#ea6e6e"}
        if(td.innerText === "11"){ td.dataset.color="#ff5733";td.style.backgroundColor="#ff5733"}
    }
}





function hover(event){
    if(clicked){
        if(ready[parseInt(value)-1]){
            if(event.target === used[used.length-1]){
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
    if(event.target.innerText !== value || 
        (event.target.innerText === value && 
        (event.target.dataset.x==x && event.target.dataset.y==y)) || 
        event.button === 2){
        tdk=document.querySelectorAll("td");
        for(const td of tdk){
            if(td.innerText === "" && td.dataset.color === color){
                td.dataset.color="";
                td.style.backgroundColor="";
            }
            if(td.innerText !== ""){
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

function win(event){
    badPosition(event);
    tdk=document.querySelectorAll("td");
    let vege=true;
    for(const td of tdk){
        if(td.dataset.color==""){vege=false;}
    }
    if(vege === true){
        alert("Teljesítetted a küldetést!");
        change();
    }
}

function save(){
    deleteWhenSave();
    if(difficulty === easy){
        confirmAndSave("elso");
    }else if(difficulty === medium){
        confirmAndSave("masodik");
    }else if(difficulty === hard){
        confirmAndSave("harmadik");
    }   
}

function confirmAndSave(diff) {
    const msg = localStorage.getItem(diff)? "Biztos felül akarod írni a régi mentést?":"Biztos menteni akarod?";
    if(confirm(msg)){
        let colors=[];
        let i=0;
        tdk=document.querySelectorAll("td");
        for(const td of tdk){
            colors[i]=td.dataset.color;
            i++;
        }
        localStorage.setItem(diffJSON.stringify(colors));
        localStorage.setItem(diff+"t",JSON.stringify(ready));
        }
}

function load(){
    if(difficulty === easy){
        loadByDiff("elso");
    }else if(difficulty === medium){
        loadByDiff("madosik")
    }else if(difficulty === hard){
        loadByDiff("harmadik");
    }
}

function loadByDiff(diff) {
    let colors=JSON.parse(localStorage.getItem(diff));
    let i=0;
    tdk=document.querySelectorAll("td");
    for(const td of tdk){
        td.dataset.color=colors[i];
        td.style.backgroundColor=td.dataset.color;
        i++;
    }
    ready=JSON.parse(localStorage.getItem(diff));
}

function deleteWhenSave(){
    tdk=document.querySelectorAll("td");
    for(const td of tdk){
        if(td.innerText === "" && td.dataset.color === color){
            td.dataset.color="";
            td.style.backgroundColor="";
        }
    }
    color="";
}

const savebtn = document.querySelector("#save");
const loadbtn = document.querySelector("#load");

savebtn.addEventListener("click", save);
loadbtn.addEventListener("click", load);

change();