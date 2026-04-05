<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SceneBackground from '$lib/components/SceneBackground.svelte';
	import BlueprintPanel from '$lib/components/BlueprintPanel.svelte';
	import { theme } from '$lib/stores/theme';
	import { scrollY } from '$lib/stores/scroll';
	import { blueprintPanelWidth, blueprintResizing } from '$lib/stores/blueprintPanel';
	import { onMount } from 'svelte';

	let { children } = $props();
	let bpWidth = $state(0);
	let bpResizing = $state(false);

	blueprintPanelWidth.subscribe(w => { bpWidth = w; });
	blueprintResizing.subscribe(r => { bpResizing = r; });

	onMount(() => {
		theme.init();

		const handleScroll = () => scrollY.set(window.scrollY);
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<SceneBackground />
<BlueprintPanel />
<div
	class="site-content"
	style="padding-left: {bpWidth}vw; --bp-offset: {bpWidth}vw; --bp-transition: {bpResizing ? 'none' : '0.25s cubic-bezier(0.4, 0, 0.2, 1)'}"
>
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.site-content {
		transition: padding-left var(--bp-transition, 0.25s cubic-bezier(0.4, 0, 0.2, 1));
		min-height: 100vh;
	}
</style>
