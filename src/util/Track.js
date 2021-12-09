import Point from './Point.js';
import Sector from './Sector.js';

/**
 * Class for managing track data.
 */
export default class Track {

  constructor(data = []) {
    this.points = this.getPoints(data);
    this.sectors = this.getSectors(this.points);
  }

  /**
   * Turns a set of raw data into an array of Point objects.
   */
  getPoints(data) {
    let p = [];
    data.forEach(d => {
      p.push(new Point(d[0], d[1]));
    });
    return p;
  }

  /**
   * Creates Sectors from an array of Points.
   */
  getSectors(p) {
    let s = [];
    for (let i = 0; i < p.length; i += 2) {
      let a = i;
      let b = i + 1;
      let c = i + 2 < p.length ? i + 2 : i + 2 - p.length;
      let d = i + 3 < p.length ? i + 3 : i + 3 - p.length;

      s.push(new Sector(p[a], p[b], p[c], p[d]));
    }
    return s;
  }

  /**
   * Get the maximum limits of the track.
   */
  getLimits(xBuffer = 0, yBuffer = 0) {
    let xMax, xMin, yMax, yMin;
    this.points.forEach(p => {
      xMax = !xMax || (p.x > xMax) ? p.x : xMax;
      xMin = !xMin || (p.x < xMin) ? p.x : xMin;
      yMax = !yMax || (p.y > yMax) ? p.y : yMax;
      yMin = !yMin || (p.y < yMin) ? p.y : yMin;
    });

    return {
      xMax: xMax - xBuffer,
      xMin: xMin + xBuffer,
      yMax: yMax - yBuffer,
      yMin: yMin + yBuffer
    };
  }

  /**
   * Render the whole track to the specified canvas context.
   */
  draw(ctx, offset = new Point(0,0)) {
    this.sectors.forEach((sector, id) => {
      sector.draw(ctx, offset, id === 0);
    });
  }

  /**
   * Renders the whole track using bezier curves.
   *
   * (At some point)
   */
  drawCurved(ctx) {
    this.points.forEach((p, pid) => {
      let count = this.points.length;
      let pidPrev = pid - 2 < 0 ? pid - 2 + count : pid - 2;
      let pidNext = pid + 2 < count ? pid + 2 : pid + 2 - count;
      let pidNextNext = pid + 4 < count ? pid + 4 : pid + 4 - count;
      let pPrev = this.points[pidPrev];
      let pNext = this.points[pidNext];
      let pNextNext = this.points[pidNextNext];

      let length = Math.hypot(pNext.x - p.x, pNext.y - p.y);
      let t1 = Point.diff(pPrev, pNext);
      t1.multThis(length / (t1.length() * 3));
      let t2 = Point.diff(p, pNextNext);
      t2.multThis(length / (t2.length() * 3));

      ctx.beginPath();
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 1;
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + t1.x, p.y + t1.y);
      ctx.moveTo(pNext.x, pNext.y);
      ctx.lineTo(pNext.x - t2.x, pNext.y - t2.y);
      ctx.stroke();
    });
  }

}
