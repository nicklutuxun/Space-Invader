import Sprite from "./Sprite.js";

class Missile extends Sprite {
  constructor(x, y, width, height, imgsrc) {
    super(x, y, width, height, imgsrc);
    this.dx = 0;
    this.dy = -5;
  }

  collide(invader) {
    if (this.intersects(invader)) {
      return true;
    }
    return false;
  }
}

export default Missile;