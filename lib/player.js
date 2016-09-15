const MovingObject = require('./moving_object');
const LifeForm = require('./life_form');

class Player extends MovingObject {
  constructor(options = {}){
    options.color = "#C93200";
    options.radius = 3;
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
