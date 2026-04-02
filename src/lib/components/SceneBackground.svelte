<script lang="ts">
	import { onMount } from 'svelte';

	let SceneComponent = $state<typeof import('$lib/three/Scene.svelte').default | null>(null);

	onMount(() => {
		import('$lib/three/Scene.svelte')
			.then((mod) => { SceneComponent = mod.default; })
			.catch(() => {});
	});
</script>

<div class="scene-bg">
	{#if SceneComponent}
		<SceneComponent />
	{/if}
</div>

<style>
	.scene-bg {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}
</style>
