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
		<h2 class="section-title" use:scrollReveal={{ y: 30 }}>About Me</h2>

		<div class="about-grid" use:scrollReveal={{ children: true, stagger: 0.15, y: 40 }}>
			<div class="about-card">
				<h3>Background</h3>
				<p>
					I'm a passionate game developer with experience in Unreal Engine and Unity. I enjoy
					creating immersive gameplay experiences and constantly learning new technologies. From
					third-person shooters to hyper-casual mobile games, I love exploring different genres
					and mechanics.
				</p>
			</div>

			<div class="about-card">
				<h3>Education</h3>
				<p>
					Currently pursuing my studies in game development and computer science. I believe in
					learning by doing — every project in my portfolio represents a step in my journey as a
					developer.
				</p>
			</div>

			<div class="about-card">
				<h3>What I Do</h3>
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

	.section-title {
		font-size: clamp(2rem, 4vw, 3rem);
		text-align: center;
		margin: 0 0 3rem;
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
		background: var(--color-background-themes);
		border: 1px solid var(--color-muted);
		border-radius: 1rem;
		padding: 2rem;
		transition: all 0.3s ease;
	}

	.about-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px var(--color-shadow);
	}

	.about-card h3 {
		font-size: 1.25rem;
		margin: 0 0 0.75rem;
	}

	.about-card p {
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.contact-wrapper {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
