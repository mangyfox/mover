<script>
	import Mover from './Mover.svelte';
	import Mover3D from './Mover3D.svelte';
	import TrackBuilder from './TrackBuilder.svelte';

	//Toggle this to enable track creation.
	let editing = false;
</script>

<main>
	<h1>Mover</h1>

	{#if editing}
		<TrackBuilder />
	{:else}
		<Mover />
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
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
