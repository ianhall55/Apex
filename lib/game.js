const LifeForm = require('./life_form');
const Util = require('./utils');
const Player = require('./player');


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
    for (let i=0; i < 400; i++) {
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
        rad = 40;
      } else if (398 <= i && i < 399) {
        rad = 50;
      } else if (i === 399){
        rad = 60;
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

  absorb(lifeForm) {

  }

  remove(lifeForm){

    let index = this.lifeForms.indexOf(lifeForm);
    this.lifeForms.splice(index, 1);
  }
}

module.exports = Game;
