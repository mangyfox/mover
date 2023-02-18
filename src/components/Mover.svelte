<script>

  /**
   * Main game logic.
   */

  import ControlsHandler from './util/ControlsHandler.js';
  import { onMount } from 'svelte';
  import Car from './util/Car.js';
  import Track from './util/Track.js';
  import data from './util/tracks/classic.js';

  // Set up game state.
  let controlsHandler = new ControlsHandler();

	let foreground;
  let background;
  let startTime, previousTime, elapsed, delta;

  const width = 1400;
  const height = 1000;

  const track = new Track(data);
  const sectors = track.sectors;

  // Add the car to the last sector.
  const car = new Car(sectors[sectors.length - 1].center, 0, 0, sectors.length - 1);
  sectors[car.sector].active = true;

  let currentSector;
  let currentLap = 0;
  let completedLaps = 0;
  let laps = [];
  let lapStart;
  let bestLap;

  // Initialize game loop on load.
  onMount(() => {
    const ctxFore = foreground.getContext('2d');
    const ctxBack = background.getContext('2d');
		let frame = requestAnimationFrame(loop);

    renderBackground(ctxBack);

    // Browser animation loop.
		function loop(t) {
      // Initialise start time.
      if (startTime === undefined) {
        startTime = t;
        previousTime = t;
      }

      // Clear the frame.
      ctxFore.clearRect(0, 0, width, height);

      // Render to canvas.
      renderForeground(ctxFore);

      // Update total elapsed time.
      elapsed = t - startTime;

      // Update current delta.
      delta = t - previousTime;

      if (delta) {
        // Update state.
        update(delta/1000);
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
  const update = (dt) => {
    car.update(controlsHandler, dt);

    currentSector = car.sector;

    let walls = sectors[currentSector].checkWalls(car.pos);

    // Keep the car within track limits.
    if (walls) {
      car.pos.addThis(walls);
      car.speed *= 0.95;
    }

    let progress = sectors[currentSector].checkProgress(car.pos);

    // Update car progress around the track.
    if (progress) {
      sectors[currentSector].active = false;
      currentSector += progress;

      if (currentSector < 0) {
        currentSector += sectors.length;
        currentLap--;
      }
      if (currentSector >= sectors.length) {
        currentSector -= sectors.length;

        completeLap(currentLap);
        currentLap++;
      }

      sectors[currentSector].active = true;
      car.sector = currentSector;
    }
  }

  // Render the track to the background.
  const renderBackground = (ctx) => {
    track.draw(ctx);
    // track.drawCurved(ctx);
  }

  // Render the car to the foreground.
  const renderForeground = (ctx) => {
    car.draw(ctx);
  }

  // Update stats when a lap is completed.
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
  <div class="game">
    <canvas id="background" bind:this={background} {width} {height} ></canvas>
    <canvas id="foreground" bind:this={foreground} {width} {height} ></canvas>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    margin: auto;
    width: 1800px;
    max-height: 1000px;
  }

  .game {
    position: relative;
  }

  #background {
    background: #cfc;
  }

  #foreground {
    position: absolute;
    top: 0;
    left: 0;
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
