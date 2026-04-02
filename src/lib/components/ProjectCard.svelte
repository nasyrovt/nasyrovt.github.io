<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		project: Project;
		index: number;
	}

	let { project, index }: Props = $props();

	let tooltipVisible = $state(false);
	let arrowOnLeft = $state(true);
	let cardEl: HTMLElement;
	let tooltipStyle = $state('');
	const TOOLTIP_WIDTH = 300;
	const GAP = 14;

	function positionTooltip() {
		if (!cardEl) return;
		const rect = cardEl.getBoundingClientRect();
		const viewportWidth = window.innerWidth;

		// Prefer right side; fall back to left
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
		if (tooltipVisible) {
			tooltipVisible = false;
		} else {
			positionTooltip();
			tooltipVisible = true;
		}
	}

	function hideTooltip() {
		tooltipVisible = false;
	}

	$effect(() => {
		if (!tooltipVisible) return;
		const handler = () => hideTooltip();
		// Defer so the opening click doesn't immediately close the tooltip
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
	onkeydown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); positionTooltip(); tooltipVisible = !tooltipVisible; } }}
	role="button"
	tabindex="0"
>
	<div class="card-image-wrapper">
		<img src={project.image} alt={project.title} class="card-image" loading="lazy" />
		<div class="card-overlay">
			<span class="overlay-text">Click for details</span>
		</div>
	</div>
	<p class="card-title">{project.title}</p>
</article>

{#if tooltipVisible}
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
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				GitHub
			</a>
		</div>
	</div>
{/if}

<style>
	.project-card {
		cursor: pointer;
		border-radius: 0.75rem;
		overflow: visible;
		transition: transform 0.3s ease;
	}

	.project-card:hover {
		transform: translateY(-4px);
	}

	.card-image-wrapper {
		position: relative;
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.card-image {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		display: block;
		transition: transform 0.4s ease;
	}

	.project-card:hover .card-image {
		transform: scale(1.04);
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-card:hover .card-overlay {
		opacity: 1;
	}

	.overlay-text {
		color: white;
		font-weight: 600;
		font-size: 0.85rem;
		letter-spacing: 0.02em;
	}

	.card-title {
		margin: 0.5rem 0 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-heading);
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ---- Tooltip ---- */
	.tooltip {
		position: fixed;
		z-index: 200;
		background: var(--color-background);
		border: 1px solid var(--color-muted);
		border-radius: 0.875rem;
		padding: 1.25rem;
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
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
		border-right-color: var(--color-muted);
	}

	.tooltip.arrow-right::before {
		right: -13px;
		border-left-color: var(--color-muted);
	}

	.tooltip-title {
		font-size: 1rem;
		font-weight: 700;
		margin: 0 0 0.5rem;
		color: var(--color-heading);
	}

	.tooltip-description {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		line-height: 1.55;
		margin: 0 0 0.875rem;
	}

	.tooltip-specs {
		list-style: none;
		margin: 0 0 1rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		border-top: 1px solid var(--color-muted);
		padding-top: 0.75rem;
	}

	.spec-item {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		font-size: 0.78rem;
	}

	.spec-label {
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-text-muted);
		flex-shrink: 0;
	}

	.spec-value {
		color: var(--color-heading);
		text-align: right;
	}

	.tooltip-footer {
		border-top: 1px solid var(--color-muted);
		padding-top: 0.75rem;
	}

	.github-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 1rem;
		background: var(--gradient-dark-indigo);
		color: white;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 600;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.github-btn:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}
</style>
