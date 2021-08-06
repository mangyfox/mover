import Point from './Point.js';

const TAU = Math.PI * 2;

export default class Car {

  constructor(pos = new Point(), rotation = 0, speed = 0, sector = 0) {
    this.pos = pos;
    this.rotation = rotation;
    this.speed = speed;
    this.sector = sector;
    this.steering = 0;
    this.accel = 0;
    this.maxSpeed = 10;
    this.maxReverse = 5;
  }

  update(controls) {
    let diffSteering = controls.xAxis - this.steering;
    this.steering += diffSteering * 0.1;

    let fr = Math.abs(this.speed) / this.maxSpeed;
    let direction = this.speed < 0 ? -1 : 1;
    this.rotation += 0.2 * this.steering * direction * fr * (1 - fr);

    let diffAccel = controls.yAxis - this.accel;
    this.accel += diffAccel * 0.1;

    if (this.accel > 0 && this.speed < this.maxSpeed) {
      this.speed += 0.1 * this.accel;
    }
    if (this.accel < 0 && this.speed > -this.maxReverse) {
      this.speed += 0.1 * this.accel;
    }

    // Apply drag.
    this.speed *= 0.99;

    // Apply steering drag.
    if (Math.abs(this.steering)) {
      this.speed *= 1 - (0.005 * Math.abs(this.steering));
    }

    // Move this car.
    this.pos.x += this.speed * Math.cos(this.rotation);
    this.pos.y += this.speed * Math.sin(this.rotation);
  }

  draw(ctx) {
    let p1 = {
      x: 10 * Math.cos(this.rotation),
      y: 10 * Math.sin(this.rotation)
    };
    let p2 = {
      x: 10 * Math.cos(this.rotation + 5 * TAU / 12),
      y: 10 * Math.sin(this.rotation + 5 * TAU / 12)
    };
    let p3 = {
      x: 10 * Math.cos(this.rotation - 5 * TAU / 12),
      y: 10 * Math.sin(this.rotation - 5 * TAU / 12)
    };

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(this.pos.x + p1.x, this.pos.y + p1.y);
    ctx.lineTo(this.pos.x + p2.x, this.pos.y + p2.y);
    ctx.lineTo(this.pos.x + p3.x, this.pos.y + p3.y);
    ctx.fillStyle = '#666';
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#111';
    ctx.arc(this.pos.x, this.pos.y, 10, 0, TAU);
    ctx.stroke();
  }

}
