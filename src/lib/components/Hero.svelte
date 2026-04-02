<script lang="ts">
	import { onMount } from 'svelte';
	import { siteMetadata } from '$lib/data/site';
	import { gsap } from '$lib/utils/gsap';

	onMount(() => {
		const tl = gsap.timeline({ delay: 0.4 });
		tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
			.from('.hero-name', { opacity: 0, y: 50, duration: 0.9, ease: 'power2.out' }, '-=0.3')
			.from('.hero-tagline', { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' }, '-=0.4')
			.from('.hero-scroll', { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.1');
		return () => tl.kill();
	});
</script>

<section class="hero">
	<!-- Vignette so text stays readable over the 3D scene -->
	<div class="hero-vignette"></div>

	<div class="hero-content">
		<span class="hero-eyebrow">Hi, I'm</span>
		<h1 class="hero-name">
			<span class="gradient-text">{siteMetadata.author}</span>
		</h1>
		<p class="hero-tagline">Game Developer & Creative Technologist</p>
	</div>

	<div class="hero-scroll">
		<div class="scroll-line"></div>
		<span class="scroll-label">scroll</span>
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
		/* Transparent — 3D scene shows through */
		background: transparent;
		overflow: hidden;
	}

	/* Subtle radial vignette — darkens edges, keeps center text legible */
	.hero-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse 80% 80% at 50% 50%,
			transparent 40%,
			var(--color-background) 100%
		);
		opacity: 0.5;
		pointer-events: none;
		z-index: 0;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		padding: 0 1rem;
	}

	.hero-eyebrow {
		display: block;
		font-size: clamp(1rem, 2vw, 1.25rem);
		font-weight: 500;
		color: var(--color-text-muted);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 0.75rem;
	}

	.hero-name {
		font-size: clamp(3rem, 9vw, 7rem);
		font-weight: 700;
		line-height: 1;
		margin: 0 0 1.25rem;
	}

	.gradient-text {
		background-image: var(--gradient-indigo);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global([data-theme='strangerThings']) .gradient-text {
		background-image: none;
		-webkit-text-fill-color: var(--color-heading);
	}

	.hero-tagline {
		font-size: clamp(1rem, 2.5vw, 1.4rem);
		color: var(--color-text-muted);
		font-weight: 400;
		margin: 0;
		letter-spacing: 0.02em;
	}

	/* Scroll indicator */
	.hero-scroll {
		position: absolute;
		bottom: 2.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		z-index: 1;
	}

	.scroll-line {
		width: 1px;
		height: 48px;
		background: linear-gradient(to bottom, var(--color-primary), transparent);
		animation: scroll-pulse 2s ease-in-out infinite;
		transform-origin: top;
	}

	.scroll-label {
		font-size: 0.65rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	@keyframes scroll-pulse {
		0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
		50%       { opacity: 1;   transform: scaleY(1); }
	}
</style>
