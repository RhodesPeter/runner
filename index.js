"use strict";

(global => {

  const player = document.getElementsByClassName('game__player')[0];
  const obstacles = document.getElementsByClassName('obstacle');
  const ground = document.getElementsByClassName('game__ground')[0];
  const startMessage = document.getElementsByClassName('game__start-message')[0];
  let playerJumping = false;
  let isGameOver = false;
  let gameOngoing = false;
  let scoreInterval = null;
  let checkPlayerPos = null;
  document.addEventListener('keydown', function(){ checkKey(event) });

  const checkKey = e => {
    if (e.keyCode === 38) {
      playerJump();
      if (isGameOver){
        restartGame();
      } else if (!gameOngoing){
        startGame();
      }
    }
  }

  const checkPos = () => {
    checkPlayerPos = setInterval(() => {
      const playerPos = player.getBoundingClientRect();
      for(var i = 0; i < obstacles.length; i++) {
        let obstaclePos = obstacles[i].getBoundingClientRect();
        if (obstaclePos.left > playerPos.left && obstaclePos.left < playerPos.right){
          if (obstaclePos.top <= playerPos.bottom){ gameOver(); }
        }
      }
    }, 10);
  }

  const addScore = () => {
    const scoreBoard = document.getElementsByClassName('game__score')[0];
    let score = '00000';
    scoreInterval = setInterval(() => {
      parseInt(score, 8);
      score++;
      scoreBoard.innerHTML = ('000000' + score).slice(-5);
    }, 100);
  }

  const startGame = () => {
    ground.style.webkitAnimationPlayState = 'running';
    startMessage.classList.add('hidden');
    ground.classList.add('game__ground--animated');
    addScore();
    checkPos();
    gameOngoing = true;
  }

  const restartGame = () => {
    ground.classList.remove('game__ground--animated');
    isGameOver = false;
    toggleGameOverMessage();
    setTimeout(() => {
      startGame();
    }, 10);
  }

  const playerJump = () => {
    if (!playerJumping){
      playerJumping = true;
      player.style.transform = 'translate(35px, -20px)';
      setTimeout(() => {
        player.style.transform = 'translate(35px, 33px)';
        setTimeout(() => {
          playerJumping = false;
        }, 190);
      }, 230);
    }
  }

  const toggleGameOverMessage = () => {
    document.getElementsByClassName('game__game-over')[0].classList.toggle('hidden');
  }

  const gameOver = () => {
    clearInterval(checkPlayerPos);
    clearInterval(scoreInterval);
    isGameOver = true;
    gameOngoing = false;
    toggleGameOverMessage();
    startMessage.classList.remove('hidden');
    ground.style.webkitAnimationPlayState = 'paused';
  }

})(window);
