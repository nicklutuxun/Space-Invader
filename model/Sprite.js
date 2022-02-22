import Element from "./Element.js";

class Sprite extends Element {
  constructor(x, y, width, height, imgsrc) {
    super(x, y, width, height, imgsrc);
    this.dx = 0;
    this.dy = 0;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

export default Sprite;