<script>

  /**
   * Debug component to test the ControlsHandler.
   */

  import { onMount } from 'svelte';
  import ControlsHandler from './util/ControlsHandler.js';

  const TAU = Math.PI * 2;

  let controlsHandler = new ControlsHandler();

	let canvas;
  let x = 0;
  let y = 0;

  onMount(() => {
    const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);
    let count = 0;

		function loop(t) {
			frame = requestAnimationFrame(loop);

      if (count % 60 == 0) {
        //console.log(controlsHandler);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6c6';
      ctx.strokeStyle = '#333';
      ctx.beginPath();
      ctx.moveTo(200, 100);
      ctx.lineTo(200, 300);
      ctx.moveTo(100, 200);
      ctx.lineTo(300, 200);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(200 + x, 200 + y, 10, 0, TAU);
      ctx.fill();

      if (controlsHandler.space) {
        ctx.fillRect(400, 250, 150, 25);
      }
      else {
        ctx.strokeRect(400, 250, 150, 25);
      }

      if (controlsHandler.enter) {
        ctx.fillRect(600, 150, 50, 75);
      }
      else {
        ctx.strokeRect(600, 150, 50, 75);
      }

      update(t);

      count++;
		}

		return () => {
			cancelAnimationFrame(frame);
		};
  });

  const update = (t) => {
    let dx = 100 * controlsHandler.xAxis - x;
    let dy = -100 * controlsHandler.yAxis - y;

    x += dx * 0.1;
    y += dy * 0.1;
  }

</script>

<canvas id="canvas" bind:this={canvas} width=800 height=600>No canvas</canvas>

<style>
  #canvas {
    background: #eee;
  }
</style>
