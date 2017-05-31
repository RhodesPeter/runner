"use strict";

(function () {

document.onkeydown = checkKey;
var player = document.getElementsByClassName('game__player')[0];
var obstacles = document.getElementsByClassName('obstacle');
var ground = document.getElementsByClassName('game__ground')[0];
var playerJumping = false;
var isGameOver = false;
var gameOngoing = false;
var increaseSpeed = null;
var scoreInterval = null;
var checkPlayerPos = null;

function checkKey(e) {
  if (e.keyCode === 38) {
    playerJump();
    if (!isGameOver){
      startGame();
    } else {
      restartGame();
    }
  }
}

function checkPos(){
    checkPlayerPos = setInterval(function () {
    var playerPos = player.getBoundingClientRect();
    for(var i = 0; i < obstacles.length; i++) {
      var obstaclePos = obstacles[i].getBoundingClientRect();
      if (obstaclePos.left > playerPos.left && obstaclePos.left < playerPos.right){
        if (obstaclePos.top <= playerPos.bottom){
          gameOver();
        }
      }
    }
  }, 10);
}

function addScore() {
  var scoreBoard = document.getElementsByClassName('game__score')[0];
  var score = '00000';
  scoreInterval = setInterval(function () {
    parseInt(score, 8)
    score++;
    scoreBoard.innerHTML = ('000000' + score).slice(-5);
  }, 100);
}

function startGame() {
  if (!gameOngoing){
    ground.style.webkitAnimationPlayState = 'running';
    addScore();
    checkPos();
    gameOngoing = true;
  }
}

function restartGame() {
  // this css line below isn't working
  ground.style.transform = 'translate(0, 0)';
  toggleGameOverMessage();
  startGame();
}

function playerJump () {
  if (!playerJumping && !isGameOver){
    playerJumping = true;
    player.style.transform = 'translate(35px, -20px)';
    setTimeout(function () {
      player.style.transform = 'translate(35px, 33px)';
      setTimeout(function () {
        playerJumping = false;
      }, 190);
    }, 230);
  }
}

function toggleGameOverMessage(){
  document.getElementsByClassName('game__game-over')[0].classList.toggle('hidden');
}

function gameOver (element) {
  ground.style.webkitAnimationPlayState = 'paused';
  clearInterval(checkPlayerPos);
  clearInterval(increaseSpeed);
  clearInterval(scoreInterval);
  isGameOver = true;
  gameOngoing = false;
  toggleGameOverMessage();
}

})();
