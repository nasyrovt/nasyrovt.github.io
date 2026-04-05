<script lang="ts">
	import { onMount } from 'svelte';
	import { siteMetadata } from '$lib/data/site';
	import { gsap } from '$lib/utils/gsap';
	import { scrollY } from '$lib/stores/scroll';

	interface Props {
		name?: string;
	}
	let { name = siteMetadata.author }: Props = $props();

	let vh = $state(800);
	let nameEl = $state<HTMLHeadingElement | undefined>(undefined);
	let displayName = $state(siteMetadata.author);

	onMount(() => {
		vh = window.innerHeight;
		const onResize = () => { vh = window.innerHeight; };
		window.addEventListener('resize', onResize);

		const tl = gsap.timeline({ delay: 0.4 });
		tl.from('.hero-label',  { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
		  .from('.hero-name',   { opacity: 0, y: 50, duration: 0.9, ease: 'power2.out' }, '-=0.3')
		  .from('.hero-scroll', { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.2');

		return () => {
			tl.kill();
			window.removeEventListener('resize', onResize);
		};
	});

	$effect(() => {
		displayName = name;
	});

	let heroOpacity = $derived(Math.max(0, 1 - $scrollY / vh));
</script>

<section class="hero">
	<!-- Background decorations — fade out -->
	<div class="hero-bg" style="opacity: {heroOpacity}" aria-hidden="true">
		<div class="viewport-grid"></div>
		<div class="hero-vignette"></div>
	</div>

	<div class="hero-content">
		<span class="hero-label" style="opacity: {heroOpacity}">// PORTFOLIO</span>
		<!-- Name stays visible, changes text -->
		<h1 class="hero-name" bind:this={nameEl}>{displayName}</h1>
	</div>

	<div class="hero-coords" style="opacity: {heroOpacity}">UE5 / C++ / UNITY</div>

	<div class="hero-scroll" style="opacity: {heroOpacity}">
		<div class="scroll-line"></div>
	</div>
</section>

<style>
	.hero {
		position: sticky;
		top: 0;
		z-index: 1;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		background: transparent;
		overflow: hidden;
	}

	/* Background layer */
	.hero-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.viewport-grid {
		position: absolute;
		inset: 0;
		z-index: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
		background-size: 40px 40px;
	}

	.hero-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse 80% 80% at 50% 50%,
			transparent 40%,
			var(--color-background) 100%
		);
		opacity: 0.3;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		padding: 0 1rem;
	}

	.hero-label {
		display: block;
		font-family: var(--font-mono), monospace;
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-primary);
		margin-bottom: 1rem;
	}

	.hero-name {
		font-size: clamp(3.5rem, 10vw, 8rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 0.9;
		text-transform: uppercase;
		color: var(--color-heading);
		margin: 0 0 1.25rem;
	}


	.hero-coords {
		position: absolute;
		bottom: 2rem;
		left: 2rem;
		font-family: var(--font-mono), monospace;
		font-size: 0.6rem;
		color: var(--color-text-muted);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		z-index: 1;
		pointer-events: none;
	}

	.hero-scroll {
		position: absolute;
		bottom: 2.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 1;
	}

	.scroll-line {
		width: 1px;
		height: 48px;
		background: linear-gradient(to bottom, var(--color-primary), transparent);
		animation: scroll-pulse 2s ease-in-out infinite;
		transform-origin: top;
	}

	@keyframes scroll-pulse {
		0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
		50%       { opacity: 1;   transform: scaleY(1); }
	}
</style>
