<script lang="ts">
	import { connectionsStore, initialConnections } from '$lib/stores/blueprintGraph';
	import type { Connection } from '$lib/stores/blueprintGraph';

	// ── Constants ─────────────────────────────────────────────────────────────
	const HEADER_H = 28;
	const ROW_H    = 24;

	// ── Types ─────────────────────────────────────────────────────────────────
	type PinType = 'exec' | 'string' | 'float' | 'bool' | 'object' | 'int';

	interface DataPin {
		id: string;
		label: string;
		type: PinType;
		side: 'input' | 'output';
	}

	interface BpNode {
		id: string;
		title: string;
		subtitle?: string;
		headerColor: string;
		x: number;
		y: number;
		width: number;
		execIn: boolean;
		execOuts: string[];
		dataPins: DataPin[];
	}

	// ── Graph: Event Tick → one function per section ──────────────────────────
	let nodes = $state<BpNode[]>([
		{
			id: 'event-tick',
			title: 'Event Tick',
			headerColor: '#7a1515',
			x: 150, y: 40, width: 200,
			execIn: false,
			execOuts: [''],
			dataPins: [
				{ id: 'delta-out', label: 'Delta Seconds', type: 'float', side: 'output' },
			],
		},
		{
			id: 'fn-hero',
			title: 'Hero',
			subtitle: 'Section',
			headerColor: '#114d8c',
			x: 150, y: 152, width: 175,
			execIn: true,
			execOuts: [''],
			dataPins: [
				{ id: 'hero-vis', label: 'Is Visible', type: 'bool', side: 'output' },
			],
		},
		{
			id: 'fn-prof',
			title: 'Professional Projects',
			subtitle: 'Section',
			headerColor: '#114d8c',
			x: 150, y: 264, width: 255,
			execIn: true,
			execOuts: [''],
			dataPins: [
				{ id: 'prof-count', label: 'Count', type: 'int', side: 'output' },
			],
		},
		{
			id: 'fn-pers',
			title: 'Personal Projects',
			subtitle: 'Section',
			headerColor: '#114d8c',
			x: 150, y: 376, width: 245,
			execIn: true,
			execOuts: [''],
			dataPins: [
				{ id: 'pers-count', label: 'Count', type: 'int', side: 'output' },
			],
		},
		{
			id: 'fn-about',
			title: 'About Me',
			subtitle: 'Section',
			headerColor: '#114d8c',
			x: 150, y: 488, width: 190,
			execIn: true,
			execOuts: [''],
			dataPins: [
				{ id: 'about-self', label: 'Self Ref', type: 'object', side: 'output' },
			],
		},
		{
			id: 'fn-pub',
			title: 'Publications',
			subtitle: 'Section',
			headerColor: '#114d8c',
			x: 150, y: 600, width: 210,
			execIn: true,
			execOuts: [''],
			dataPins: [
				{ id: 'pub-count', label: 'Count', type: 'int', side: 'output' },
			],
		},
	]);

	let connections = $state<Connection[]>(initialConnections.map(c => ({ ...c })));

	// Sync connections into the shared store so site sections can react
	$effect(() => {
		connectionsStore.set(connections.map(c => ({ ...c })));
	});

	// Drag state
	let nodeDrag = $state<{ nodeId: string; ox: number; oy: number } | null>(null);
	let connDrag = $state<{ fromNode: string; fromPin: string; mx: number; my: number } | null>(null);

	let canvasEl: HTMLElement;

	// ── Helpers ───────────────────────────────────────────────────────────────
	function nodeById(id: string) { return nodes.find(n => n.id === id)!; }

	function getPinPos(nodeId: string, pinId: string): { x: number; y: number } {
		const n = nodeById(nodeId);
		if (!n) return { x: 0, y: 0 };

		if (pinId === 'exec-in') {
			return { x: n.x, y: n.y + HEADER_H + ROW_H / 2 };
		}
		const em = pinId.match(/^exec-out-(\d+)$/);
		if (em) {
			const i = +em[1];
			return { x: n.x + n.width, y: n.y + HEADER_H + i * ROW_H + ROW_H / 2 };
		}
		const inputs  = n.dataPins.filter(p => p.side === 'input');
		const outputs = n.dataPins.filter(p => p.side === 'output');
		const ii = inputs.findIndex(p => p.id === pinId);
		if (ii !== -1) return { x: n.x, y: n.y + HEADER_H + (1 + ii) * ROW_H + ROW_H / 2 };
		const oi = outputs.findIndex(p => p.id === pinId);
		if (oi !== -1) return { x: n.x + n.width, y: n.y + HEADER_H + (n.execOuts.length + oi) * ROW_H + ROW_H / 2 };
		return { x: n.x, y: n.y };
	}

	function nodeHeight(n: BpNode) {
		const left  = (n.execIn ? 1 : 0) + n.dataPins.filter(p => p.side === 'input').length;
		const right = n.execOuts.length   + n.dataPins.filter(p => p.side === 'output').length;
		return HEADER_H + Math.max(left, right, 1) * ROW_H + 6;
	}

	const PIN_COLOR: Record<string, string> = {
		exec: '#c8c8c8', string: '#f06292', float: '#81c995',
		bool: '#ef5350', object: '#64b5f6', int: '#b39ddb',
	};
	const pinCol = (t: string) => PIN_COLOR[t] ?? '#c8c8c8';

	function bezier(x1: number, y1: number, x2: number, y2: number) {
		const c = Math.max(60, Math.abs(x2 - x1) * 0.45);
		return `M${x1},${y1} C${x1+c},${y1} ${x2-c},${y2} ${x2},${y2}`;
	}

	function wireColor(conn: Connection) {
		if (conn.fromPin.startsWith('exec')) return '#c8c8c8';
		const pin = nodeById(conn.fromNode)?.dataPins.find(p => p.id === conn.fromPin);
		return pinCol(pin?.type ?? 'exec');
	}

	function isConnected(nodeId: string, pinId: string) {
		return connections.some(c =>
			(c.fromNode === nodeId && c.fromPin === pinId) ||
			(c.toNode   === nodeId && c.toPin   === pinId)
		);
	}

	// ── Mouse helpers ─────────────────────────────────────────────────────────
	function canvasPos(e: MouseEvent) {
		const r = canvasEl.getBoundingClientRect();
		return { x: e.clientX - r.left, y: e.clientY - r.top };
	}

	// ── Node drag ─────────────────────────────────────────────────────────────
	function startNodeDrag(e: MouseEvent, nodeId: string) {
		e.stopPropagation();
		const n = nodeById(nodeId);
		const p = canvasPos(e);
		nodeDrag = { nodeId, ox: p.x - n.x, oy: p.y - n.y };
	}

	// ── Connection drag ───────────────────────────────────────────────────────
	function startPinDrag(e: MouseEvent, nodeId: string, pinId: string) {
		e.stopPropagation();
		e.preventDefault();

		const idx = connections.findIndex(c =>
			(c.fromNode === nodeId && c.fromPin === pinId) ||
			(c.toNode   === nodeId && c.toPin   === pinId)
		);
		if (idx !== -1) {
			const conn = connections[idx];
			connections.splice(idx, 1);
			const p = canvasPos(e);
			connDrag = { fromNode: conn.fromNode, fromPin: conn.fromPin, mx: p.x, my: p.y };
			return;
		}

		const n = nodeById(nodeId);
		const isOut = pinId.startsWith('exec-out') ||
			n?.dataPins.some(p => p.id === pinId && p.side === 'output');
		if (!isOut) return;

		const p = canvasPos(e);
		connDrag = { fromNode: nodeId, fromPin: pinId, mx: p.x, my: p.y };
	}

	function dropOnPin(_e: MouseEvent, nodeId: string, pinId: string) {
		if (!connDrag) return;

		const n = nodeById(nodeId);
		const isIn = pinId === 'exec-in' ||
			n?.dataPins.some(p => p.id === pinId && p.side === 'input');
		if (!isIn || connDrag.fromNode === nodeId) { connDrag = null; return; }

		const fromIsExec = connDrag.fromPin.startsWith('exec');
		if (fromIsExec !== (pinId === 'exec-in')) { connDrag = null; return; }

		const ei = connections.findIndex(c => c.toNode === nodeId && c.toPin === pinId);
		if (ei !== -1) connections.splice(ei, 1);

		connections.push({
			id: `c${Date.now()}`,
			fromNode: connDrag.fromNode,
			fromPin:  connDrag.fromPin,
			toNode:   nodeId,
			toPin:    pinId,
		});
		connDrag = null;
	}

	// ── Canvas-level mouse events ─────────────────────────────────────────────
	function onMouseMove(e: MouseEvent) {
		const p = canvasPos(e);
		if (nodeDrag) {
			const n = nodeById(nodeDrag.nodeId);
			n.x = p.x - nodeDrag.ox;
			n.y = p.y - nodeDrag.oy;
		}
		if (connDrag) { connDrag.mx = p.x; connDrag.my = p.y; }
	}

	function onMouseUp() { nodeDrag = null; connDrag = null; }
</script>

<div class="bp-editor">
	<!-- Toolbar bar -->
	<div class="bp-footer">
		<div class="bp-hint" aria-hidden="true">
			drag header to move &nbsp;•&nbsp; drag <span>▶</span> to connect &nbsp;•&nbsp; click wire pin to disconnect
		</div>
		<button
			class="bp-reconnect-btn"
			onclick={() => { connections = initialConnections.map(c => ({ ...c })); }}
			aria-label="Reconnect all pins"
		>
			↺ RECONNECT ALL
		</button>
	</div>

	<div class="bp-scroll-wrapper">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="bp-canvas"
			class:is-dragging={!!nodeDrag || !!connDrag}
			bind:this={canvasEl}
			onmousemove={onMouseMove}
			onmouseup={onMouseUp}
			onmouseleave={onMouseUp}
		>
			<!-- Background grid -->
			<div class="bp-grid" aria-hidden="true"></div>

			<!-- Wire layer (SVG) -->
			<svg class="bp-svg" aria-hidden="true">
				{#each connections as conn (conn.id)}
					{@const f   = getPinPos(conn.fromNode, conn.fromPin)}
					{@const t   = getPinPos(conn.toNode,   conn.toPin)}
					{@const col = wireColor(conn)}
					<path
						class="bp-wire"
						d={bezier(f.x, f.y, t.x, t.y)}
						stroke={col}
						stroke-width="2.5"
						fill="none"
						style="filter: drop-shadow(0 0 3px {col}80)"
					/>
				{/each}

				{#if connDrag}
					{@const f = getPinPos(connDrag.fromNode, connDrag.fromPin)}
					<path
						d={bezier(f.x, f.y, connDrag.mx, connDrag.my)}
						stroke="#c8c8c8"
						stroke-width="2"
						fill="none"
						stroke-dasharray="8,5"
						opacity="0.55"
					/>
				{/if}
			</svg>

			<!-- Nodes -->
			{#each nodes as node (node.id)}
				{@const nH      = nodeHeight(node)}
				{@const inputs  = node.dataPins.filter(p => p.side === 'input')}
				{@const outputs = node.dataPins.filter(p => p.side === 'output')}

				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="bp-node"
					style="left:{node.x}px; top:{node.y}px; width:{node.width}px; height:{nH}px;"
				>
					<!-- Header (drag handle) -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="bp-header"
						style="background:{node.headerColor};"
						onmousedown={(e) => startNodeDrag(e, node.id)}
					>
						<span class="bp-title">{node.title}</span>
						{#if node.subtitle}<span class="bp-sub">{node.subtitle}</span>{/if}
					</div>

					<!-- Exec In -->
					{#if node.execIn}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="bp-pin bp-left bp-exec"
							class:connected={isConnected(node.id, 'exec-in')}
							style="top:{HEADER_H}px;"
							onmousedown={(e) => startPinDrag(e, node.id, 'exec-in')}
							onmouseup={(e) => dropOnPin(e, node.id, 'exec-in')}
							title="Exec In"
						>
							<span class="bp-tri">▶</span>
						</div>
					{/if}

					<!-- Exec Outs -->
					{#each node.execOuts as label, i}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="bp-pin bp-right bp-exec"
							class:connected={isConnected(node.id, `exec-out-${i}`)}
							style="top:{HEADER_H + i * ROW_H}px;"
							onmousedown={(e) => startPinDrag(e, node.id, `exec-out-${i}`)}
							onmouseup={(e) => dropOnPin(e, node.id, `exec-out-${i}`)}
							title="Exec Out"
						>
							{#if label}<span class="bp-pin-label">{label}</span>{/if}
							<span class="bp-tri">▶</span>
						</div>
					{/each}

					<!-- Data Inputs -->
					{#each inputs as pin, i}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="bp-pin bp-left bp-data"
							class:connected={isConnected(node.id, pin.id)}
							style="top:{HEADER_H + (1 + i) * ROW_H}px;"
							onmousedown={(e) => startPinDrag(e, node.id, pin.id)}
							onmouseup={(e) => dropOnPin(e, node.id, pin.id)}
							title="{pin.type}: {pin.label}"
						>
							<span class="bp-dot" style="--dot-col:{pinCol(pin.type)}"></span>
							<span class="bp-pin-label">{pin.label}</span>
						</div>
					{/each}

					<!-- Data Outputs -->
					{#each outputs as pin, k}
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="bp-pin bp-right bp-data"
							class:connected={isConnected(node.id, pin.id)}
							style="top:{HEADER_H + (node.execOuts.length + k) * ROW_H}px;"
							onmousedown={(e) => startPinDrag(e, node.id, pin.id)}
							onmouseup={(e) => dropOnPin(e, node.id, pin.id)}
							title="{pin.type}: {pin.label}"
						>
							<span class="bp-pin-label">{pin.label}</span>
							<span class="bp-dot" style="--dot-col:{pinCol(pin.type)}"></span>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

</div>

<style>
	/* ── Editor container ───────────────────────────────────────────────────── */
	.bp-editor {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 300px;
		background: #080c10;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	/* ── Scroll wrapper ─────────────────────────────────────────────────────── */
	.bp-scroll-wrapper {
		flex: 1;
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: #2e3540 #080c10;
	}

	.bp-scroll-wrapper::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	.bp-scroll-wrapper::-webkit-scrollbar-track { background: #080c10; }
	.bp-scroll-wrapper::-webkit-scrollbar-thumb { background: #2e3540; border-radius: 3px; }

	/* ── Canvas (actual drawing area) ──────────────────────────────────────── */
	.bp-canvas {
		position: relative;
		width: 650px;
		height: 750px;
		cursor: default;
		user-select: none;
		-webkit-user-select: none;
	}

	.bp-canvas.is-dragging { cursor: grabbing; }

	/* ── Blueprint grid ─────────────────────────────────────────────────────── */
	.bp-grid {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image:
			linear-gradient(rgba(100,120,160, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(100,120,160, 0.06) 1px, transparent 1px),
			linear-gradient(rgba(100,120,160, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(100,120,160, 0.025) 1px, transparent 1px);
		background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
	}

	/* ── SVG wire layer ─────────────────────────────────────────────────────── */
	.bp-svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: visible;
	}

	/* ── Node ───────────────────────────────────────────────────────────────── */
	.bp-node {
		position: absolute;
		background: #181c22;
		border: 1px solid #2e3540;
		border-radius: 4px;
		box-shadow: 0 6px 24px rgba(0,0,0,0.75);
		overflow: visible;
		transition: border-color 0.15s ease;
	}

	.bp-node:hover { border-color: #4a5570; }

	.bp-header {
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 8px;
		border-radius: 3px 3px 0 0;
		cursor: grab;
		gap: 6px;
	}

	.bp-header:active { cursor: grabbing; }

	.bp-title {
		font-family: var(--font-mono), monospace;
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.88);
		white-space: nowrap;
	}

	.bp-sub {
		font-family: var(--font-mono), monospace;
		font-size: 0.55rem;
		color: rgba(255,255,255,0.45);
		letter-spacing: 0.03em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	/* ── Pins ───────────────────────────────────────────────────────────────── */
	.bp-pin {
		position: absolute;
		height: 24px;
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 0 8px;
		cursor: crosshair;
		z-index: 2;
	}

	.bp-left  { left:  -8px; justify-content: flex-start; padding-left: 6px; }
	.bp-right { right: -8px; justify-content: flex-end;   padding-right: 6px; }

	.bp-tri {
		font-size: 0.58rem;
		line-height: 1;
		transition: color 0.1s ease, text-shadow 0.1s ease;
		color: #3a3a3a;
	}

	.bp-exec.connected .bp-tri {
		color: #d8d8d8;
		text-shadow: 0 0 6px rgba(220,220,220,0.6);
	}

	.bp-exec:hover .bp-tri { color: #e0e0e0; }

	.bp-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: 1.5px solid var(--dot-col, #c8c8c8);
		background: transparent;
		flex-shrink: 0;
		transition: background 0.1s ease, box-shadow 0.1s ease;
	}

	.bp-data.connected .bp-dot {
		background: var(--dot-col, #c8c8c8);
		box-shadow: 0 0 5px var(--dot-col, #c8c8c8);
	}

	.bp-data:hover .bp-dot { background: var(--dot-col, #c8c8c8); }

	.bp-pin-label {
		font-family: var(--font-mono), monospace;
		font-size: 0.6rem;
		color: #7a8a9a;
		letter-spacing: 0.02em;
		white-space: nowrap;
		pointer-events: none;
	}

	/* ── Footer ─────────────────────────────────────────────────────────────── */
	.bp-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #0e141a;
		flex-shrink: 0;
		padding: 0 8px 0 0;
	}

	.bp-hint {
		padding: 6px 12px;
		font-family: var(--font-mono), monospace;
		font-size: 0.72rem;
		color: #2e3a4a;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		white-space: nowrap;
		pointer-events: none;
	}

	.bp-hint span { color: #c8c8c8; }

	.bp-reconnect-btn {
		background: none;
		border: 1px solid #1e2c3a;
		color: #3a5a7a;
		font-family: var(--font-mono), monospace;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 3px 8px;
		border-radius: 2px;
		cursor: pointer;
		white-space: nowrap;
		transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
	}

	.bp-reconnect-btn:hover {
		color: #e8a020;
		border-color: #e8a020;
		background: rgba(232, 160, 32, 0.08);
	}
</style>
