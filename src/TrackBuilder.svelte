<script>
  import Point from './util/Point.js';
  import { onMount } from 'svelte';

  const TAU = Math.PI * 2;

  let canvas;
  let ctx;
  const width = 1400;
  const height = 1000;
  let output = '[\n]';

  const points = [];

  onMount(() => {
    ctx = canvas.getContext('2d');
  });

  const clickHandler = (e) => {
    points.push(new Point(e.layerX, e.layerY));
    draw();
    updateOutput();
  }

  const draw = () => {
    // Clear the frame.
    ctx.clearRect(0, 0, width, height);

    points.forEach((p, index) => {
      if (index % 2) {

      }
      ctx.beginPath();
      ctx.strokeStyle = '#111';
      ctx.arc(p.x, p.y, 3, 0, TAU);
      ctx.stroke();
    });
  }

  const updateOutput = () => {
    output = '[\n';
    points.forEach(p => {
      output += `  [${p.x}, ${p.y}],\n`;
    });
    output += ']';
  }

</script>

<div class="wrapper">
  <pre class="output">
    {output}
  </pre>
  <canvas id="canvas" bind:this={canvas} {width} {height} on:click={clickHandler}>No canvas</canvas>
</div>

<style>
  .wrapper {
    display: flex;
    margin: auto;
    width: 1800px;
    max-height: 1000px;
  }

  #canvas {
    background: #cfc;
  }

  .output {
    background: #ccc;
    font-size: 1.4rem;
    text-align: left;
    margin: 0;
    padding: 1rem;
    flex: 1;
    overflow-y: scroll;
  }
</style>
