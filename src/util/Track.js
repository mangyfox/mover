import Point from './Point.js';
import Sector from './Sector.js';

export default class Track {

  constructor(data = []) {
    this.points = this.getPoints(data);
    this.sectors = this.getSectors(this.points);
  }

  getPoints(data) {
    let p = [];
    data.forEach(d => {
      p.push(new Point(d[0], d[1]));
    });
    return p;
  }

  getSectors(p) {
    let s = [];
    console.log(p.length);
    for (let i = 0; i < p.length; i += 2) {
      console.log(i, p.length);
      let a = i;
      let b = i + 1;
      let c = i + 2 < p.length ? i + 2 : i + 2 - p.length;
      let d = i + 3 < p.length ? i + 3 : i + 3 - p.length;

      s.push(new Sector(p[a], p[b], p[c], p[d]));
    }
    return s;
  }

}

const p = [
  [400,600],
  [100,900],
  [1000,600],
  [1300,900],
  [1000,400],
  [1300,100],
  [400,400],
  [100,100]
];


