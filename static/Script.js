let numbers=document.querySelectorAll(".number");
var go=true;

if(!localStorage["sudokuMatrix"]){
    document.querySelector(".continue").classList.add("hide");
}
document.querySelector("#difficulty").addEventListener("click",()=>{
    if(document.querySelector("#difficulty").value!="none")document.querySelector(".new-game").disabled=false;
})

document.querySelector(".new-game").addEventListener("click",()=>{
    document.querySelector(".home-page").classList.add("hide");
    document.querySelector(".game-container").classList.remove("hide");
    document.querySelector(".timer").classList.remove("hide");
    let diff=document.querySelector("#difficulty").value;
    let k;
    if(diff=='easy') k=40;
    else if(diff=='medium') k=45;
    else if(diff=='hard') k=50;
    else if(diff=='expert') k=55;
    let sudoku = new Sudoku(9,k)
    localStorage.setItem("sudokuMatrix",JSON.stringify(sudoku.mat));
    fillSudokuBoard();
    go=true;
    timer();
})

document.querySelector(".continue").addEventListener("click",()=>{
    document.querySelector(".home-page").classList.add("hide");
    document.querySelector(".game-container").classList.remove("hide");
    document.querySelector(".timer").classList.remove("hide");
    timer();
    fillContinue();
    
    
    
})


for(let number of numbers){
    number.addEventListener("click",()=>{
        if(!number.value==0) document.querySelector(".active").innerHTML="";
        else document.querySelector(".active").innerHTML=number.innerHTML;
        if(checkNumber()) putValue();
    });
}

function fillContinue(){

    let matrix=JSON.parse(localStorage.getItem("sudokuMatrix"));

    let boxes=document.querySelectorAll('.box');

    let c=0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            
            boxes[c].innerHTML="";
            boxes[c].classList.remove("filled");
            if(matrix[i][j]!=0){
                boxes[c].innerHTML=matrix[i][j];
            }
        
            c++;
        }
    }
    let inti=JSON.parse(localStorage.getItem("initalFilled"));
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(inti.includes(i*9+j)){
                boxes[i*9+j].classList.add("filled");
            }
        }
    }
    countNumber();

    for(let i=0;i<81;i++){
        boxes[i].addEventListener("click",()=>{
            for(let j=0;j<81;j++){
                boxes[j].classList.remove("active");
            }
        if(!boxes[i].classList.contains("filled")){
            boxes[i].classList.add("active");
        }
    
    })
    }

}

function fillSudokuBoard(){

    let matrix=JSON.parse(localStorage.getItem("sudokuMatrix"));

    let boxes=document.querySelectorAll('.box');

    let intialfilled=[];

    let c=0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            
            boxes[c].innerHTML="";
            boxes[c].classList.remove("filled");
            if(matrix[i][j]!=0){
                boxes[c].innerHTML=matrix[i][j];
                boxes[c].classList.add("filled");
                intialfilled.push(c);
            }
        
            c++;
        }
    }
    localStorage.setItem("initalFilled",JSON.stringify(intialfilled));
    countNumber();

    for(let i=0;i<81;i++){
        boxes[i].addEventListener("click",()=>{
            for(let j=0;j<81;j++){
                boxes[j].classList.remove("active");
            }
        if(!boxes[i].classList.contains("filled")){
            boxes[i].classList.add("active");
        }
    
    })
    }
    localStorage.setItem("time",JSON.stringify([0,0,0]));
}

function putValue(){
    let i;
    let j;
    let matrix=JSON.parse(localStorage.getItem("sudokuMatrix"));
    let boxes=document.querySelectorAll('.box');
    for( i=0;i<9;i++){
        for( j=0;j<9;j++){
            if(boxes[i*9+j].classList.contains("active")){
                matrix[i][j]=Number(boxes[i*9+j].innerHTML);
                break;
            }
        }
    }

    localStorage.setItem("sudokuMatrix",JSON.stringify(matrix));
    countNumber();
}

function countNumber(){
    
    let counts=[9,9,9,9,9,9,9,9,9];
    let boxes=document.querySelectorAll('.box');
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            switch(Number(boxes[i*9+j].innerHTML)){
                case 1:
                    counts[0]--;
                    break;
                case 2:
                    counts[1]--;
                    break;
                case 3:
                    counts[2]--;
                    break;
                case 4:
                    counts[3]--;
                    break;
                case 5:
                    counts[4]--;
                    break;
                case 6:
                    counts[5]--;
                    break;
                case 7:
                    counts[6]--;
                    break;
                case 8:
                    counts[7]--;
                    break;
                case 9:
                    counts[8]--;
                    break;
            }
        }
    }

    let flag=true;
    let numbers=document.querySelectorAll(".number");
    for(let i in counts){
        if(counts[i]==0) numbers[i].disabled=true;
        else{
            numbers[i].disabled=false;
            flag=false;
        } 
    }
    if(flag){
        result();
    }
    
}



function timer(){
    if(go==true){
    let time=JSON.parse(localStorage.getItem("time"));
    let hr=document.querySelector(".hr");
    let min=document.querySelector(".min");
    let sec=document.querySelector(".sec");
    time[2]++;
    // sec
    if(time[2]<10){
        sec.innerHTML='0'+time[2]; 
    }
    else{
        if(time[2]==60){
            time[1]++;
            time[2]=0;
            sec.innerHTML='0'+time[2];        
        }
        else sec.innerHTML=time[2];
    }
    // min
    if(time[1]<10){
        min.innerHTML='0'+time[1];
    }
    else{
        if(time[1]==60){
            time[0]++;
            time[1]=0;
            time[2]=0;
            min.innerHTML='0'+time[1];        
        }
        else min.innerHTML=time[1];
    }
    // hour
    if(time[0]<10){
        hr.innerHTML='0'+time[0];
    }
    else{
        hr.innerHTML=time[0];
    }
    localStorage.setItem("time",JSON.stringify(time))
    setTimeout('timer()',999);
}
}


function checkNumber(){
    let act=document.querySelector(".active");
    let actNum=Number(act.innerHTML);
    let boxes=document.querySelectorAll('.box');
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            boxes[i*9+j].classList.remove("exist");   
            }
        }
    
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(boxes[i*9+j].classList.contains("active")){
                if(checking(i,j,actNum)){
                    boxes[i*9+j].classList.add("exist");
                    return false; 
                }
            }
        }
    }
    
    return true;
}
function checking(x,y,num){
    let flag=false;
    let boxes=document.querySelectorAll('.box');
    // row
    for(let j=0;j<9;j++){
        if(x*9+j!=x*9+y && boxes[x*9+j].innerHTML==num){
            boxes[x*9+j].classList.add("exist");
            flag=true;
        }
    }
    // col
    for(let i=0;i<9;i++){
        if(i*9+y!=x*9+y && boxes[i*9+y].innerHTML==num){
            boxes[i*9+y].classList.add("exist");
            flag=true;
        }
    }
    // box
    let rowStart=(x-(x%3))
    let colStart=(y-(y%3))
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(((rowStart+i)*9+(colStart+j))!=(x*9+y) && boxes[(rowStart+i)*9+(colStart+j)].innerHTML==num){
                boxes[(rowStart+i)*9+(colStart+j)].classList.add("exist");
                flag=true;
            }
        }
    }
    return flag;
}

function result(){
    let matrix=JSON.parse(localStorage.getItem("sudokuMatrix"));
    let flag=true;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(matrix[i][j]==0) flag=false;
        }
    }
    if(flag){
        go=false;
        timer();
        localStorage.removeItem("sudokuMatrix");
        localStorage.removeItem("initalFilled");
        document.querySelector(".result").classList.remove("hide")
    }
}