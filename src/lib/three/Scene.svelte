<script lang="ts">
	import { Canvas } from '@threlte/core';
	import GeometricShapes from './GeometricShapes.svelte';
	import Particles from './Particles.svelte';
	import Lights from './Lights.svelte';
</script>

<div class="scene-container">
	<Canvas>
		<Lights />
		<GeometricShapes />
		<Particles />
	</Canvas>
</div>

<style>
	.scene-container {
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
	}
</style>
