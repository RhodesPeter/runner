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

function checkKey(e) {
  if (e.keyCode === 38) {
    startGame();
    playerJump();
  }
}

var checkPlayerPos = setInterval(function () {
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
  if (!isGameOver && !gameOngoing){
    ground.style.webkitAnimationPlayState = 'running';
    addScore();
    gameOngoing = true;
  }
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

function addGameOverMessage(){
  document.getElementsByClassName('game__game-over')[0].classList.remove('hidden');
}

function gameOver (element) {
  ground.style.webkitAnimationPlayState = 'paused';
  clearInterval(checkPlayerPos);
  clearInterval(increaseSpeed);
  clearInterval(scoreInterval);
  isGameOver = true;
  gameOngoing = false;
  addGameOverMessage();
}

})();
