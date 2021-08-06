<script>
	import Mover from './Mover.svelte';
	import TrackBuilder from './TrackBuilder.svelte';
	import ControlsHandler from './util/ControlsHandler.js';

	let controlsHandler = new ControlsHandler();

	let editing = false;
</script>

<main>
	<h1>Mover</h1>

	{#if editing}
		<TrackBuilder />
	{:else}
		<Mover {controlsHandler} />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
