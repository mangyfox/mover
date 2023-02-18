<script>
  import ControlsHandler from './util/ControlsHandler.js';
  import InputDebug from './debug/InputDebug.svelte';
  import DebugScene from './components/DebugScene.svelte';
  import Car from './util/Car.js';
  import CarDebug from './debug/carDebug.svelte';
  import GripDebug from './debug/gripDebug.svelte';

  const controls = new ControlsHandler();
  const car = new Car();

</script>

<main>
  <div class="inner">
    <InputDebug controls={controls} />
    <CarDebug car={car} />
    <GripDebug car={car} />
  </div>
  <DebugScene controls={controls} car={car} />
</main>

<style>
  main {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .inner {
    position: absolute;
    display: flex;
    gap: 1rem;
    top: 0;
    left: 0;
    padding: 1rem;
    z-index: 20;
  }
</style>
