<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectCard from './ProjectCard.svelte';
	import { scrollReveal } from '$lib/utils/gsap';
	import { theme } from '$lib/stores/theme';

	interface Props {
		projects: Project[];
		title: string;
		id?: string;
		first?: boolean;
		accent?: 'indigo' | 'teal' | 'orange' | 'purple' | 'pink';
	}

	let { projects, title, id = 'projects', first = false, accent = 'indigo' }: Props = $props();

	const light: Record<string, string> = {
		indigo: '#e8eaf6',
		teal:   '#e0f2f1',
		orange: '#fff3e0',
		purple: '#ede7f6',
		pink:   '#fce4ec',
	};

	const dark: Record<string, string> = {
		indigo: '#101020',
		teal:   '#0a1818',
		orange: '#1a1000',
		purple: '#120a1e',
		pink:   '#1a0810',
	};

	const stranger: Record<string, string> = {
		indigo: '#1a0505',
		teal:   '#1a0505',
		orange: '#1a0505',
		purple: '#1a0505',
		pink:   '#1a0505',
	};

	let sectionBg = $derived(
		$theme === 'dark'           ? dark[accent]     :
		$theme === 'strangerThings' ? stranger[accent]  :
		                              light[accent]
	);
</script>

<section class="projects-section" class:first {id} style="--section-bg: {sectionBg}">
	<div class="container">
		<div class="section-header" use:scrollReveal={{ y: 20 }}>
			<span class="section-arrow">▼</span>
			<h2 class="section-title">{title}</h2>
		</div>

		{#if projects.length > 0}
			<div class="projects-grid" use:scrollReveal={{ children: true, stagger: 0.1, y: 40 }}>
				{#each projects as project, i}
					<ProjectCard {project} index={i} />
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
		padding: 6rem 0;
		background-color: var(--section-bg);
		background-size: cover;
		background-position: center;
	}

	/* Fast gradient fade in from the 3D scene */
	.projects-section::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 90px;
		background: linear-gradient(to bottom, transparent, var(--section-bg));
		pointer-events: none;
		z-index: 2;
	}

	/* Fast gradient fade out to the 3D scene */
	.projects-section::after {
		content: '';
		position: absolute;
		inset: auto 0 0 0;
		height: 90px;
		background: linear-gradient(to top, transparent, var(--section-bg));
		pointer-events: none;
		z-index: 2;
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
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.empty-state {
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		padding: 2rem 0;
	}
</style>
