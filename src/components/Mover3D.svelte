<script>

  /**
   * Same game logic, but renders to a ThreeJS scene.
   */

  import ControlsHandler from './util/ControlsHandler.js';
  import { onMount } from 'svelte';
  import { createScene, updateScene } from "./util/scene.js";
  import Car from './util/Car.js';
  import Track from './util/Track.js';
  import data from './util/tracks/classic.js';

  let canvas;

  const track = new Track(data);
  const sectors = track.sectors;

  const game = {
    elapsed: 0,
    track: track,
    car: new Car(sectors[sectors.length - 1].center, 0, 0, sectors.length - 1),
  };

  sectors[game.car.sector].active = true;
  let currentSector;
  let currentLap = 0;
  let completedLaps = 0;
  let laps = [];
  let lapStart;
  let bestLap;

  const width = 1400;
  const height = 1000;

  let controlsHandler = new ControlsHandler();

  onMount(() => {
    createScene(canvas, game);

    let frame = requestAnimationFrame(loop);
    let startTime, previousTime, dt;

    // Browser animation loop.
		function loop(t) {
      // Initialise start time.
      if (startTime === undefined) {
        startTime = t;
        previousTime = t;
      }

      // Update the scene.
      updateScene(game);

      // Update total elapsed time.
      game.elapsed = t - startTime;

      // Update current delta.
      dt = (t - previousTime) /1000;

      if (dt) {
        // Update state.
        updateState(dt);
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

  const updateState = (dt) => {
    game.car.update(controlsHandler, dt);

    currentSector = game.car.sector;

    let walls = sectors[currentSector].checkWalls(game.car.pos);

    if (walls) {
      game.car.pos.addThis(walls);
      game.car.speed *= 0.95;
    }

    let progress = sectors[currentSector].checkProgress(game.car.pos);

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
      game.car.sector = currentSector;
    }
  }

  const completeLap = (l) => {
    if (l == 0) {
      lapStart = game.elapsed;
    }
    else if (l > completedLaps) {
      completedLaps = l;
      let lapTime = game.elapsed - lapStart;
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
      lapStart = game.elapsed;
    }
  }

</script>

<div class="wrapper">
  <div class="debug">
    Elapsed: {(game.elapsed / 1000).toFixed(2)}<br/>
    Steering: {game.car.steering.toFixed(2)}<br/>
    Speed: {game.car.speed.toFixed(2)}<br/>
    X: {game.car.pos.x.toFixed(2)}<br/>
    Y: {game.car.pos.y.toFixed(2)}<br/>
    Sector: {currentSector + 1}<br/>
    Lap: {currentLap}<br/>
    Laps: {completedLaps}<br/>
    Best: {#if bestLap }<b>{(bestLap/1000).toFixed(3)}</b>{/if}<br/>
    {#each laps as {lap, time} }
      Lap {lap}: {time}<br/>
    {/each}
  </div>
  <div class="game">
    <canvas id="canvas" bind:this={canvas} {width} {height} ></canvas>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    margin: auto;
    width: 1800px;
    max-height: 1000px;
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
