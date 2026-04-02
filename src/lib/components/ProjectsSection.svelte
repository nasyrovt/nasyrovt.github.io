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
