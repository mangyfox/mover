import Point from './Point.js';

/**
 * Class to store data for a single section of track.
 */
export default class Sector {

  /**
   * A Sector is constructed from 4 Points.
   *
   * The order a,b,c,d is back left, back right, front left, front right.
   */
  constructor(a = new Point(), b = new Point(), c = new Point(), d = new Point()) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.center = new Point((a.x + b.x + c.x + d.x) / 4, (a.y + b.y + c.y + d.y) / 4);
    this.left = false;
    this.right = false;
    this.front = false;
    this.back = false;
    this.active = false;
    this.leftNorm = this.calcNorm(a, c);
    this.rightNorm = this.calcNorm(d, b);
  }

  /**
   * Calculate the normal vector between two Points.
   */
  calcNorm(p1, p2) {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let hyp = Math.hypot(dx, dy);

    return new Point(-dy/hyp, dx/hyp);
  }

  /**
   * Check if the given point is outside the walls of this sector.
   *
   * If it is, return the offset.
   */
  checkWalls(p) {
    this.left = this.checkIn(p, this.a, this.c);
    this.right = this.checkIn(p, this.d, this.b);

    if (this.active && !this.left) {
      let d = Math.abs(this.dot(p, this.a, this.c));
      return this.leftNorm.mult(d);
    }

    if (this.active && !this.right) {
      let d = Math.abs(this.dot(p, this.d, this.b));
      return this.rightNorm.mult(d);
    }

    return false;
  }

  /**
   * Check if the given point has left the front or back of the sector.
   */
  checkProgress(p) {
    this.front = this.checkIn(p, this.c, this.d);
    this.back = this.checkIn(p, this.b, this.a);

    if (this.active && !this.front) {
      this.active = false;
      return 1;
    }

    if (this.active && !this.back) {
      this.active = false;
      return -1;
    }

    return 0;
  }

  /**
   * Check if a point is on the correct side of two other points.
   */
  checkIn(p, a, b) {
    return this.dot(p, a, b) > 0;
  }

  /**
   * Render this sector to the given canvas context.
   */
  draw(ctx, first = false) {
    ctx.beginPath();
    ctx.strokeStyle = '#666';
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineWidth = 1;
    ctx.lineTo(this.c.x, this.c.y);
    ctx.moveTo(this.b.x, this.b.y);
    ctx.lineTo(this.d.x, this.d.y);
    ctx.stroke();

    if (first) {
      ctx.lineWidth = 1;
      ctx.moveTo(this.b.x, this.b.y);
      ctx.lineTo(this.a.x, this.a.y);
      ctx.stroke();
    }
  }

  /**
   * Calculate the dot product of a point and a line.
   */
  dot(p, a, b) {
    return ((b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x)) / Math.hypot((b.x - a.x), (b.y - a.y));
  }

}
