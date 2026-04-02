<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { scrollReveal } from '$lib/utils/gsap';

	let { data } = $props();
	let metadata = $derived(data.metadata);
	let Content = $derived(data.content);
</script>

<SEO title={metadata.title} description="{metadata.title} — {metadata.genre}" image={metadata.image} />

<article class="project-detail">
	<div class="container">
		<a href="/" class="back-link">← Back to Home</a>

		<header class="project-header" use:scrollReveal={{ y: 30 }}>
			<h1>{metadata.title}</h1>
		</header>

		<div class="project-layout" use:scrollReveal={{ y: 40, delay: 0.2 }}>
			<div class="project-image-wrapper">
				<img src={metadata.image} alt={metadata.title} class="project-image" />
			</div>

			<aside class="project-meta">
				<div class="meta-grid">
					<div class="meta-item">
						<span class="meta-label">Genre</span>
						<span class="meta-value">{metadata.genre}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Stack</span>
						<span class="meta-value">{metadata.stack}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Audience</span>
						<span class="meta-value">{metadata.targetAudience}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Controls</span>
						<span class="meta-value">{metadata.controls}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Platform</span>
						<span class="meta-value">{metadata.platform}</span>
					</div>
				</div>
			</aside>
		</div>

		<div class="project-content" use:scrollReveal={{ y: 30, delay: 0.3 }}>
			<Content />
		</div>
	</div>
</article>

<style>
	.project-detail {
		padding: 2rem 0 4rem;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 2rem;
		color: var(--color-primary);
		font-weight: 600;
		transition: transform 0.2s ease;
	}

	.back-link:hover {
		transform: translateX(-4px);
		opacity: 1;
	}

	.project-header h1 {
		font-size: clamp(2rem, 4vw, 3rem);
		margin: 0 0 2rem;
	}

	.project-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	@media (min-width: 768px) {
		.project-layout {
			grid-template-columns: 2fr 1fr;
		}
	}

	.project-image {
		width: 100%;
		height: auto;
		border-radius: 1rem;
		display: block;
	}

	.project-meta {
		background: var(--color-background-themes);
		border: 1px solid var(--color-muted);
		border-radius: 1rem;
		padding: 1.5rem;
		height: fit-content;
	}

	.meta-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.meta-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
	}

	.meta-value {
		font-size: 0.95rem;
		color: var(--color-heading);
		font-weight: 500;
	}

	.project-content {
		max-width: 720px;
	}

	.project-content :global(h3) {
		font-size: 1.5rem;
		margin: 2rem 0 1rem;
	}

	.project-content :global(p) {
		line-height: 1.7;
		color: var(--color-text);
		margin: 0 0 1rem;
	}
</style>
