<script>
  export let controls;
  export let car;

  import { onMount } from 'svelte';

  let wrapper;
  let foreground;
  let background;
  let width;
  let height;
  let offsetX;
  let offsetY;

  const lightGrey = '#aaa';
  const darkGrey = '#666';

  onMount(() => {
    setSize();
    car.pos.x = width/2;
    car.pos.y = height/2;
    const backCtx = background.getContext('2d');
    const foreCtx = foreground.getContext('2d');
    let frame = requestAnimationFrame(loop);

    drawGrid(backCtx);

    // Browser animation loop.
		function loop(t) {
      // Clear the frame.
      foreCtx.clearRect(0, 0, width, height);

      // Render to canvas.
      car.draw(foreCtx);

      // Update
      car.update(controls);

      car.pos.x = (car.pos.x < 0) ? car.pos.x + width : (
        car.pos.x > width ? car.pos.x - width : car.pos.x
      );

      car.pos.y = (car.pos.y < 0) ? car.pos.y + height : (
        car.pos.y > height ? car.pos.y - height : car.pos.y
      );

      // Call the next frame.
      frame = requestAnimationFrame(loop);
		}

		return () => {
			cancelAnimationFrame(frame);
		};
  });

  const setSize = () => {
    let rect = wrapper.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    offsetX = width / 2;
    offsetY = height / 2;
    foreground.setAttribute('width', width);
    foreground.setAttribute('height', height);
    background.setAttribute('width', width);
    background.setAttribute('height', height);
  }

  const drawGrid = ctx => {
    ctx.clearRect(0, 0, width, height);

    // Centre cross.
    ctx.strokeStyle = darkGrey;
    ctx.beginPath();
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, height);
    ctx.moveTo(0, offsetY);
    ctx.lineTo(width, offsetY);
    ctx.stroke();
  }

</script>

<div class="debug-scene" bind:this={wrapper}>
  <canvas id="foreground" bind:this={foreground}></canvas>
  <canvas id="background" bind:this={background}></canvas>
</div>

<style>
  .debug-scene,
  #foreground,
  #background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #foreground {
    z-index: 10;
  }

  #background {
    background: #CFD7C7;
  }
</style>
