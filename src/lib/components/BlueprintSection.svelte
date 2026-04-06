<script lang="ts">
	import BlueprintEditor from './BlueprintEditor.svelte';
	import { scrollReveal } from '$lib/utils/gsap';
	import { theme } from '$lib/stores/theme';

	let sectionBg = $derived(
		$theme === 'dark' ? '#080c10' : '#e8eaf6'
	);
</script>

<section class="blueprint-section" id="blueprint" style="--section-bg: {sectionBg}">
	<div class="container">
		<div class="panel-header" use:scrollReveal={{ y: 20 }}>
			<span class="panel-arrow">▼</span>
			<h2 class="panel-title">BLUEPRINT</h2>
			<span class="panel-tag">INTERACTIVE</span>
		</div>

		<p class="panel-desc" use:scrollReveal={{ y: 16 }}>
			A live Blueprint graph — drag nodes, connect execution pins, disconnect by clicking a wire.
		</p>

		<div class="editor-wrapper" use:scrollReveal={{ y: 30 }}>
			<BlueprintEditor />
		</div>
	</div>
</section>

<style>
	.blueprint-section {
		padding: 5rem 0 4rem;
		position: relative;
		background-color: var(--section-bg);
	}

	.blueprint-section::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 90px;
		background: linear-gradient(to bottom, transparent, var(--section-bg));
		pointer-events: none;
		z-index: 2;
	}

	.blueprint-section::after {
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
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.panel-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--color-muted);
		margin-bottom: 0.75rem;
	}

	.panel-arrow {
		color: var(--color-primary);
		font-size: 0.75rem;
		line-height: 1;
	}

	.panel-title {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-text-muted);
		margin: 0;
	}

	.panel-tag {
		margin-left: auto;
		font-family: var(--font-mono), monospace;
		font-size: 0.58rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-primary);
		border: 1px solid var(--color-primary);
		padding: 0.15rem 0.5rem;
		opacity: 0.7;
	}

	.panel-desc {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		margin: 0 0 1.5rem;
		letter-spacing: 0.02em;
	}

	.editor-wrapper {
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		overflow: hidden;
	}
</style>
