<script lang="ts">
	import { onMount } from 'svelte';
	import { siteMetadata } from '$lib/data/site';
	import { gsap } from '$lib/utils/gsap';

	onMount(() => {
		const tl = gsap.timeline({ delay: 0.4 });
		tl.from('.hero-label', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
			.from('.hero-name', { opacity: 0, y: 50, duration: 0.9, ease: 'power2.out' }, '-=0.3')
			.from('.hero-tagline', { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' }, '-=0.4')
			.from('.hero-scroll', { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.1');
		return () => tl.kill();
	});
</script>

<section class="hero">
	<!-- Subtle viewport grid lines -->
	<div class="viewport-grid" aria-hidden="true"></div>

	<!-- Subtle vignette -->
	<div class="hero-vignette" aria-hidden="true"></div>

	<div class="hero-content">
		<span class="hero-label">// PORTFOLIO</span>
		<h1 class="hero-name">{siteMetadata.author}</h1>
		<p class="hero-tagline">Game Developer & Creative Technologist</p>
	</div>

	<!-- Bottom-left corner info -->
	<div class="hero-coords">UE5 / C++ / UNITY</div>

	<div class="hero-scroll">
		<div class="scroll-line"></div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		background: transparent;
		overflow: hidden;
	}

	/* CSS grid lines mimicking UE viewport grid */
	.viewport-grid {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
		background-size: 40px 40px;
	}

	/* Very subtle vignette */
	.hero-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse 80% 80% at 50% 50%,
			transparent 40%,
			var(--color-background) 100%
		);
		opacity: 0.3;
		pointer-events: none;
		z-index: 0;
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

	.hero-tagline {
		font-size: clamp(0.8rem, 1.5vw, 1rem);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		font-weight: 400;
		margin: 0;
	}

	/* Bottom-left coordinates label */
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

	/* Scroll indicator — line only, no label */
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
