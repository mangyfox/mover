<script>
  export let car;

  import { onMount } from 'svelte';

  const TAU = Math.PI * 2;

  let canvas;
  let velx;
  let vely;
  let mx;
  let my;

  onMount(() => {
    const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);

		function loop(t) {
			frame = requestAnimationFrame(loop);

      car = car;

      velx = 10 * car.speed * Math.cos(car.rotation);
      vely = 10 * car.speed * Math.sin(car.rotation);
      mx = 10 * car.momentum.x;
      my = 10 * car.momentum.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#70A9A1';
      ctx.beginPath();
      ctx.arc(100, 100, 80, 0, TAU);
      ctx.stroke();

      ctx.fillStyle = '#EF626C';
      ctx.beginPath();
      ctx.arc(100 + mx, 100 + my, 10, 0, TAU);
      ctx.fill();

      ctx.fillStyle = '#42113C';
      ctx.beginPath();
      ctx.arc(100 + velx, 100 + vely, 10, 0, TAU);
      ctx.fill();
		}

		return () => {
			cancelAnimationFrame(frame);
		};
  });

</script>

<div class="car-debug">
  <h4>Car</h4>
  <div class="items">
    <div class="data">
      X: { car.pos.x.toFixed(2) }<br>
      Y: { car.pos.y.toFixed(2) }<br>
      Direction: { car.rotation.toFixed(2) }<br>
      Steering: { car.steering.toFixed(2) }<br>
      Speed: { car.speed.toFixed(2) }<br>
      Accel: { car.accel.toFixed(2) }
    </div>
    <canvas bind:this={canvas} width=200 height=200 >
      No canvas
    </canvas>
  </div>
</div>

<style>
  .car-debug {
    padding: 1rem;
    background: rgba(255,255,255,0.2);
  }

  h4 {
    margin: 0 0 1rem;
    text-align: center;
  }

  .items {
    display: flex;
  }

  canvas {
    max-width: 10rem;
  }
</style>
