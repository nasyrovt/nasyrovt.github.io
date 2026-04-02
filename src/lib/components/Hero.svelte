<script lang="ts">
	import { onMount } from 'svelte';
	import { siteMetadata } from '$lib/data/site';
	import Circle from './shapes/Circle.svelte';
	import Donut from './shapes/Donut.svelte';
	import CircleGrid from './shapes/CircleGrid.svelte';
	import { gsap } from '$lib/utils/gsap';

	let stars = $state(0);
	let SceneComponent = $state<typeof import('$lib/three/Scene.svelte').default | null>(null);
	let heroEl: HTMLElement;

	onMount(async () => {
		// Fetch GitHub stars
		try {
			const res = await fetch(`https://api.github.com/users/${siteMetadata.github}`);
			const data = await res.json();
			stars = data.public_repos ?? 0;
		} catch {
			stars = 0;
		}

		// Dynamic import 3D scene (client only)
		try {
			const mod = await import('$lib/three/Scene.svelte');
			SceneComponent = mod.default;
		} catch {
			// 3D not available
		}

		// GSAP hero animations
		const tl = gsap.timeline({ delay: 0.2 });
		tl.from('.hero-title', { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out' })
			.from('.hero-tagline', { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' }, '-=0.3')
			.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3')
			.from('.hero-stars', { opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.out' }, '-=0.2')
			.from('.hero-3d', { opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.4');

		return () => tl.kill();
	});
</script>

<section class="hero" bind:this={heroEl}>
	<div class="hero-inner container">
		<div class="hero-content">
			<h1 class="hero-title">
				Hi, I'm <span class="gradient-text">{siteMetadata.author}</span>
			</h1>
			<p class="hero-tagline">Game Developer & Creative Technologist</p>
			<p class="hero-subtitle">
				Building immersive experiences with Unreal Engine, Unity, and modern web technologies.
			</p>
			<a
				href="https://github.com/{siteMetadata.github}"
				target="_blank"
				rel="noopener noreferrer"
				class="hero-stars"
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
					<path
						d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
					/>
				</svg>
				{stars} Public Repos
			</a>
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

	.hero-stars {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.25rem;
		background: var(--color-background-themes);
		border: 1px solid var(--color-muted);
		border-radius: 0.5rem;
		color: var(--color-text);
		font-size: 0.875rem;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.hero-stars:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--color-shadow);
		opacity: 1;
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
