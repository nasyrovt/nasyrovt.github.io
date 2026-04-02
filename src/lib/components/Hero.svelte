<script lang="ts">
	import { onMount } from 'svelte';
	import { siteMetadata } from '$lib/data/site';
	import Circle from './shapes/Circle.svelte';
	import Donut from './shapes/Donut.svelte';
	import CircleGrid from './shapes/CircleGrid.svelte';
	import { gsap } from '$lib/utils/gsap';

	let SceneComponent = $state<typeof import('$lib/three/Scene.svelte').default | null>(null);

	onMount(() => {
		// Dynamic import 3D scene (client only)
		import('$lib/three/Scene.svelte')
			.then((mod) => { SceneComponent = mod.default; })
			.catch(() => {});

		// GSAP hero animations
		const tl = gsap.timeline({ delay: 0.2 });
		tl.from('.hero-title', { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out' })
			.from('.hero-tagline', { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' }, '-=0.3')
			.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3')
			.from('.hero-3d', { opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.4');

		return () => tl.kill();
	});
</script>

<section class="hero">
	<div class="hero-inner container">
		<div class="hero-content">
			<h1 class="hero-title">
				Hi, I'm <span class="gradient-text">{siteMetadata.author}</span>
			</h1>
			<p class="hero-tagline">Game Developer & Creative Technologist</p>
			<p class="hero-subtitle">
				Building immersive experiences with Unreal Engine, Unity, and modern web technologies.
			</p>
		</div>

		<div class="hero-visual">
			<div class="hero-3d">
				{#if SceneComponent}
					<SceneComponent />
				{/if}
			</div>

			<!-- Decorative shapes -->
			<div class="hero-shapes">
				<div class="shape-1 animate-float">
					<Circle color="blue" size="120px" />
				</div>
				<div class="shape-2 animate-float-slow">
					<Donut color="orange" size="80px" />
				</div>
				<div class="shape-3 animate-float">
					<Circle color="pink" size="60px" />
				</div>
				<div class="shape-4">
					<CircleGrid />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		padding: 4rem 0 6rem;
		position: relative;
		overflow: hidden;
		min-height: 80vh;
		display: flex;
		align-items: center;
	}

	.hero-inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;
	}

	@media (min-width: 900px) {
		.hero-inner {
			grid-template-columns: 1fr 1fr;
		}
	}

	.hero-content {
		position: relative;
		z-index: 2;
	}

	.hero-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		margin: 0 0 1rem;
		line-height: 1.1;
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
		font-size: clamp(1.125rem, 2.5vw, 1.5rem);
		color: var(--color-text-muted);
		margin: 0 0 1rem;
		font-weight: 500;
	}

	.hero-subtitle {
		font-size: 1rem;
		color: var(--color-text-muted);
		margin: 0 0 2rem;
		max-width: 500px;
		line-height: 1.6;
	}

	.hero-visual {
		position: relative;
		min-height: 400px;
		display: none;
	}

	@media (min-width: 900px) {
		.hero-visual {
			display: block;
		}
	}

	.hero-3d {
		width: 100%;
		height: 400px;
		position: relative;
		z-index: 1;
	}

	.hero-shapes {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}

	.shape-1 {
		position: absolute;
		top: -20px;
		right: -40px;
	}

	.shape-2 {
		position: absolute;
		bottom: 40px;
		left: -30px;
	}

	.shape-3 {
		position: absolute;
		top: 50%;
		right: 20%;
	}

	.shape-4 {
		position: absolute;
		bottom: -10px;
		right: 10%;
	}
</style>
