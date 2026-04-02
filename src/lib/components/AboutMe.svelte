<script lang="ts">
	import ContactCTA from './ContactCTA.svelte';
	import { scrollReveal } from '$lib/utils/gsap';
	import { theme } from '$lib/stores/theme';

	let sectionBg = $derived(
		$theme === 'dark'           ? '#120a1e' :
		$theme === 'strangerThings' ? '#1a0505'  :
		                              '#ede7f6'
	);
</script>

<section class="about-section" id="about" style="--section-bg: {sectionBg}">
	<div class="container">
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

		<div class="contact-wrapper" use:scrollReveal={{ y: 30 }}>
			<ContactCTA />
		</div>
	</div>
</section>

<style>
	.about-section {
		padding: 6rem 0;
		position: relative;
		background-color: var(--section-bg);
		background-size: cover;
		background-position: center;
	}

	.about-section::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 90px;
		background: linear-gradient(to bottom, transparent, var(--section-bg));
		pointer-events: none;
		z-index: 2;
	}

	.about-section::after {
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

	/* UE Details Panel header */
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

	.about-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-bottom: 3rem;
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

	/* UE category header bar inside the card */
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

	.contact-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
