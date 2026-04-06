<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';

	let SceneComponent = $state<typeof import('$lib/three/Scene.svelte').default | null>(null);

	onMount(() => {
		import('$lib/three/Scene.svelte')
			.then((mod) => { SceneComponent = mod.default; })
			.catch(() => {});
	});

	let bg = $derived(
		$theme === 'dark'
			? 'radial-gradient(ellipse at 18% 55%, #071020 0%, transparent 52%), radial-gradient(ellipse at 82% 22%, #0d0820 0%, transparent 48%), radial-gradient(ellipse at 55% 85%, #050c14 0%, transparent 44%), #000000'
			: '#f0f2f8'
	);
</script>

<div class="scene-bg" style="background: {bg}">
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
