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
</script>

<section class="projects-section" class:first {id}>
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
</section>

<style>
	.projects-section {
		position: relative;
		padding: 6rem 0;
		background-color: var(--color-background-themes);
		/* Ready for background-image when provided */
		background-size: cover;
		background-position: center;
	}

	/* Gradient fade in at the top */
	.projects-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100px;
		background: linear-gradient(to bottom, transparent, var(--color-background-themes));
		pointer-events: none;
		z-index: 2;
	}

	/* Gradient fade out at the bottom */
	.projects-section::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100px;
		background: linear-gradient(to top, transparent, var(--color-background-themes));
		pointer-events: none;
		z-index: 2;
	}

	.container {
		position: relative;
		z-index: 3;
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
</style>
