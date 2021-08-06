export default class Point {

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // Get the distance between two points.
  static distance(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  add(p) {
    this.x += p.x;
    this.y += p.y;
  }

  mult(m) {
    return new Point(this.x * m, this.y * m);
  }

}
