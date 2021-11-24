// Declaring variables
score = 0;
bgmusic = new Audio("sounds/bgmusic.mp3");
protonshot = new Audio("sounds/shoot.mp3");
blast = new Audio("sounds/blast.mp3");
gameovers = new Audio("sounds/gameover.wav");
highScore = document.getElementById("highScore");
var body = document.getElementsByTagName("body")[0];
var deviceWidth = window.innerWidth;
var distance = deviceWidth/7.5;
var deviceHeight = window.innerHeight;
var gameOver = document.querySelector(".gameOver");
var canon = document.getElementById("canon");
var defenderShip = document.getElementById("defenderShip");
var invaders = document.querySelectorAll(".invader")
var invader1 = document.querySelector("#invader1");
var invader2 = document.querySelector("#invader2");
var invader3 = document.querySelector("#invader3");
let x = 0;

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
  canon.style.display = "inline";
  canon.classList.add("fire");
  protonshot.play();
  setTimeout(() => {
    canon.classList.remove("fire");
  }, 450);
 
}

function left() {
  var leftX = parseInt(
    window.getComputedStyle(defenderShip, null).getPropertyValue("left")
  );
  if (x > -3) {
    x = x - 1;
    defenderShip.style.left = leftX - distance + "px";
  } 
}

function right() {
  var leftX = parseInt(
    window.getComputedStyle(defenderShip, null).getPropertyValue("left")
  );
  if (x < 3){
    x = x + 1;
    defenderShip.style.left = leftX + distance + "px";
  }
}

// Function for reducing animation duration 
function reduceDur(){
  aniDur = parseFloat(
    window
      .getComputedStyle(invader1, null)
      .getPropertyValue("animation-duration")
  );
  newDur = aniDur - 0.3;
  invaders.forEach(element => {element.style.animationDuration = newDur + "s"});
}

setInterval(() => {
  // Getting positions of invader ship
  dy1 = parseInt(
    window.getComputedStyle(invader1, null).getPropertyValue("bottom")
  );
  dy2 = parseInt(
    window.getComputedStyle(invader2, null).getPropertyValue("bottom")
  );
  dy3 = parseInt(
    window.getComputedStyle(invader3, null).getPropertyValue("bottom")
  );
  dy = parseInt(
    window.getComputedStyle(canon, null).getPropertyValue("bottom")
  );

  // Getting the differnece
  offsetX1 = Math.abs(dy1 - dy);
  offsetX2 = Math.abs(dy2 - dy);
  offsetX3 = Math.abs(dy3 - dy);
  
  // writing logic for invader1 ship
  if (offsetX1 > 600  && x == -3) {
    blast.play();
    setTimeout(() => {
      blast.pause();
      blast.currentTime = 0;
    }, 1000);
    score += 1;
    updateScore(score);
    invader1.src = "images/blast.jpg";
    canon.style.display = "none";
    reduceDur();
    setTimeout(() => {
      invader1.classList.remove("invaderAni");
      invader1.style.visibility = "hidden";
    }, 50);
    setTimeout(() => {
      invader1.src = "images/invader.png";
      invader1.style.visibility = "visible";
      invader1.classList.add("invaderAni");
      canon.style.display = "inline";
    }, 500);
  }
  
  // writing logic for invader2 ship
  if (offsetX2 > 600 && x == 0) {
    blast.play();
    setTimeout(() => {
      blast.pause();
      blast.currentTime = 0;
    }, 1000);
    score += 1;
    updateScore(score);
    invader2.src = "images/blast.jpg";
    canon.style.display = "none";
    reduceDur();
    setTimeout(() => {
      invader2.classList.remove("invaderAni");
      invader2.style.visibility = "hidden";
    }, 50);
    setTimeout(() => {
      invader2.src = "images/invader.png";
      invader2.style.visibility = "visible";
      invader2.classList.add("invaderAni");
      canon.style.display = "inline";
    }, 500);
  }
  
  // writing logic for invader3 ship
  if (offsetX3 > 600  && x == 3) {
    blast.play();
    setTimeout(() => {
      blast.pause();
      blast.currentTime = 0;
    }, 1000);
    score += 1;
    updateScore(score);
    invader3.src = "images/blast.jpg";
    canon.style.display = "none";
    reduceDur();
    setTimeout(() => {
      invader3.classList.remove("invaderAni");
      invader3.style.visibility = "hidden";
    }, 50);
    setTimeout(() => {
      invader3.src = "images/invader.png";
      invader3.style.visibility = "visible";
      invader3.classList.add("invaderAni");
      canon.style.display = "inline";
    }, 500);
  }
}, 20);

// for updating score
function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}

// setting highscore
storedValue = localStorage.getItem("highScore");
if (storedValue > 0) {
  highScore.innerHTML = "Highscore:" + storedValue;
}

// Gameover logic
setInterval(() => {
  dox1 = parseInt(
    window.getComputedStyle(invader1, null).getPropertyValue("top")
  );
  dox2 = parseInt(
    window.getComputedStyle(invader2, null).getPropertyValue("top")
  );
  dox3 = parseInt(
    window.getComputedStyle(invader3, null).getPropertyValue("top")
  );
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
}, 10);

