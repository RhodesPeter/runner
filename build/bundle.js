/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (global) {

  var player = document.getElementsByClassName('game__player')[0];
  var obstacles = document.getElementsByClassName('obstacle');
  var ground = document.getElementsByClassName('game__ground')[0];
  var startMessage = document.getElementsByClassName('game__start-message')[0];
  var playerJumping = false;
  var isGameOver = false;
  var gameOngoing = false;
  var scoreInterval = null;
  var checkPlayerPos = null;
  var gameScore = 0;
  var highestScore = 0;
  document.addEventListener('keydown', function () {
    checkKey(event);
  });

  var checkKey = function checkKey(e) {
    if (e.keyCode === 38) {
      playerJump();
      if (isGameOver) {
        restartGame();
      } else if (!gameOngoing) {
        startGame();
      }
    }
  };

  var checkPos = function checkPos() {
    checkPlayerPos = setInterval(function () {
      var playerPos = player.getBoundingClientRect();
      for (var i = 0; i < obstacles.length; i++) {
        var obstaclePos = obstacles[i].getBoundingClientRect();
        if (obstaclePos.left > playerPos.left && obstaclePos.left < playerPos.right) {
          if (obstaclePos.top <= playerPos.bottom) {
            gameOver();
          }
        }
      }
    }, 10);
  };

  var addScore = function addScore() {
    var scoreBoard = document.getElementsByClassName('game__score')[0];
    var score = '00000';
    scoreInterval = setInterval(function () {
      parseInt(score, 8);
      score++;
      gameScore = ('000000' + score).slice(-5);
      scoreBoard.innerHTML = gameScore;
    }, 100);
  };

  var startGame = function startGame() {
    ground.style.webkitAnimationPlayState = 'running';
    startMessage.classList.add('hidden');
    ground.classList.add('game__ground--animated');
    addScore();
    checkPos();
    gameOngoing = true;
  };

  var restartGame = function restartGame() {
    ground.classList.remove('game__ground--animated');
    isGameOver = false;
    toggleGameOverMessage();
    setTimeout(function () {
      startGame();
    }, 10);
  };

  var playerJump = function playerJump() {
    if (!playerJumping) {
      playerJumping = true;
      player.style.transform = 'translate(35px, -20px)';
      setTimeout(function () {
        player.style.transform = 'translate(35px, 33px)';
        setTimeout(function () {
          playerJumping = false;
        }, 190);
      }, 230);
    }
  };

  var toggleGameOverMessage = function toggleGameOverMessage() {
    document.getElementsByClassName('game__game-over')[0].classList.toggle('hidden');
  };

  var gameOver = function gameOver() {
    clearInterval(checkPlayerPos);
    clearInterval(scoreInterval);
    isGameOver = true;
    gameOngoing = false;
    toggleGameOverMessage();
    addHighestScore();
    startMessage.classList.remove('hidden');
    ground.style.webkitAnimationPlayState = 'paused';
  };

  var addHighestScore = function addHighestScore() {
    var highestScoreDiv = document.getElementsByClassName('game__highest-score')[0];
    highestScoreDiv.classList.remove('hidden');
    highestScore = gameScore > highestScore ? gameScore : highestScore;
    highestScoreDiv.innerHTML = 'HI ' + highestScore;
  };
})(window);

/***/ })
/******/ ]);