<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		project: Project;
		index: number;
		active?: boolean;
		onActivate?: (index: number) => void;
	}

	let { project, index, active = false, onActivate }: Props = $props();

	let arrowOnLeft = $state(true);
	let cardEl: HTMLElement;
	let tooltipStyle = $state('');
	const TOOLTIP_WIDTH = 300;
	const GAP = 14;

	function positionTooltip() {
		if (!cardEl) return;
		const rect = cardEl.getBoundingClientRect();
		const viewportWidth = window.innerWidth;

		let left = rect.right + GAP;
		arrowOnLeft = true;
		if (left + TOOLTIP_WIDTH > viewportWidth - 16) {
			left = rect.left - TOOLTIP_WIDTH - GAP;
			arrowOnLeft = false;
		}
		left = Math.max(16, left);

		const top = rect.top + rect.height / 2;
		tooltipStyle = `left:${left}px; top:${top}px;`;
	}

	function toggleTooltip(e: MouseEvent) {
		e.stopPropagation();
		if (!active) positionTooltip();
		onActivate?.(index);
	}

	$effect(() => {
		if (!active) return;
		const handler = () => onActivate?.(index);
		const id = setTimeout(() => window.addEventListener('click', handler), 0);
		return () => {
			clearTimeout(id);
			window.removeEventListener('click', handler);
		};
	});

	const specs = $derived([
		project.genre     && { label: 'Genre',    value: project.genre },
		project.stack     && { label: 'Stack',    value: project.stack },
		project.platform  && { label: 'Platform', value: project.platform },
		project.controls  && { label: 'Controls', value: project.controls },
		project.targetAudience && { label: 'Audience', value: project.targetAudience },
	].filter(Boolean) as { label: string; value: string }[]);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<article
	class="project-card"
	bind:this={cardEl}
	onclick={toggleTooltip}
	onkeydown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); positionTooltip(); onActivate?.(index); } }}
	role="button"
	tabindex="0"
>
	<div class="card-image-wrapper">
		<img src={project.image} alt={project.title} class="card-image" loading="lazy" />
		<div class="card-overlay">
			<span class="overlay-text">▶ OPEN</span>
		</div>
	</div>
	<div class="card-info">
		<span class="card-title">{project.title}</span>
		{#if project.genre}<span class="card-genre">{project.genre}</span>{/if}
	</div>
</article>

{#if active}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="tooltip"
		class:arrow-left={arrowOnLeft}
		class:arrow-right={!arrowOnLeft}
		style="{tooltipStyle} width:{TOOLTIP_WIDTH}px;"
		onclick={(e) => e.stopPropagation()}
	>
		<h3 class="tooltip-title">{project.title}</h3>
		<p class="tooltip-description">{project.description}</p>

		{#if specs.length > 0}
			<ul class="tooltip-specs">
				{#each specs as spec}
					<li class="spec-item">
						<span class="spec-label">{spec.label}</span>
						<span class="spec-value">{spec.value}</span>
					</li>
				{/each}
			</ul>
		{/if}

		<div class="tooltip-footer">
			<a href={project.url} target="_blank" rel="noopener noreferrer" class="github-btn">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				GitHub
			</a>
		</div>
	</div>
{/if}

<style>
	/* ---- Card ---- */
	.project-card {
		background: var(--color-background-themes);
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		cursor: pointer;
		overflow: visible;
		transition: border-color 0.15s ease;
	}

	.project-card:hover {
		border-color: var(--color-primary);
	}

	.card-image-wrapper {
		position: relative;
		overflow: hidden;
	}

	.card-image {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		display: block;
		transition: transform 0.3s ease;
	}

	.project-card:hover .card-image {
		transform: scale(1.03);
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.project-card:hover .card-overlay {
		opacity: 1;
	}

	.overlay-text {
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
	}

	.card-info {
		padding: 0.5rem 0.6rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid var(--color-muted);
		background: var(--color-background);
	}

	.card-title {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-heading);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card-genre {
		font-size: 0.6rem;
		color: var(--color-primary);
		font-family: var(--font-mono);
		letter-spacing: 0.05em;
		flex-shrink: 0;
		padding-left: 0.5rem;
	}

	/* ---- Tooltip ---- */
	.tooltip {
		position: fixed;
		z-index: 200;
		background: #1a1a1a;
		border: 1px solid #3a3a3a;
		border-radius: 2px;
		padding: 0.875rem;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
		transform: translateY(-50%);
		pointer-events: auto;
	}

	.tooltip::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		border: 7px solid transparent;
	}

	.tooltip.arrow-left::before {
		left: -13px;
		border-right-color: #3a3a3a;
	}

	.tooltip.arrow-right::before {
		right: -13px;
		border-left-color: #3a3a3a;
	}

	.tooltip-title {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-heading);
		margin: 0 0 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-muted);
	}

	.tooltip-description {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		line-height: 1.5;
		margin: 0 0 0.75rem;
	}

	.tooltip-specs {
		list-style: none;
		margin: 0 0 0.75rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.spec-item {
		display: flex;
		justify-content: space-between;
		font-size: 0.68rem;
		font-family: var(--font-mono);
	}

	.spec-label {
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.spec-value {
		color: var(--color-heading);
	}

	.tooltip-footer {
		border-top: 1px solid var(--color-muted);
		padding-top: 0.6rem;
	}

	.github-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem 0.6rem;
		background: var(--color-primary);
		color: #0d0d0d;
		border-radius: 2px;
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-decoration: none;
		transition: opacity 0.15s ease;
	}

	.github-btn:hover {
		opacity: 0.85;
	}
</style>
