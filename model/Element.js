class Element {
  constructor(x, y, width, height, imgsrc) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image(width, height);
    this.image.src = imgsrc;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }

  intersects(other) {
    let tw = this.width;
    let th = this.height;
    let rw = other.width;
    let rh = other.height;
    if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
      return false;
    }
    let tx = this.x;
    let ty = this.y;
    let rx = other.x;
    let ry = other.y;
    rw += rx;
    rh += ry;
    tw += tx;
    th += ty;
    // overflow || intersect
    return (
      (rw < rx || rw > tx) &&
      (rh < ry || rh > ty) &&
      (tw < tx || tw > rx) &&
      (th < ty || th > ry)
    );
  }
}

export default Element;