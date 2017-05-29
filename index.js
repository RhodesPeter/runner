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

function checkKey(e) {
  if (e.keyCode === 38) {
    startGame();
    playerJump();
  }
}

function controlGameSpeed() {
  var seconds = 30;
  increaseSpeed = setInterval(function () {
    if (seconds > 19){
      seconds -= .0035;
      ground.style.webkitAnimationDuration = seconds + 's';
    }
  }, 10);
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

function startGame() {
  if (!isGameOver && !gameOngoing){
    ground.style.webkitAnimationPlayState = 'running';
    controlGameSpeed();
    gameOngoing = true;
  }
}

function playerJump () {
  if (!playerJumping){
    playerJumping = true;
    player.style.transform = 'translate(20px, -20px)';
    setTimeout(function () {
      player.style.transform = 'translate(20px, 33px)';
      setTimeout(function () {
        playerJumping = false;
      }, 190);
    }, 230);
  }
}

function gameOver (element) {
  ground.style.webkitAnimationPlayState = 'paused';
  clearInterval(checkPlayerPos);
  clearInterval(increaseSpeed);
  isGameOver = true;
  console.log('GAME OVER!');
}

})();
