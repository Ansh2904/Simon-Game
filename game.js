let gameSeq=[];
let userSeq=[];


let started = false;
let level = 0;
let highScore = localStorage.getItem('highScore');
let btns = ['yellow','red','purple','green'];
// let btn = document.querySelector('box');

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("key pressed");
        started = true;
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
    
};
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },500);
    
};

function levelUp(){
    userSeq=[];
    level++;
    document.querySelector('p').innerText=`level: ${level}`;
    let randInd = Math.floor(Math.random()*4);
    let randCol = btns[randInd];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    gameFlash(randBtn);
};
function BtnPress(){
    let btn = this;
    userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    userFlash(btn);
    CheckCol(userSeq.length-1);
}
function CheckCol(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp ,1000);
        }
       
    }else{
        if(level>highScore){
            highScore = level;
            localStorage.setItem('highScore', highScore);
        }
        document.querySelector('p').innerHTML=`<br>Game Over Better Luck Next Time`;
        document.querySelector('#highscore').innerHTML=`<b>Game High Score is :${highScore} <p>Your Score is: ${level}</p></b>`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },500);
    }
}

let allBtn = document.querySelectorAll('.btn');
for(btn of allBtn){
    btn.addEventListener('click', BtnPress);
}
