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
		if (window.innerWidth < 640) {
			tooltipStyle = '';
			arrowOnLeft = true;
			return;
		}
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
		style={tooltipStyle ? `${tooltipStyle} width:${TOOLTIP_WIDTH}px;` : ''}
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
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
					<polyline points="15 3 21 3 21 9"/>
					<line x1="10" y1="14" x2="21" y2="3"/>
				</svg>
				Visit
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

	@media (max-width: 639px) {
		.tooltip {
			position: fixed;
			inset: auto 0 0 0;
			transform: none;
			width: 100%;
			max-height: 60vh;
			overflow-y: auto;
			border-radius: 4px 4px 0 0;
			z-index: 500;
		}

		.tooltip::before {
			display: none;
		}
	}
</style>
