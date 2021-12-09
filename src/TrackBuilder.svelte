<script>

  /**
   * Useful tool for plotting out track data.
   *
   * The plotted data can be used to create new tracks.
   *
   * See ./util/tracks/classic.js
   */
  import Point from './util/Point.js';
  import { onMount } from 'svelte';

  const TAU = Math.PI * 2;

  let canvas;
  let ctx;
  const width = 1400;
  const height = 1000;
  let output = '[\n]';
  let panning = false;
  let offsetX = 0;
  let offsetY = 0;
  let zoom = 1;

  const points = [];

  onMount(() => {
    ctx = canvas.getContext('2d');
  });

  const clickHandler = (e) => {
    points.push(new Point((e.layerX - offsetX) * zoom, (e.layerY - offsetY) * zoom));
    draw();
    updateOutput();
  }

  const rightClickHandler = (e) => {
    panning = true;
  }

  const undoHandler = () => {
    points.pop();
    draw();
    updateOutput();
  }

  const mouseUpHandler = () => {
    panning = false;
  }

  const mouseMoveHandler = (e) => {
    if (!panning) {
      return;
    }
    offsetX += e.movementX / zoom;
    offsetY += e.movementY / zoom;
    draw();
  }

  // Needs more maths.
  const mouseWheelHandler = (e) => {
    //zoom *= (1000 + e.wheelDelta) / 1000;
    //draw();
  }

  const draw = () => {
    // Clear the frame.
    ctx.clearRect(0, 0, width, height);

    points.forEach((p, index) => {
      ctx.beginPath();
      ctx.strokeStyle = '#111';
      ctx.arc((p.x + offsetX) * zoom, (p.y + offsetY) * zoom, 3, 0, TAU);
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

<svelte:body on:mouseup={mouseUpHandler} />
<div class="wrapper">
  <div class="output">
    <button id="undo" on:click={undoHandler}>Undo</button><br/>
    Offset X: {offsetX}<br/>
    Offset Y: {offsetY}<br/>
    Panning: {panning}<br/>
    Zoom: {zoom}<br/>
    <pre>
      {output}
    </pre>
  </div>
  <canvas
    id="canvas"
    bind:this={canvas}
    {width}
    {height}
    on:click={clickHandler}
    on:contextmenu|preventDefault={rightClickHandler}
    on:wheel|preventDefault={mouseWheelHandler}
    on:mousemove={mouseMoveHandler}>No canvas</canvas>
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

  button {
    cursor: pointer;
  }
</style>
