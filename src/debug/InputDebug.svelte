<script>
  export let controls;

  import { onMount } from 'svelte';

  const TAU = Math.PI * 2;

  let canvas;
  let x = 0;
  let y = 0;

  onMount(() => {
    const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);

		function loop(t) {
			frame = requestAnimationFrame(loop);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw axes.
      ctx.strokeStyle = '#70A9A1';
      ctx.beginPath();
      ctx.moveTo(100, 20);
      ctx.lineTo(100, 180);
      ctx.moveTo(20, 100);
      ctx.lineTo(180, 100);
      ctx.stroke();

      // Draw input flags.
      ctx.fillStyle = '#EF626C';

      if (controls.xAxis != 0) {
        ctx.beginPath();
        ctx.arc(100 + controls.xAxis * 80, 100, 5, 0, TAU);
        ctx.fill();
      }

      if (controls.yAxis != 0) {
        ctx.beginPath();
        ctx.arc(100, 100 - controls.yAxis * 80, 5, 0, TAU);
        ctx.fill();
      }

      // Draw calculated input.
      ctx.fillStyle = '#42113C';

      ctx.beginPath();
      ctx.arc(100 + x * 0.8, 100 - y * 0.8, 10, 0, TAU);
      ctx.fill();

      update(t);
		}

		return () => {
			cancelAnimationFrame(frame);
		};
  });

  const update = (t) => {
    let dx = 100 * controls.xAxis - x;
    let dy = 100 * controls.yAxis - y;

    x += dx * 0.1;
    y += dy * 0.1;
  }
</script>

<div class="input-debug">
  <h4>Input</h4>
  <canvas bind:this={canvas} width=200 height=200 >
    No canvas
  </canvas>
  <div class="numbers">
    X: {x.toFixed(0)}  Y: {y.toFixed(0)}
  </div>
</div>

<style>
  .input-debug {
    width: 10rem;
    padding: 1rem;
    background: rgba(255,255,255,0.2);
  }

  h4 {
    margin: 0 0 1rem;
    text-align: center;
  }

  canvas {
    max-width: 100%;
    margin-bottom: 1rem;
  }
</style>
