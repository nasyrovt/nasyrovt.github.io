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

	const colors: Record<string, string> = {
		indigo:  '76, 81, 191',
		teal:    '44, 122, 123',
		orange:  '192, 86, 33',
		purple:  '85, 60, 154',
		pink:    '151, 38, 109',
	};

	let rgb = $derived(colors[accent] ?? colors.indigo);
</script>

<section class="projects-section" {id} style="--accent-rgb: {rgb}">
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
		padding: 8rem 0;
		/* Fades in from transparent at top, solid in middle, fades out at bottom */
		background: linear-gradient(
			to bottom,
			transparent 0%,
			rgba(var(--accent-rgb), 0.12) 20%,
			rgba(var(--accent-rgb), 0.12) 80%,
			transparent 100%
		);
	}

	.container {
		position: relative;
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
</style>
