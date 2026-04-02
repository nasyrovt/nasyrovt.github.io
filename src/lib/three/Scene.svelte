<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Camera from './Camera.svelte';
	import GeometricShapes from './GeometricShapes.svelte';
	import Particles from './Particles.svelte';
	import Lights from './Lights.svelte';
</script>

<div class="scene-container">
	<Canvas>
		<Camera />
		<Lights />
		<GeometricShapes />
		<Particles />
	</Canvas>
</div>

<style>
	.scene-container {
		width: 100%;
		height: 100%;
	}
</style>
