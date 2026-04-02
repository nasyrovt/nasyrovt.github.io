<script lang="ts">
	import { T } from '@threlte/core';
	import { scrollY } from '$lib/stores/scroll';

	// Gently shift camera as user scrolls — creates parallax feeling
	let camY = $derived(-$scrollY * 0.0015);
</script>

<T.PerspectiveCamera makeDefault position={[0, camY, 5]} fov={60} />
