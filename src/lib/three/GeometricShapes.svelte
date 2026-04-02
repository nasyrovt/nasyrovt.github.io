<script lang="ts">
	import { T } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { theme } from '$lib/stores/theme';

	let wireColor = $derived(
		$theme === 'strangerThings' ? '#e53e3e' : $theme === 'dark' ? '#81e6d9' : '#667eea'
	);

	let accentColor = $derived(
		$theme === 'strangerThings' ? '#fc8181' : $theme === 'dark' ? '#f6ad55' : '#ed8936'
	);
</script>

<Float floatIntensity={2} speed={2}>
	<T.Mesh position={[0, 0.5, 0]}>
		<T.IcosahedronGeometry args={[1, 0]} />
		<T.MeshStandardMaterial color={wireColor} wireframe />
	</T.Mesh>
</Float>

<Float floatIntensity={1.5} speed={1.5}>
	<T.Mesh position={[-2, -0.5, -1]} rotation.z={0.5}>
		<T.OctahedronGeometry args={[0.6, 0]} />
		<T.MeshStandardMaterial color={accentColor} wireframe />
	</T.Mesh>
</Float>

<Float floatIntensity={1} speed={3}>
	<T.Mesh position={[2, 1, -1.5]}>
		<T.TorusGeometry args={[0.5, 0.2, 16, 32]} />
		<T.MeshStandardMaterial color={wireColor} wireframe />
	</T.Mesh>
</Float>

<Float floatIntensity={1.8} speed={1.2}>
	<T.Mesh position={[1.5, -1, 0.5]} rotation.x={0.8}>
		<T.DodecahedronGeometry args={[0.5, 0]} />
		<T.MeshStandardMaterial color={accentColor} wireframe />
	</T.Mesh>
</Float>
