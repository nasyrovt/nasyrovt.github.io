<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectCard from './ProjectCard.svelte';
	import { scrollReveal } from '$lib/utils/gsap';

	interface Props {
		projects: Project[];
		title: string;
		id?: string;
	}

	let { projects, title, id = 'projects' }: Props = $props();
</script>

<section class="projects-section" {id}>
	<!-- Curved SVG divider top -->
	<div class="divider-top">
		<svg viewBox="0 0 1440 80" preserveAspectRatio="none">
			<path
				d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
				fill="var(--color-background)"
			/>
		</svg>
	</div>

	<div class="projects-bg">
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

	<!-- Curved SVG divider bottom -->
	<div class="divider-bottom">
		<svg viewBox="0 0 1440 80" preserveAspectRatio="none">
			<path
				d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z"
				fill="var(--color-background)"
			/>
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
