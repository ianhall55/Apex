const MovingObject = require('./moving_object');
const Util = require('./utils');


class LifeForm extends MovingObject {
  constructor(options = {}){
    options.color = "black";
    // options.radius = Util.randomRadius();
    options.vel = Util.randomVec(0.05);

    super(options);
  }

}

module.exports = LifeForm;
