const Game = require('./game');

class GameView {
  constructor(options) {
    this.game = new Game(options.height, options.width);
    this.ctx = options.ctx;
    this.ACCELERATION = 0.5;
  }

  start() {
    let gameView = this;
    gameView.bindKeyHandlers(this.game.player);
    setInterval( function() {
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }, 20);
  }

  bindKeyHandlers(player){
    key('w', ()=>{player.power([0,-(this.ACCELERATION)]);});
    key('s', ()=>{player.power([0,(this.ACCELERATION)]);});
    key('a', ()=>{player.power([-(this.ACCELERATION),0]);});
    key('d', ()=>{player.power([(this.ACCELERATION),0]);});
  }
}

module.exports = GameView;
