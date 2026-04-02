<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SceneBackground from '$lib/components/SceneBackground.svelte';
	import { theme } from '$lib/stores/theme';
	import { scrollY } from '$lib/stores/scroll';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();

		const handleScroll = () => scrollY.set(window.scrollY);
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<SceneBackground />
<Header />
<main>
	{@render children()}
</main>
<Footer />
