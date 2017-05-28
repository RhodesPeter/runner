"use strict";

(function () {

document.onkeydown = checkKey;
var player = document.getElementsByClassName('game__player')[0];
var obstacles = document.getElementsByClassName('obstacle');

function checkKey(e) {
  if (e.keyCode == '38') {
    player.style.transform = 'translate(20px, -20px)';
  }
  setTimeout(function () {
    player.style.transform = 'translate(20px, 33px)';
  }, 230);
}

setInterval(function () {
  var playerPos = player.getBoundingClientRect();
  for(var i = 0; i < obstacles.length; i++) {
    var obstaclePos = obstacles[i].getBoundingClientRect();
    if (obstaclePos.left > playerPos.left && obstaclePos.left < playerPos.right){
      if (obstaclePos.top <= playerPos.bottom){
        gameOver();
      }
    }
  }
}, 30);

function gameOver (element) {
  document.getElementsByClassName('game__ground')[0].style.webkitAnimationPlayState='paused';
  console.log('GAME OVER!');
}

})();
