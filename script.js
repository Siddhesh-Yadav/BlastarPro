// Declaring variables
let score = 0;
let x = 0;
const bgmusic = new Audio("sounds/bgmusic.mp3");
const protonshot = new Audio("sounds/shoot.mp3");
const blast = new Audio("sounds/blast.mp3");
const gameovers = new Audio("sounds/gameover.wav");
const deviceWidth = window.innerWidth;
const distance = deviceWidth/7.5;
const deviceHeight = window.innerHeight;
highScore = document.getElementById("highScore");
const body = document.getElementsByTagName("body")[0];
const gameOver = document.querySelector(".gameOver");
const canon = document.getElementById("canon");
const defenderShip = document.getElementById("defenderShip");
const invaders = document.querySelectorAll(".invader")
const invader1= document.querySelector("#invader1");
const invader2 = document.querySelector("#invader2");
const invader3 = document.querySelector("#invader3");

setTimeout(() => {
  bgmusic.play();
}, 2000);

// setting controls for keyboard
document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      e.preventDefault();
      left();
      break;
    case 38:
      shoot();
      break;
    case 39:
      e.preventDefault();
      right();
      break;
  }
};

function shoot() {  
  document.getElementById("shoot").disabled = true;
  setTimeout(function(){document.getElementById("shoot").disabled = false;},500);
  canon.style.display = "inline";
  canon.classList.add("fire");
  protonshot.play();
  setTimeout(() => {
    canon.classList.remove("fire");
  }, 450);
 
}

function left() {
  var leftX = parseInt(window.getComputedStyle(defenderShip, null).getPropertyValue("left"));
  if (x > -3) {
    x = x - 1;
    defenderShip.style.left = leftX - distance + "px";
  } 
}

function right() {
  var leftX = parseInt(window.getComputedStyle(defenderShip, null).getPropertyValue("left"));
  if (x < 3){
    x = x + 1;
    defenderShip.style.left = leftX + distance + "px";
  }
}

// Function for reducing animation duration 
function reduceDur(){
  aniDur = parseFloat(window.getComputedStyle(invader1, null).getPropertyValue("animation-duration"));
  newDur = aniDur - 0.3;
  invaders.forEach(element => {element.style.animationDuration = newDur + "s"});
}


const getPoints = (ship)=>{
    blast.play();
    setTimeout(() => {
      blast.pause();
      blast.currentTime = 0;
    }, 1000);
    score += 1;
    updateScore(score);
    ship.src = "images/blast.jpg";
    canon.style.display = "none";
    reduceDur();
    setTimeout(() => {
      ship.classList.remove("invaderAni");
      ship.style.visibility = "hidden";
    }, 50);
    setTimeout(() => {
      ship.src = "images/invader.png";
      ship.style.visibility = "visible";
      ship.classList.add("invaderAni");
      canon.style.display = "inline";
    }, 500);
}
setInterval(() => {
  // Getting positions of invader ship
  dy1 = parseInt(window.getComputedStyle(invader1, null).getPropertyValue("bottom"));
  dy2 = parseInt(window.getComputedStyle(invader2, null).getPropertyValue("bottom"));
  dy3 = parseInt(window.getComputedStyle(invader3, null).getPropertyValue("bottom"));
  dy = parseInt(window.getComputedStyle(canon, null).getPropertyValue("bottom"));

  // Getting the differnece
  offsetX1 = Math.abs(dy1 - dy);
  offsetX2 = Math.abs(dy2 - dy);
  offsetX3 = Math.abs(dy3 - dy);  
  // writing logic for ship ship
  if (offsetX1 > 600  && x == -3) {
    getPoints(invader1)
  }  
  // writing logic for invader2 ship
  if (offsetX2 > 600 && x == 0) {
    getPoints(invader2);
  }
  // writing logic for invader3 ship
  if (offsetX3 > 600  && x == 3) {
    getPoints(invader3)
  }
  
}, 20);

// for updating score
function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}

// setting highscore
storedValue = localStorage.getItem("highScore");
if (storedValue === null) {
  localStorage.setItem("highScore", 0);
}else{
  highScore.innerHTML = "Highscore:" + storedValue;
}
setInterval(() => {
  dox1 = parseInt(window.getComputedStyle(invader1, null).getPropertyValue("top"));
  dox2 = parseInt(window.getComputedStyle(invader2, null).getPropertyValue("top"));
  dox3 = parseInt(window.getComputedStyle(invader3, null).getPropertyValue("top"));
  if (dox1 > innerHeight - 70 || dox2 > innerHeight - 70 || dox3 > innerHeight - 70) {
    j = 0;
    j = storedValue;
    bgmusic.pause();
    gameovers.play();
    invaders.forEach(element => { element.classList.remove("invaderAni"); });
    document.getElementById("shoot").style.visibility = "hidden";
    document.getElementById("shoot").removeAttribute("onclick");
    document.getElementById("shoot").onclick = null;
    gameOver.innerHTML = "Game Over - Reload to Play Again";
    if (j < score) {
      highScore.innerHTML = "Highscore:" + score;
      j = score;
    }
    localStorage.setItem("highScore", j);
  }
}, 100);
