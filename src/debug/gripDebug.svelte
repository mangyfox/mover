<script>
export let car;

</script>

<div class="grip-debug">
  <h4>Grip</h4>
  <div class="slider">
    <input type="range" bind:value={ car.grip } min="0.1" max="1" step="0.05">
  </div>
  <div class="value">
    { car.grip }
  </div>
</div>

<style>
  .grip-debug {
    padding: 1rem;
    background: rgba(255,255,255,0.2);
  }

  h4 {
    margin: 0 0 1rem;
    text-align: center;
  }
</style>
