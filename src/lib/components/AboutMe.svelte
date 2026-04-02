<script lang="ts">
	import ContactCTA from './ContactCTA.svelte';
	import { scrollReveal } from '$lib/utils/gsap';
</script>

<section class="about-section" id="about">
	<div class="accent-overlay"></div>
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
		overflow: hidden;
	}

	.accent-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #553c9a, #805ad5);
		opacity: 0.06;
		pointer-events: none;
		z-index: 0;
	}

	:global([data-theme='dark']) .accent-overlay {
		opacity: 0.12;
	}

	:global([data-theme='strangerThings']) .accent-overlay {
		opacity: 0;
	}

	.container {
		position: relative;
		z-index: 1;
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
