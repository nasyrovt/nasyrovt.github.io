<script lang="ts">
	import { T } from '@threlte/core';
	import { theme } from '$lib/stores/theme';

	let lightColor = $derived($theme === 'dark' ? '#81e6d9' : '#667eea');
</script>

<T.AmbientLight intensity={0.4} />
<T.DirectionalLight position={[5, 5, 5]} intensity={0.6} />
<T.PointLight position={[-3, 2, 4]} intensity={0.8} color={lightColor} />
