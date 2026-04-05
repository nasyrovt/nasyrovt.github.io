<script lang="ts">
	import BlueprintEditor from './BlueprintEditor.svelte';
	import { blueprintPanelWidth, blueprintResizing } from '$lib/stores/blueprintPanel';

	const MIN_W      = 5;   // auto-close below this %
	const MAX_W      = 30;  // maximum width %
	const DEFAULT_W  = 22;  // width when opened

	let panelWidth  = $state(0);          // current panel width in vw %
	let isResizing  = $state(false);

	const isOpen = $derived(panelWidth > 0);

	function setPanelWidth(w: number) {
		panelWidth = w;
		blueprintPanelWidth.set(w);
	}

	function open() { setPanelWidth(MAX_W); }
	function close() { setPanelWidth(0); }

	function startResize(e: MouseEvent) {
		e.preventDefault();
		isResizing = true;
		blueprintResizing.set(true);
		document.body.style.cursor      = 'col-resize';
		document.body.style.userSelect  = 'none';

		function onMove(ev: MouseEvent) {
			const pct = (ev.clientX / window.innerWidth) * 100;
			if (pct < MIN_W) {
				close();
				cleanup();
			} else {
				setPanelWidth(Math.min(pct, MAX_W));
			}
		}

		function cleanup() {
			isResizing = false;
			blueprintResizing.set(false);
			document.body.style.cursor     = '';
			document.body.style.userSelect = '';
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseup', cleanup);
		}

		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', cleanup);
	}
</script>

<!-- ── Panel ──────────────────────────────────────────────────────────────── -->
<div
	class="bp-panel"
	class:resizing={isResizing}
	style="width: {panelWidth}vw"
	aria-label="Blueprint Panel"
>
	{#if isOpen}
		<!-- Header -->
		<div class="bp-panel-header">
			<span class="bp-panel-arrow">▼</span>
			<span class="bp-panel-title">BLUEPRINT</span>
			<span class="bp-panel-tag">LIVE</span>
			<button class="bp-close-btn" onclick={close} aria-label="Close Blueprint Panel">✕</button>
		</div>

		<!-- Editor fills remaining height -->
		<div class="bp-panel-body">
			<BlueprintEditor />
		</div>

		<!-- Resize handle (right edge of panel) -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="bp-resize-handle"
			role="separator"
			aria-label="Resize Blueprint Panel"
			onmousedown={startResize}
		></div>
	{/if}
</div>

<!-- ── Tab trigger (always visible at right edge of panel) ───────────────── -->
<button
	class="bp-tab"
	class:resizing={isResizing}
	style="left: {panelWidth}vw"
	onclick={isOpen ? close : open}
	aria-label="{isOpen ? 'Close' : 'Open'} Blueprint Panel"
>
	<span class="bp-tab-arrow">{isOpen ? '◀' : '▶'}</span>
	<span class="bp-tab-label">PLAY WITH MY WEBSITE</span>
</button>

<style>
	/* ── Panel ──────────────────────────────────────────────────────────────── */
	.bp-panel {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		background: #060a0e;
		border-right: 1px solid #1e2830;
		overflow: hidden;
		z-index: 200;
		display: flex;
		flex-direction: column;
		transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 4px 0 20px rgba(0, 0, 0, 0.6);
	}

	.bp-panel.resizing {
		transition: none;
	}

	/* ── Panel header ────────────────────────────────────────────────────────── */
	.bp-panel-header {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0 0.75rem;
		height: 32px;
		flex-shrink: 0;
		background: #0a0e14;
		border-bottom: 1px solid #1e2830;
	}

	.bp-panel-arrow {
		color: #e8a020;
		font-size: 0.8rem;
		line-height: 1;
	}

	.bp-panel-title {
		font-family: var(--font-mono), monospace;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #8a9ab0;
		white-space: nowrap;
	}

	.bp-panel-tag {
		font-family: var(--font-mono), monospace;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #4a9a5a;
		border: 1px solid #2a5a3a;
		padding: 0.1rem 0.35rem;
		border-radius: 1px;
	}

	.bp-close-btn {
		margin-left: auto;
		background: none;
		border: none;
		color: #4a5a6a;
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.2rem 0.4rem;
		border-radius: 2px;
		transition: color 0.15s ease, background 0.15s ease;
		font-family: var(--font-mono), monospace;
		line-height: 1;
	}

	.bp-close-btn:hover {
		color: #e8a020;
		background: rgba(232, 160, 32, 0.1);
	}

	/* ── Panel body (editor) ─────────────────────────────────────────────────── */
	.bp-panel-body {
		flex: 1;
		overflow: hidden;
		min-height: 0;
	}

	/* ── Resize handle ───────────────────────────────────────────────────────── */
	.bp-resize-handle {
		position: absolute;
		right: 0;
		top: 0;
		width: 5px;
		height: 100%;
		cursor: col-resize;
		background: transparent;
		z-index: 10;
		transition: background 0.15s ease;
	}

	.bp-resize-handle:hover {
		background: rgba(232, 160, 32, 0.25);
	}

	/* ── Tab trigger ─────────────────────────────────────────────────────────── */
	.bp-tab {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		z-index: 201;
		background: #060a0e;
		border: 1px solid #1e2830;
		border-left: none;
		padding: 14px 0;
		width: 30px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		transition:
			left 0.25s cubic-bezier(0.4, 0, 0.2, 1),
			background 0.15s ease,
			border-color 0.15s ease;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.5);
	}

	.bp-tab.resizing {
		transition: none;
	}

	.bp-tab:hover {
		background: #0d1218;
		border-color: #e8a020;
	}

	.bp-tab:hover .bp-tab-arrow {
		color: #e8a020;
	}

	.bp-tab-arrow {
		font-size: 0.9rem;
		color: #4a6a8a;
		line-height: 1;
		transition: color 0.15s ease;
	}

	.bp-tab-label {
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
		font-family: var(--font-mono), monospace;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #3a4a5a;
		white-space: nowrap;
	}
</style>
