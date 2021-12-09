import Point from './Point.js';

const TAU = Math.PI * 2;
const WARP = 6;

/**
 * Class to manage the data for a single Car entity.
 */
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

  /**
   * Update Car state based on current control inputs and time delta.
   */
  update(controls, dt) {
    let diffSteering = controls.xAxis - this.steering;
    this.steering += diffSteering * dt * WARP;

    let fr = Math.abs(this.speed) / this.maxSpeed;
    let direction = this.speed < 0 ? -1 : 1;
    this.rotation += this.steering * direction * fr * (1 - fr) * dt * WARP * 2;

    let diffAccel = controls.yAxis - this.accel;
    this.accel += diffAccel * dt * WARP;

    if (this.accel > 0 && this.speed < this.maxSpeed) {
      this.speed += this.accel * dt * WARP;
    }
    if (this.accel < 0 && this.speed > -this.maxReverse) {
      this.speed += this.accel * dt * WARP;
    }

    // Apply drag.
    this.speed *= (1 - dt * WARP/10);

    // Apply steering drag.
    if (Math.abs(this.steering)) {
      this.speed *= 1 - (0.005 * Math.abs(this.steering));
    }

    // Move this car.
    this.pos.x += this.speed * Math.cos(this.rotation);
    this.pos.y += this.speed * Math.sin(this.rotation);
  }

  /**
   * Render the car to the given canvas context.
   */
  draw(ctx, offset = new Point(0,0)) {
    let pos = this.pos.add(offset);

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
    ctx.moveTo(pos.x + p1.x, pos.y + p1.y);
    ctx.lineTo(pos.x + p2.x, pos.y + p2.y);
    ctx.lineTo(pos.x + p3.x, pos.y + p3.y);
    ctx.fillStyle = '#666';
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#111';
    ctx.arc(pos.x, pos.y, 10, 0, TAU);
    ctx.stroke();
  }

}
