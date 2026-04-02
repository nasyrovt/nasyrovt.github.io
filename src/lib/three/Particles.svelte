<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { theme } from '$lib/stores/theme';

	const COUNT = 500;
	const positions = new Float32Array(COUNT * 3);

	for (let i = 0; i < COUNT; i++) {
		positions[i * 3] = (Math.random() - 0.5) * 20;
		positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
		positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	let pointColor = $derived(
		$theme === 'strangerThings' ? '#e53e3e' : $theme === 'dark' ? '#81e6d9' : '#667eea'
	);

	let pointsRef: THREE.Points | undefined = $state();

	useTask((delta) => {
		if (pointsRef) {
			pointsRef.rotation.y += delta * 0.02;
			pointsRef.rotation.x += delta * 0.01;
		}
	});
</script>

<T.Points bind:ref={pointsRef}>
	<T is={geometry} />
	<T.PointsMaterial size={0.05} color={pointColor} sizeAttenuation transparent opacity={0.6} />
</T.Points>
