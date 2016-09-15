const GameView = require('./lib/game_view');

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
