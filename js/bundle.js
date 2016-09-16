/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function() {
	  key('space', ()=>{
	    let $body = $("body");
	    let startEl = $(".start");
	    startEl.remove();
	
	    startGame($body.height(), $body.width());
	  });
	
	});
	
	const startGame = function(height, width){
	  console.log("start");
	  $(".game").append("<canvas id='canvas'></canvas>");
	  let canvas = document.getElementById("canvas");
	  let ctx = canvas.getContext("2d");
	  let gameOptions = {ctx: ctx, height: height, width: width};
	  let gameView = new GameView(gameOptions);
	  canvas.width = gameView.game.DIM_X;
	  canvas.height = gameView.game.DIM_Y;
	  window.width = gameView.game.DIM_X;
	  window.height = gameView.game.DIM_Y;
	  canvas.style.backgroundColor = "white";
	  gameView.start(restart);
	};
	
	const restart = function(){
	  
	
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(3);
	
	class GameView {
	  constructor(options) {
	    this.game = new Game(options.height, options.width);
	    this.ctx = options.ctx;
	    this.ACCELERATION = 0.5;
	  }
	
	  start(restart) {
	    let gameView = this;
	    gameView.bindKeyHandlers(this.game.player);
	
	    let interval = setInterval( function() {
	
	      if (gameView.game.over()){
	        gameView.endGame(interval, restart);
	      }
	      gameView.game.step();
	      gameView.game.draw(gameView.ctx);
	    }, 20);
	  }
	
	  endGame(interval, restart){
	    clearInterval(interval);
	    let $canvas = $("#canvas");
	    $canvas.remove();
	    if (this.game.won()){
	      $("body").append(
	      `<div class=${"over"}><h1>YOU ARE THE APEX PREDATOR</h1><h2>Press spacebar to play again</h2></div>`
	      );
	    } else {
	      $("body").append(
	      `<div class=${"over"}><h1>GAME OVER</h1><h2>Press spacebar to play again</h2></div>`
	      );
	    }
	    this.playAgain(restart);
	  }
	
	  playAgain(restart){
	    key('space', ()=>{
	      $(".over").remove();
	      restart();
	    });
	  }
	
	  bindKeyHandlers(player){
	    key('w', ()=>{player.power([0,-(this.ACCELERATION)]);});
	    key('s', ()=>{player.power([0,(this.ACCELERATION)]);});
	    key('a', ()=>{player.power([-(this.ACCELERATION),0]);});
	    key('d', ()=>{player.power([(this.ACCELERATION),0]);});
	
	    key('up', ()=>{player.power([0,-(this.ACCELERATION)]);});
	    key('down', ()=>{player.power([0,(this.ACCELERATION)]);});
	    key('left', ()=>{player.power([-(this.ACCELERATION),0]);});
	    key('right', ()=>{player.power([(this.ACCELERATION),0]);});
	
	    key('space', ()=>{null;});
	  }
	}
	
	module.exports = GameView;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const LifeForm = __webpack_require__(4);
	const Util = __webpack_require__(6);
	const Player = __webpack_require__(7);
	
	
	class Game {
	  constructor(height, width){
	    this.DIM_X = width;
	    this.DIM_Y = height;
	    this.NUM_LIFE_FORMS = 400;
	    this.MAX_LIFE_RADIUS = Util.MAX_LIFE_RADIUS;
	    this.lifeForms = this.addLifeForms();
	    this.player = new Player({pos: [this.DIM_X / 2, this.DIM_Y / 2], game: this });
	    this.lifeForms = this.lifeForms.concat([this.player]);
	  }
	
	  allObjects() {
	    return this.lifeForms;
	  }
	
	  addLifeForms() {
	    let lifeForms = [];
	    let num;
	    if (this.DIM_X < 1000 || this.DIM_Y < 600) {
	      num = 300;
	    } else if (this.DIM_X < 800 || this.DIM_Y < 400 ) {
	      num = 250;
	    } else {
	      num = this.NUM_LIFE_FORMS;
	    }
	    for (let i=0; i < num; i++) {
	      let rad;
	      if (i < 250) {
	        rad = Util.randomRadius(1,5);
	      } else if (250 <= i && i < 350) {
	        rad = Util.randomRadius(5,10);
	      } else if (350 <= i && i < 388) {
	        rad = Util.randomRadius(10,15);
	      } else if (388 <= i && i < 394) {
	        rad = Util.randomRadius(15,20);
	      } else if (394 <= i && i < 396) {
	        rad = 30;
	      } else if (396 <= i && i < 398) {
	        rad = 35;
	      } else if (398 <= i && i < 399) {
	        rad = 40;
	      } else if (i === 399){
	        rad = 50;
	      }
	
	      let position = this.getRandomPosition(rad);
	      let lifeForm = new LifeForm({radius: rad, pos: position, game: this});
	      lifeForms.push(lifeForm);
	    }
	
	    return lifeForms;
	  }
	
	  getRandomPosition(rad) {
	    function getRandomNum(min, max) {
	      return Math.random() * (max - min) + min;
	    }
	    rad *= 4;
	    let xRange = [(this.DIM_X / 2) - rad, (this.DIM_X / 2) + rad];
	    let yRange = [(this.DIM_Y / 2) - rad, (this.DIM_Y / 2) + rad];
	
	    let x;
	    let y;
	    do {
	      x = getRandomNum(0 + this.MAX_LIFE_RADIUS, this.DIM_X - this.MAX_LIFE_RADIUS);
	      y = getRandomNum(0 + this.MAX_LIFE_RADIUS, this.DIM_Y - this.MAX_LIFE_RADIUS);
	    } while ((x > xRange[0] && x < xRange[1]) && (y > yRange[0] && y < yRange[1]));
	
	    return [x,y];
	  }
	
	  draw(ctx) {
	    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	    this.allObjects().forEach(function(lifeForm) {
	      lifeForm.draw(ctx);
	    });
	  }
	
	  moveObjects() {
	    this.allObjects().forEach( function(lifeForm) {
	      lifeForm.move();
	    });
	  }
	
	  checkCollisions() {
	    let objects = this.allObjects();
	    for (let i = 0; i < objects.length - 1; i++){
	      for (let j = i + 1; j < objects.length; j++){
	        let lifeForm1 = objects[i];
	        let lifeForm2 = objects[j];
	        if (lifeForm1 === lifeForm2) {
	          return;
	        } else {
	          if (lifeForm1.isCollidedWith(lifeForm2)) {
	            lifeForm1.collideWith(lifeForm2);
	          }
	        }
	      }
	    }
	  }
	
	  step() {
	    this.moveObjects();
	    this.checkCollisions();
	  }
	
	  over(){
	    let over = false;
	    if (this.playerDead() || this.won()){
	      over = true;
	    }
	    return over;
	  }
	
	  playerDead(){
	    return !!(this.player.radius <= 0.5);
	  }
	
	  won(){
	    return !!(this.lifeForms.length <= 1);
	  }
	
	  remove(lifeForm){
	
	    let index = this.lifeForms.indexOf(lifeForm);
	    this.lifeForms.splice(index, 1);
	  }
	}
	
	module.exports = Game;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(5);
	const Util = __webpack_require__(6);
	
	
	class LifeForm extends MovingObject {
	  constructor(options = {}){
	    options.color = "black";
	    // options.radius = Util.randomRadius();
	    options.vel = Util.randomVec(0.05);
	
	    super(options);
	  }
	
	}
	
	module.exports = LifeForm;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(6);
	
	class MovingObject {
	  constructor(options){
	    this.pos = options['pos'];
	    this.vel = options['vel'];
	    this.radius = options['radius'];
	    this.color = options['color'];
	    this.game = options['game'];
	  }
	
	  draw(ctx) {
	    ctx.fillStyle = this.color;
	    ctx.beginPath();
	
	    ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.radius,
	      0,
	      2 * Math.PI,
	      false
	    );
	
	    ctx.fill();
	  }
	
	  move() {
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	
	    if (this.radius >= 300) {
	      this.oversize(this.pos);
	    } else {
	      this.checkBorder(this.pos);
	    }
	
	    this.checkSize();
	  }
	
	  checkSize(){
	    if(this.radius > 400){
	      this.radius = 400;
	    }
	  }
	
	  checkBorder(pos){
	    if ((pos[0] - this.radius) < 0){
	      this.vel[0] = this.vel[0] * -1;
	      this.pos[0] = 0 + this.radius;
	    } else if ((pos[0] + this.radius) > this.game.DIM_X) {
	      this.vel[0] = this.vel[0] * -1;
	      this.pos[0] = this.game.DIM_X - this.radius;
	    } else if ((pos[1] - this.radius) < 0){
	      this.vel[1] = this.vel[1] * -1;
	      this.pos[1] = 0 + this.radius;
	    } else if ((pos[1] + this.radius) > this.game.DIM_Y) {
	      this.vel[1] = this.vel[1] * -1;
	      this.pos[1] = this.game.DIM_Y - this.radius;
	    }
	  }
	
	  oversize(pos){
	    if ((pos[0] - this.radius) < 0){
	      this.vel[0] = this.vel[0] * -1;
	      this.pos[0] = 0 + this.radius;
	    } else if ((pos[0] + this.radius) > this.game.DIM_X) {
	      this.vel[0] = this.vel[0] * -1;
	      this.pos[0] = this.game.DIM_X - this.radius;
	    } else if ((pos[1] - this.radius) < 0){
	      this.pos[1] = 0 + this.radius;
	    } else if ((pos[1] + this.radius) > this.game.DIM_Y) {
	      this.pos[1] = 0 + this.radius;
	    }
	  }
	
	
	  isCollidedWith(otherObject) {
	    let pos1 = this.pos;
	    let pos2 = otherObject.pos;
	
	    let dist = Util.distance(pos1, pos2);
	
	    if (dist < (this.radius + otherObject.radius)) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  collideWith(otherObject) {
	
	    if (this.radius >= otherObject.radius) {
	      this.radius = this.radius + Util.GROWTH_RATE;
	      otherObject.radius = otherObject.radius - Util.ABSORB_RATE;
	    } else if (this.radius < otherObject.radius) {
	      this.radius = this.radius - Util.ABSORB_RATE;
	      otherObject.radius = otherObject.radius + Util.GROWTH_RATE;
	    }
	
	    if (this.radius <= 0.5) {
	      this.game.remove(this);
	    } else if (otherObject.radius <= 0.5) {
	      this.game.remove(otherObject);
	    }
	  }
	}
	
	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	const Util = {
	  MAX_LIFE_RADIUS: 1,
	  MIN_LIFE_RADIUS: 20,
	  ABSORB_RATE: 2.25,
	  GROWTH_RATE: 0.65,
	
	
	  getRandomNum(min, max) {
	    return Math.random() * (max - min) + min;
	  },
	
	  randomVec(length) {
	    let dx = this.getRandomNum((-1 * length), length);
	    let dy = Math.sqrt(Math.pow(length,2) - Math.pow(dx, 2));
	    let arr = [-1,1];
	    let multiplier = arr[Math.floor(Math.random()*arr.length)];
	    dy = dy * multiplier;
	
	    return [dx, dy];
	  },
	
	  randomRadius(min, max){
	    // const min = Math.ceil(1);
	    // const max = Math.floor(10);
	    // const min = Math.ceil(this.MIN_LIFE_RADIUS);
	    // const max = Math.floor(this.MAX_LIFE_RADIUS);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  },
	
	  distance(pos1, pos2){
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  }
	};
	
	module.exports = Util;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(5);
	const LifeForm = __webpack_require__(4);
	
	class Player extends MovingObject {
	  constructor(options = {}){
	    options.color = "#C93200";
	    options.radius = 4;
	    options.vel = [0,0];
	
	    super(options);
	  }
	
	  power(impulse){
	    const MAX_SPEED = 15;
	    // if ((impulse[0] > 0 && this.vel[0] < 0) || (impulse[0] < 0 && this.vel[0] > 0)) {
	    //   this.vel[0] = 0;
	    // } else if ((impulse[1] > 0 && this.vel[1] < 0) || (impulse[1] < 0 && this.vel[1] > 0)) {
	    //   this.vel[1] = 0;
	    // }
	    this.vel[0] += impulse[0];
	    this.vel[1] += impulse[1];
	
	    if (this.vel[0] > MAX_SPEED) {
	      this.vel[0] = MAX_SPEED;
	    } else if (this.vel[0] < -MAX_SPEED) {
	      this.vel[0] = -MAX_SPEED;
	    } else if (this.vel[1] > MAX_SPEED) {
	      this.vel[1] = MAX_SPEED;
	    } else if (this.vel[1] < -MAX_SPEED) {
	      this.vel[1] = -MAX_SPEED;
	    }
	
	    this.loseMass();
	
	  }
	
	  loseMass(){
	    this.radius *= 0.98;
	    let lostMass = this.radius * 0.1;
	    // let lostMass = Math.floor(this.radius * 0.05);
	    // lostMass = (lostMass === 0) ? 1 : lostMass;
	    let newVel = [this.vel[0] * -1, this.vel[1] * -1];
	    let position = this.determinePos();
	
	    // position[1] = (this.vel[1] < 0) ? this.pos[1] + this.radius : this.pos[1] - this.radius;
	
	    let lifeForm = new LifeForm({pos: position, game: this.game});
	
	    lifeForm.radius = lostMass;
	    lifeForm.vel = newVel;
	
	    this.game.lifeForms.push(lifeForm);
	  }
	
	  determinePos(){
	    let position = [0,0];
	    if (this.vel[0] < 0){
	      if (this.vel[1] < 0){
	        position[0] = this.pos[0] + (this.radius * 0.8);
	        position[1] = this.pos[1] + (this.radius * 0.8);
	      } else if (this.vel[1] > 0) {
	        position[0] = this.pos[0] + (this.radius * 0.8);
	        position[1] = this.pos[1] - (this.radius * 0.8);
	      } else {
	        position[0] = this.pos[0] + (this.radius * 1.1);
	        position[1] = this.pos[1];
	      }
	    } else if (this.vel[0] > 0) {
	      if (this.vel[1] < 0){
	        position[0] = this.pos[0] - (this.radius * 0.8);
	        position[1] = this.pos[1] + (this.radius * 0.8);
	      } else if (this.vel[1] > 0) {
	        position[0] = this.pos[0] - (this.radius * 0.8);
	        position[1] = this.pos[1] - (this.radius * 0.8);
	      } else {
	        position[0] = this.pos[0] - (this.radius * 1.1);
	        position[1] = this.pos[1];
	      }
	    } else {
	      position[0] = this.pos[0];
	      if (this.vel[1] < 0) {
	        position[1] = this.pos[1] + (this.radius * 1.1);
	      } else {
	        position[1] = this.pos[1] - (this.radius * 1.1);
	      }
	    }
	    return position;
	  }
	}
	
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map