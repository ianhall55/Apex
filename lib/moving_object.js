const Util = require('./utils');

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

    if (this.radius <= 0) {
      this.game.remove(this);
    } else if (otherObject.radius <= 0) {
      this.game.remove(otherObject);
    }
  }
}

module.exports = MovingObject;
