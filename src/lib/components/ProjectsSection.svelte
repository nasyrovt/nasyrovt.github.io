<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectCard from './ProjectCard.svelte';
	import { scrollReveal } from '$lib/utils/gsap';

	interface Props {
		projects: Project[];
		title: string;
		id?: string;
		first?: boolean;
		accent?: 'indigo' | 'teal' | 'orange' | 'purple' | 'pink';
	}

	let { projects, title, id = 'projects', first = false, accent = 'indigo' }: Props = $props();

	const gradients: Record<string, string> = {
		indigo:  'linear-gradient(135deg, #4c51bf, #667eea)',
		teal:    'linear-gradient(135deg, #2c7a7b, #38b2ac)',
		orange:  'linear-gradient(135deg, #c05621, #ed8936)',
		purple:  'linear-gradient(135deg, #553c9a, #805ad5)',
		pink:    'linear-gradient(135deg, #97266d, #d53f8c)',
	};

	let sectionGradient = $derived(gradients[accent]);
</script>

<section class="projects-section" class:first {id}>
	{#if !first}
		<div class="divider-top">
			<svg viewBox="0 0 1440 80" preserveAspectRatio="none">
				<path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="var(--color-background)" />
			</svg>
		</div>
	{/if}

	<div class="projects-bg" style="--section-gradient: {sectionGradient}">
		{#if first}
			<div class="emerge-gradient"></div>
		{/if}

		<!-- Gradient colour overlay -->
		<div class="accent-overlay"></div>

		<div class="container">
			<h2 class="section-title" use:scrollReveal={{ y: 30 }}>{title}</h2>

			{#if projects.length > 0}
				<div class="projects-grid" use:scrollReveal={{ children: true, stagger: 0.1, y: 40 }}>
					{#each projects as project, i}
						<ProjectCard {project} index={i} />
					{/each}
				</div>
			{:else}
				<p class="empty-state">Coming soon — professional projects will be listed here.</p>
			{/if}
		</div>
	</div>

	<div class="divider-bottom">
		<svg viewBox="0 0 1440 80" preserveAspectRatio="none">
			<path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="var(--color-background)" />
		</svg>
	</div>
</section>

<style>
	.projects-section {
		position: relative;
	}

	.projects-bg {
		background-color: var(--color-background-themes);
		padding: 4rem 0;
		transition: background-color 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.first .projects-bg {
		padding-top: 5rem;
	}

	/* Gradient colour tint — sits behind content, above base bg */
	.accent-overlay {
		position: absolute;
		inset: 0;
		background: var(--section-gradient);
		opacity: 0.07;
		pointer-events: none;
		z-index: 0;
		transition: opacity 0.3s ease;
	}

	[data-theme='dark'] .accent-overlay {
		opacity: 0.13;
	}

	[data-theme='strangerThings'] .accent-overlay {
		opacity: 0;
	}

	/* Content above overlay */
	.container {
		position: relative;
		z-index: 1;
	}

	.emerge-gradient {
		position: absolute;
		top: -140px;
		left: 0;
		right: 0;
		height: 140px;
		background: linear-gradient(to bottom, transparent, var(--color-background-themes));
		pointer-events: none;
		z-index: 1;
	}

	.section-title {
		font-size: clamp(2rem, 4vw, 3rem);
		text-align: center;
		margin: 0 0 3rem;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		font-size: 1rem;
		padding: 2rem 0;
	}

	.divider-top,
	.divider-bottom {
		line-height: 0;
	}

	.divider-top svg,
	.divider-bottom svg {
		width: 100%;
		height: 80px;
		display: block;
	}
</style>
