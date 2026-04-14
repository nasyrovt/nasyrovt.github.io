<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectCard from './ProjectCard.svelte';
	import { scrollReveal } from '$lib/utils/gsap';
	interface Props {
		projects: Project[];
		title: string;
		id?: string;
		first?: boolean;
	}

	let { projects, title, id = 'projects', first = false }: Props = $props();

	let activeCardIndex = $state<number | null>(null);

	let cols = $derived(
		projects.length <= 1 ? 1 :
		projects.length <= 2 ? 2 :
		projects.length <= 4 ? 3 :
		4
	);
</script>

<section class="projects-section" class:first {id}>
	<div class="container">
		<div class="section-header" use:scrollReveal={{ y: 20 }}>
			<span class="section-arrow">▼</span>
			<h2 class="section-title">{title}</h2>
		</div>

		{#if projects.length > 0}
			<div class="projects-grid" style="--cols: {cols}" use:scrollReveal={{ children: true, stagger: 0.1, y: 40 }}>
				{#each projects as project, i}
					<ProjectCard
					{project}
					index={i}
					active={activeCardIndex === i}
					onActivate={(idx) => { activeCardIndex = activeCardIndex === idx ? null : idx; }}
				/>
				{/each}
			</div>
		{:else}
			<p class="empty-state">— No projects found. Coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.projects-section {
		position: relative;
		z-index: 2;
		padding: 6rem 0;
		margin-bottom: 12rem;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-background-themes) 88%, var(--color-primary)) 0%,
			var(--color-background-themes) 50%,
			color-mix(in srgb, var(--color-background-themes) 88%, var(--color-secondary)) 100%
		);
	}

	.container {
		position: relative;
		z-index: 3;
	}

	/* UE panel header bar */
	.section-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--color-muted);
		margin-bottom: 2rem;
	}

	.section-arrow {
		color: var(--color-primary);
		font-size: 0.7rem;
		line-height: 1;
	}

	.section-title {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-text-muted);
		margin: 0;
	}

	.projects-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5rem;
	}

	.projects-grid :global(.project-card) {
		flex: 0 0 calc((100% - (var(--cols, 4) - 1) * 1.5rem) / var(--cols, 4));
	}

	@media (max-width: 900px) {
		.projects-grid :global(.project-card) {
			flex: 0 0 calc((100% - 1.5rem) / 2);
		}
	}

	@media (max-width: 560px) {
		.projects-grid :global(.project-card) {
			flex: 0 0 100%;
		}
	}

	.empty-state {
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		padding: 2rem 0;
	}
</style>
