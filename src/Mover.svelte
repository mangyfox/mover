<script>
  export let controlsHandler;
  import { onMount } from 'svelte';
  import Car from './util/Car.js';
  import Track from './util/Track.js';

	let canvas;
  let startTime, previousTime, elapsed, delta;

  const width = 1400;
  const height = 1000;

  let data = [
    [653, 808],
    [652, 965],
    [866, 806],
    [870, 967],
    [1028, 790],
    [1075, 938],
    [1161, 737],
    [1265, 855],
    [1228, 623],
    [1383, 670],
    [1232, 516],
    [1392, 476],
    [1195, 412],
    [1349, 316],
    [1145, 381],
    [1207, 236],
    [1098, 377],
    [1068, 223],
    [1057, 398],
    [911, 270],
    [1038, 425],
    [854, 426],
    [1027, 522],
    [850, 463],
    [896, 669],
    [837, 473],
    [715, 645],
    [813, 473],
    [589, 521],
    [801, 456],
    [562, 360],
    [778, 318],
    [537, 205],
    [717, 126],
    [526, 181],
    [633, 16],
    [505, 171],
    [505, 11],
    [472, 175],
    [360, 55],
    [443, 204],
    [278, 164],
    [427, 273],
    [246, 250],
    [409, 398],
    [229, 324],
    [344, 507],
    [187, 403],
    [248, 595],
    [80, 488],
    [225, 640],
    [38, 614],
    [238, 697],
    [52, 757],
    [275, 734],
    [151, 888],
    [351, 767],
    [296, 937],
    [499, 787],
    [477, 973],
  ];

  const track = new Track(data).sectors;

  const car = new Car(track[track.length - 1].center, 0, 0, track.length - 1);
  track[car.sector].active = true;

  let currentSector;
  let currentLap = 0;
  let completedLaps = 0;
  let laps = [];
  let lapStart;
  let bestLap;

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
    car.update(controlsHandler);

    currentSector = car.sector;

    let walls = track[currentSector].checkWalls(car.pos);

    if (walls) {
      car.pos.add(walls);
      car.speed *= 0.95;
    }

    let progress = track[currentSector].checkProgress(car.pos);

    if (progress) {
      track[currentSector].active = false;
      currentSector += progress;

      if (currentSector < 0) {
        currentSector += track.length;
        currentLap--;
      }
      if (currentSector >= track.length) {
        currentSector -= track.length;

        completeLap(currentLap);
        currentLap++;
      }

      track[currentSector].active = true;
      car.sector = currentSector;
    }
  }

  // Render stuff to the canvas.
  const renderCanvas = (ctx) => {
    track.forEach((sector) => {
      sector.draw(ctx);
    });
    car.draw(ctx);
  }

  const completeLap = (l) => {
    if (l == 0) {
      lapStart = elapsed;
    }
    else if (l > completedLaps) {
      completedLaps = l;
      let lapTime = elapsed - lapStart;
      if (!bestLap || lapTime < bestLap) {
        bestLap = lapTime;
      }
      laps = [
        {
          lap: l,
          time: (lapTime/1000).toFixed(3)
        },
        ...laps
      ];
      lapStart = elapsed;
    }
  }

</script>

<div class="wrapper">
  <div class="debug">
    <p><b>←→↑↓</b> Arrow keys to move</p>
    Elapsed: {(elapsed/1000).toFixed(2)}<br/>
    Sector: {currentSector + 1}<br/>
    Lap: {currentLap}<br/>
    Laps: {completedLaps}<br/>
    Best: {#if bestLap }<b>{(bestLap/1000).toFixed(3)}</b>{/if}<br/>
    {#each laps as {lap, time} }
      Lap {lap}: {time}<br/>
    {/each}
  </div>
  <canvas id="canvas" bind:this={canvas} {width} {height} >No canvas</canvas>
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

  .debug {
    background: #ccc;
    font-size: 1.4rem;
    text-align: left;
    margin: 0;
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
  }
</style>
