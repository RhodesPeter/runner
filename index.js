"use strict";

(function () {

document.onkeydown = checkKey;
var player = document.getElementsByClassName('game__player')[0];

function checkKey(e) {
  if (e.keyCode == '38') {
    player.style.transform = 'translate(20px, -20px)';
  }
  setTimeout(function () {
    player.style.transform = 'translate(20px, 33px)';
  }, 200);
}

})();
