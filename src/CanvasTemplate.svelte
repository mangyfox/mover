<script>

  import { onMount } from 'svelte';
	let canvas;
  let startTime, previousTime, elapsed, delta;

  const width = 800;
  const height = 600;

  // Define state here.

  onMount(() => {
    const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);

    // Browser animation loop.
		function loop(t) {
      // Initialise start time.
      if (startTime === undefined) {
        startTime = t;
        previousTime = t;
      }

      // Clear the frame.
      ctx.clearRect(0, 0, width, height);

      // Render to canvas.
      renderCanvas(ctx);

      // Update total elapsed time.
      elapsed = t - startTime;

      // Update current delta.
      delta = t - previousTime;

      if (delta) {
        // Update state.
        update();
      }

      // Store the current time.
      previousTime = t;

      // Call the next frame.
      frame = requestAnimationFrame(loop);
		}

		return () => {
			cancelAnimationFrame(frame);
		};
  });

  // Update state based on time
  const update = () => {
    // ...
  }

  // Render stuff to the canvas.
  const renderCanvas = (ctx) => {
    // ...
  }

</script>

<canvas id="canvas" bind:this={canvas} {width} {height} >No canvas</canvas>

<style>

</style>
