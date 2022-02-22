import Sprite from "./Sprite.js";

class Invader extends Sprite {
  constructor(x, width, height, imgsrc, dy) {
    super(x, 5, width, height, imgsrc);
    this.dy = dy;
  }

  collide(tank) {
    if (this.intersects(tank)) {
      return true;
    }
    return false;
  }

  jiggle() {
    this.dx = (Math.random() - 1/2) * 2;
  }
}

export default Invader;