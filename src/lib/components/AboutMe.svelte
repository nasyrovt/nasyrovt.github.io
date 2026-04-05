<script lang="ts">
	import ContactCTA from './ContactCTA.svelte';
	import { scrollReveal } from '$lib/utils/gsap';
	import { parallax } from '$lib/utils/parallax';

	const categories = [
		{
			label: 'GAME ENGINES',
			// gamepad icon (Lucide)
			icon: 'M6 11h2V9h2v2h2v2H10v2H8v-2H6v-2zm10.5 1a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM6 7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6z',
			items: [
				{ name: 'Unreal Engine 5', abbr: 'UE5', color: '#0d2a52', text: '#60a0ff' },
				{ name: 'Unity',           abbr: 'UN',  color: '#1a1a1a', text: '#cccccc' },
				{ name: 'Godot',           abbr: 'GD',  color: '#1a3a5c', text: '#478cbf' },
			],
		},
		{
			label: 'LANGUAGES',
			// code brackets icon (Lucide)
			icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
			items: [
				{ name: 'C++',        abbr: 'C++', color: '#002a6e', text: '#4da6ff' },
				{ name: 'C#',         abbr: 'C#',  color: '#2d0a8c', text: '#a78bfa' },
				{ name: 'Python',     abbr: 'PY',  color: '#1a3a5c', text: '#60a0d0' },
				{ name: 'TypeScript', abbr: 'TS',  color: '#0e2a52', text: '#3b82f6' },
				{ name: 'Blueprint',  abbr: 'BP',  color: '#0a2040', text: '#38bdf8' },
				{ name: 'GLSL/HLSL', abbr: 'GL',  color: '#1a1040', text: '#818cf8' },
			],
		},
		{
			label: 'TOOLS & IDE',
			// wrench icon (Lucide)
			icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
			items: [
				{ name: 'Visual Studio', abbr: 'VS',  color: '#280a52', text: '#a855f7' },
				{ name: 'Rider',         abbr: 'JBR', color: '#0a0a0a', text: '#e0e0e0' },
				{ name: 'Git',           abbr: 'GIT', color: '#4a1000', text: '#f05032' },
				{ name: 'GitHub',        abbr: 'GH',  color: '#0d1117', text: '#8b949e' },
				{ name: 'Perforce',      abbr: 'P4',  color: '#101030', text: '#6080cc' },
			],
		},
		{
			label: 'WEB & 3D',
			// globe icon (Lucide)
			icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
			items: [
				{ name: 'SvelteKit', abbr: 'SK',  color: '#3a0e00', text: '#ff6630' },
				{ name: 'Three.js',  abbr: '3JS', color: '#001a2e', text: '#38bdf8' },
				{ name: 'TypeScript', abbr: 'TS', color: '#0e2a52', text: '#3b82f6' },
				{ name: 'Tailwind',  abbr: 'TW',  color: '#012a2a', text: '#2dd4bf' },
			],
		},
	];
</script>

<section class="about-section" id="about">
	<div class="container" use:parallax={{ speed: 0.08 }}>

		<!-- ── Bio cards ─────────────────────────────────────────────────── -->
		<div class="panel-header" use:scrollReveal={{ y: 20 }}>
			<span class="panel-arrow">▼</span>
			<h2 class="panel-title">ABOUT ME</h2>
		</div>

		<div class="about-grid" use:scrollReveal={{ children: true, stagger: 0.1, y: 30 }}>
			<div class="about-card">
				<div class="card-header"><span>▶</span> BACKGROUND</div>
				<p>
					I'm a passionate game developer with experience in Unreal Engine and Unity. I enjoy
					creating immersive gameplay experiences and constantly learning new technologies. From
					third-person shooters to hyper-casual mobile games, I love exploring different genres
					and mechanics.
				</p>
			</div>

			<div class="about-card">
				<div class="card-header"><span>▶</span> EDUCATION</div>
				<p>
					Currently pursuing my studies in game development and computer science. I believe in
					learning by doing — every project in my portfolio represents a step in my journey as a
					developer.
				</p>
			</div>

			<div class="about-card">
				<div class="card-header"><span>▶</span> WHAT I DO</div>
				<p>
					I specialize in gameplay programming, AI systems, networking/multiplayer, and creative
					coding. I work with C++, C#, and modern web technologies to bring ideas to life.
				</p>
			</div>
		</div>

		<!-- ── Technologies ──────────────────────────────────────────────── -->
		<div class="tech-section" use:scrollReveal={{ y: 20 }}>
			<div class="panel-header">
				<span class="panel-arrow">▼</span>
				<h2 class="panel-title">TECHNOLOGIES</h2>
			</div>

			<div class="tech-categories" use:scrollReveal={{ children: true, stagger: 0.12, y: 24 }}>
				{#each categories as cat}
					<div class="tech-category">
						<div class="cat-label">
							<svg class="cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
								<path d={cat.icon} />
							</svg>
							<span>{cat.label}</span>
						</div>
						<div class="tech-chips">
							{#each cat.items as tech}
								<div class="tech-chip" style="--chip-bg:{tech.color}; --chip-text:{tech.text}">
									<span class="chip-abbr">{tech.abbr}</span>
									<span class="chip-name">{tech.name}</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="contact-wrapper" use:scrollReveal={{ y: 30 }}>
			<ContactCTA />
		</div>
	</div>
</section>

<style>
	.about-section {
		padding: 6rem 0;
		margin-bottom: 12rem;
		position: relative;
		overflow: hidden;
		background-color: var(--color-background-themes);
	}

	.about-section::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 80px;
		background: linear-gradient(to bottom, transparent, var(--color-background-themes));
		pointer-events: none;
		z-index: 2;
	}

	.about-section::after {
		content: '';
		position: absolute;
		inset: auto 0 0 0;
		height: 80px;
		background: linear-gradient(to top, transparent, var(--color-background-themes));
		pointer-events: none;
		z-index: 2;
	}

	.container {
		position: relative;
		z-index: 3;
	}

	/* ── Panel header ─────────────────────────────────────────────────────── */
	.panel-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--color-muted);
		margin-bottom: 2rem;
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

	/* ── Bio cards ────────────────────────────────────────────────────────── */
	.about-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-bottom: 3.5rem;
	}

	@media (min-width: 768px) {
		.about-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.about-card {
		background: var(--color-background);
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		overflow: hidden;
		transition: border-color 0.15s ease;
	}

	.about-card:hover {
		border-color: var(--color-primary);
	}

	.card-header {
		background: var(--color-background-themes);
		border-bottom: 1px solid var(--color-muted);
		padding: 0.4rem 0.75rem;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.card-header span {
		color: var(--color-primary);
		font-size: 0.6rem;
	}

	.about-card p {
		padding: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		font-size: 0.875rem;
		margin: 0;
	}

	/* ── Technologies ─────────────────────────────────────────────────────── */
	.tech-section {
		margin-bottom: 3.5rem;
	}

	.tech-categories {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	@media (min-width: 640px) {
		.tech-categories {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1100px) {
		.tech-categories {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.tech-category {
		background: var(--color-background);
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		overflow: hidden;
	}

	.cat-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.75rem;
		background: var(--color-background-themes);
		border-bottom: 1px solid var(--color-muted);
		font-size: 0.62rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
	}

	.cat-icon {
		width: 13px;
		height: 13px;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.tech-chips {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.tech-chip {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.4rem 0.75rem;
		border-bottom: 1px solid var(--color-muted);
		transition: background 0.12s ease;
	}

	.tech-chip:last-child {
		border-bottom: none;
	}

	.tech-chip:hover {
		background: color-mix(in srgb, var(--chip-bg) 15%, transparent);
	}

	.chip-abbr {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.4rem;
		height: 1.5rem;
		padding: 0 0.35rem;
		background: var(--chip-bg);
		color: var(--chip-text);
		font-family: var(--font-mono);
		font-size: 0.58rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		border-radius: 2px;
		flex-shrink: 0;
	}

	.chip-name {
		font-size: 0.75rem;
		color: var(--color-text);
		letter-spacing: 0.02em;
	}

	/* ── Contact ──────────────────────────────────────────────────────────── */
	.contact-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
