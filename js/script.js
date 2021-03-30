let konnyu = [
    [0,0,0,2,0],
    [0,1,0,0,0],
    [0,0,2,0,0],
    [3,0,0,3,0],
    [1,0,0,0,0],
  ]

let kozepes = [
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

let nehez = [
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

let szint;
let meret;
let kattintott=false;
let x,y;
let ertek;
let table,trk,tdk;
let szinecske;
let eddigiek= [];
let megvanmar=[];

function valtas(){
    let szam=document.querySelector("input")
    if(parseInt(szam.value)===1){
        szint=konnyu;
        meret=5;
        megvanmar=[];
        for(let i=0; i<3;i++){
            megvanmar[i]=false;
        }
    }else if(parseInt(szam.value)===2){
        szint=kozepes;
        meret=9;
        for(let i=0; i<11;i++){
            megvanmar[i]=false;
        }
    }else if(parseInt(szam.value)===3){
        szint=nehez;
        meret=9;
        for(let i=0; i<8;i++){
            megvanmar[i]=false;
        }
    }
    tabla();
    szinez();
}




let btn=document.querySelector("button");
btn.addEventListener("click",valtas);


function tabla(){
    table = document.querySelector("tbody")
    table.innerHTML="";
    for(let i=0;i<meret;i++){
      table.innerHTML+="<tr></tr>"
    }
 trk=document.querySelectorAll("tr");
    
  for(const tr of trk) {
      for(let i=0;i<meret;i++)
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
    td.addEventListener("mouseover",ramegy);
    if(szint[i][j]!=0){
        td.innerText=szint[i][j];
    }
    td.addEventListener("mousedown", () => {
        if(event.button===0 && event.target.innerText!==""){
            if(megvanmar[parseInt(event.target.innerText)-1]===false){
            kattintott=true; 
            x=event.target.dataset.x;
            y=event.target.dataset.y;
            ertek=event.target.innerText;
            szinecske=event.target.dataset.color;
            }
        }else if(event.button===2){
            szinecske=event.target.dataset.color;
            kattintott=false; 
            roszhelyene(event);
            nyert(event);
            eddigiek= [];
        }
    });
    td.addEventListener("mouseup",() => {
        if((event.button===0&&kattintott)||event.button===2){
        kattintott=false; 
        roszhelyene(event);
        nyert(event);
        eddigiek= [];
        szinecske="";
        }
    });
    j++;
    if(j==meret){
        j=0;
        i++;
    }
    
}
}






function szinez(){
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





function ramegy(event){
    if(kattintott){
        if(megvanmar[parseInt(ertek)-1]){
            if(event.target===eddigiek[eddigiek.length-1]){
                megvanmar[parseInt(ertek)-1]=false;
            }else{
                roszhelyene(event);
            }
        }else{
        if(parseInt(event.target.dataset.x)===parseInt(event.relatedTarget.dataset.x)+1&& 
        parseInt(event.target.dataset.y)===parseInt(event.relatedTarget.dataset.y) && 
        event.target.innerText===""&&event.target.dataset.color===""){
            event.target.style.backgroundColor=event.relatedTarget.dataset.color;
            event.target.dataset.color=event.relatedTarget.dataset.color;
            eddigiek.push(event.target);
        }else if(parseInt(event.target.dataset.x)===parseInt(event.relatedTarget.dataset.x)-1&& parseInt(event.target.dataset.y)===parseInt(event.relatedTarget.dataset.y) &&event.target.innerText===""&&event.target.dataset.color===""){
            event.target.style.backgroundColor=event.relatedTarget.dataset.color;
            event.target.dataset.color=event.relatedTarget.dataset.color;
            eddigiek.push(event.target);
        }else if(parseInt(event.target.dataset.y)===parseInt(event.relatedTarget.dataset.y)+1 && parseInt(event.target.dataset.x)===parseInt(event.relatedTarget.dataset.x) &&event.target.innerText===""&&event.target.dataset.color===""){
            event.target.style.backgroundColor=event.relatedTarget.dataset.color;
            event.target.dataset.color=event.relatedTarget.dataset.color;
            eddigiek.push(event.target);
        }else if(parseInt(event.target.dataset.y)===parseInt(event.relatedTarget.dataset.y)-1 && parseInt(event.target.dataset.x)===parseInt(event.relatedTarget.dataset.x) &&event.target.innerText===""&&event.target.dataset.color===""){
            event.target.style.backgroundColor=event.relatedTarget.dataset.color;
            event.target.dataset.color=event.relatedTarget.dataset.color;
            eddigiek.push(event.target);
        }else if(event.target===eddigiek[eddigiek.length-2]){
            eddigiek[eddigiek.length-1].style.backgroundColor="";
            eddigiek[eddigiek.length-1].dataset.color="";
            eddigiek.length=eddigiek.length-1
        }else if (event.target!==eddigiek[eddigiek.length-1]){
            roszhelyene(event);  
        }
    }
    }
}



function roszhelyene(event){
    if(event.target.innerText!==ertek||(event.target.innerText===ertek&&(event.target.dataset.x==x && event.target.dataset.y==y))||
    event.button===2
    ){
        tdk=document.querySelectorAll("td");
        for(const td of tdk){
            if(td.innerText==="" && td.dataset.color===szinecske){
                td.dataset.color="";
                td.style.backgroundColor="";
            }
            if(td.innerText!==""){
                megvanmar[parseInt(td.innerText)-1]=false;
            }
        }
        x=-1;
        y=-1;
        szinecske="";
        ertek="";
        kattintott=false;
    }else{
        megvanmar[parseInt(ertek)-1]=true;
    }
}

function nyert(event){
    roszhelyene(event);
    tdk=document.querySelectorAll("td");
    let vege=true;
    for(const td of tdk){
        if(td.dataset.color==""){vege=false;}
    }
    if(vege===true){
        alert("Teljesítetted a küldetést!");
        valtas();
    }
}

function save(){
    menteskortorol();
    if(szint===konnyu){
        if(localStorage.getItem("elso")){
            if(confirm("Biztos felül akarod írni a régi mentést?")){
            let szinecskek=[];
            let i=0;
            tdk=document.querySelectorAll("td");
            for(const td of tdk){
                szinecskek[i]=td.dataset.color;
                i++;
            }
            localStorage.setItem("elso",JSON.stringify(szinecskek));
            localStorage.setItem("elsot",JSON.stringify(megvanmar));
            }
        }else{
            if(confirm("Biztos menteni akarod?")){
            let szinecskek=[];
            let i=0;
            tdk=document.querySelectorAll("td");
            for(const td of tdk){
                szinecskek[i]=td.dataset.color;
                i++;
            }
            localStorage.setItem("elso",JSON.stringify(szinecskek));
            localStorage.setItem("elsot",JSON.stringify(megvanmar));
        }}
    }else if(szint===kozepes){
        if(localStorage.getItem("masodik")){
            if(confirm("Biztos felül akarod írni a régi mentést?")){
                let szinecskek=[];
                let i=0;
                tdk=document.querySelectorAll("td");
                for(const td of tdk){
                    szinecskek[i]=td.dataset.color;
                    i++;
                }
                localStorage.setItem("masodik",JSON.stringify(szinecskek));
                localStorage.setItem("masodikt",JSON.stringify(megvanmar));
            }
        }else{
            if(confirm("Biztos menteni akarod?")){
                let szinecskek=[];
                let i=0;
                tdk=document.querySelectorAll("td");
                for(const td of tdk){
                    szinecskek[i]=td.dataset.color;
                    i++;
                }
                localStorage.setItem("masodik",JSON.stringify(szinecskek));
                localStorage.setItem("masodikt",JSON.stringify(megvanmar));
        }}
    }else if(szint===nehez){
        if(localStorage.getItem("harmadik")){
            if(confirm("Biztos felül akarod írni a régi mentést?")){
                let szinecskek=[];
                let i=0;
                tdk=document.querySelectorAll("td");
                for(const td of tdk){
                    szinecskek[i]=td.dataset.color;
                    i++;
                }
                localStorage.setItem("harmadik",JSON.stringify(szinecskek));
                localStorage.setItem("harmadikt",JSON.stringify(megvanmar));
            }
        }else{
            if(confirm("Biztos menteni akarod?")){
                let szinecskek=[];
                let i=0;
                tdk=document.querySelectorAll("td");
                for(const td of tdk){
                    szinecskek[i]=td.dataset.color;
                    i++;
                }
                localStorage.setItem("harmadik",JSON.stringify(szinecskek));
                localStorage.setItem("harmadikt",JSON.stringify(megvanmar));
            }}
        }     
}

function load(){
    if(szint===konnyu){
        let szinecskek=JSON.parse(localStorage.getItem("elso"));
        let i=0;
        tdk=document.querySelectorAll("td");
        for(const td of tdk){
            td.dataset.color=szinecskek[i];
            td.style.backgroundColor=td.dataset.color;
            i++;
        }
        megvanmar=JSON.parse(localStorage.getItem("elsot"));
    }else if(szint===kozepes){
        let szinecskek=JSON.parse(localStorage.getItem("masodik"));
        let i=0;
        tdk=document.querySelectorAll("td");
        for(const td of tdk){
            td.dataset.color=szinecskek[i];
            td.style.backgroundColor=td.dataset.color;
            i++;
        }
        megvanmar=JSON.parse(localStorage.getItem("masodikt"));
    }else if(szint===nehez){
        let szinecskek=JSON.parse(localStorage.getItem("harmadik"));
        let i=0;
        tdk=document.querySelectorAll("td");
        for(const td of tdk){
            td.dataset.color=szinecskek[i];
            td.style.backgroundColor=td.dataset.color;
            i++;
        }
        megvanmar=JSON.parse(localStorage.getItem("harmadikt"));
    }
}

function menteskortorol(){
    tdk=document.querySelectorAll("td");
    for(const td of tdk){
        if(td.innerText==="" && td.dataset.color===szinecske){
            td.dataset.color="";
            td.style.backgroundColor="";
        }
    }
    szinecske="";
}

let ment = document.querySelector("#save");
let betölt = document.querySelector("#load");

ment.addEventListener("click", save);
betölt.addEventListener("click", load);

valtas();