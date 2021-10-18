/**
 * Helper class to manage data for a single point in 2D.
 */
export default class Point {

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Get the distance between two points.
   */
  static distance(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  /**
   * Get the difference between two points as a relative point.
   */
  static diff(a, b) {
    return new Point(b.x - a.x, b.y - a.y);
  }

  /**
   * Get the distance as a relative point.
   */
  length() {
    return Math.hypot(this.x, this.y);
  }

  /**
   * Add another point to this point.
   */
  addThis(p) {
    this.x += p.x;
    this.y += p.y;
  }

  /**
   * Add another point to this one to create a new point.
   */
  add(p) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  /**
   * Multiply this point by a constant.
   */
  multThis(m) {
    this.x *= m;
    this.y *= m;
  }

  /**
   * Multiply by a constant to create a new point.
   */
  mult(m) {
    return new Point(this.x * m, this.y * m);
  }

}
