const Game = require('./game');

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
