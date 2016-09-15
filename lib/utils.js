
const Util = {
  MAX_LIFE_RADIUS: 1,
  MIN_LIFE_RADIUS: 20,
  ABSORB_RATE: 2.25,
  GROWTH_RATE: 0.75,


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
