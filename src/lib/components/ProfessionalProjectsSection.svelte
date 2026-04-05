<script lang="ts">
	import type { Project } from '$lib/types';
	import { scrollReveal } from '$lib/utils/gsap';
	import { parallax } from '$lib/utils/parallax';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	// Modal state
	let activeVideoUrl = $state<string | null>(null);

	function getEmbedUrl(watchUrl: string): string {
		const match = watchUrl.match(/[?&]v=([^&#]+)/);
		const id = match ? match[1] : '';
		return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
	}

	function openVideo(url: string) {
		activeVideoUrl = url;
		document.body.style.overflow = 'hidden';
	}

	function closeVideo() {
		activeVideoUrl = null;
		document.body.style.overflow = '';
	}

	function onBackdropKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeVideo();
	}
</script>

<section class="pro-section">
	<div class="container" use:parallax={{ speed: 0.08 }}>
		<div class="section-header" use:scrollReveal={{ y: 20 }}>
			<span class="section-arrow">▼</span>
			<h2 class="section-title">Professional Projects</h2>
		</div>

		{#if projects.length > 0}
			<div class="projects-list">
				{#each projects as project, i}
					<article
						class="project-row"
						class:reverse={i % 2 === 1}
						use:scrollReveal={{ y: 50 }}
					>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="project-image-wrap"
							class:has-video={!!project.videoUrl}
							onclick={() => project.videoUrl && openVideo(project.videoUrl)}
							onkeydown={(e) => { if (e.key === 'Enter' && project.videoUrl) openVideo(project.videoUrl); }}
							role={project.videoUrl ? 'button' : undefined}
							tabindex={project.videoUrl ? 0 : undefined}
						>
							<img src={project.image} alt={project.title} class="project-image" loading="lazy" />
							<div class="image-overlay">
								{#if project.videoUrl}
									<span class="play-btn" aria-label="Watch trailer">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
											<path d="M8 5v14l11-7z"/>
										</svg>
										WATCH TRAILER
									</span>
								{:else if project.url}
									<a href={project.url} target="_blank" rel="noopener noreferrer" class="visit-btn">
										↗ VISIT
									</a>
								{/if}
							</div>
						</div>

						<div class="project-details">
							<header class="details-header">
								<span class="project-index">0{i + 1}</span>
								<h3 class="project-title">{project.title}</h3>
								{#if project.genre}
									<span class="project-genre">{project.genre}</span>
								{/if}
							</header>

							<p class="project-description">{project.description}</p>

							<ul class="specs-list">
								{#if project.stack}
									<li class="spec"><span class="spec-label">Stack</span><span class="spec-value">{project.stack}</span></li>
								{/if}
								{#if project.platform}
									<li class="spec"><span class="spec-label">Platform</span><span class="spec-value">{project.platform}</span></li>
								{/if}
								{#if project.controls}
									<li class="spec"><span class="spec-label">Controls</span><span class="spec-value">{project.controls}</span></li>
								{/if}
								{#if project.targetAudience}
									<li class="spec"><span class="spec-label">Audience</span><span class="spec-value">{project.targetAudience}</span></li>
								{/if}
							</ul>

							<div class="action-row">
								{#if project.videoUrl}
									<button class="trailer-btn" onclick={() => openVideo(project.videoUrl!)}>
										<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
											<path d="M8 5v14l11-7z"/>
										</svg>
										Watch Trailer
									</button>
								{/if}
								{#if project.url}
									<a href={project.url} target="_blank" rel="noopener noreferrer" class="link-btn">
										<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
										</svg>
										Visit Studio
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<p class="empty-state">— No professional projects listed yet.</p>
		{/if}
	</div>
</section>

<!-- Video modal -->
{#if activeVideoUrl}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="modal-backdrop"
		onclick={closeVideo}
		onkeydown={onBackdropKeydown}
		role="dialog"
		aria-modal="true"
		aria-label="Video player"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<div class="modal-box" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<span class="modal-title">▶ TRAILER</span>
				<button class="modal-close" onclick={closeVideo} aria-label="Close">✕</button>
			</div>
			<div class="video-wrapper">
				<iframe
					src={getEmbedUrl(activeVideoUrl)}
					title="Project trailer"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div>
{/if}

<style>
	.pro-section {
		position: relative;
		padding: 6rem 0;
		margin-bottom: 12rem;
		overflow: hidden;
		background-color: var(--color-background-themes);
	}

	.pro-section::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 80px;
		background: linear-gradient(to bottom, transparent, var(--color-background-themes));
		pointer-events: none;
		z-index: 2;
	}

	.pro-section::after {
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

	.section-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--color-muted);
		margin-bottom: 3rem;
	}

	.section-arrow {
		color: var(--color-primary);
		font-size: 0.7rem;
		line-height: 1;
	}

	.section-title {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-text-muted);
		margin: 0;
	}

	/* ── Project rows ── */
	.projects-list {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.project-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		overflow: hidden;
	}

	.project-row.reverse {
		direction: rtl;
	}

	.project-row.reverse > * {
		direction: ltr;
	}

	/* ── Image side ── */
	.project-image-wrap {
		position: relative;
		overflow: hidden;
	}

	.project-image-wrap.has-video {
		cursor: pointer;
	}

	.project-image {
		width: 100%;
		height: 100%;
		min-height: 320px;
		object-fit: cover;
		display: block;
		transition: transform 0.4s ease;
	}

	.project-row:hover .project-image {
		transform: scale(1.03);
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.25s ease;
	}

	.project-row:hover .image-overlay {
		opacity: 1;
	}

	.play-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #fff;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		border: 1px solid rgba(255, 255, 255, 0.6);
		padding: 0.6rem 1.2rem;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(4px);
		transition: background 0.2s ease, border-color 0.2s ease;
	}

	.project-image-wrap:hover .play-btn {
		background: rgba(255, 255, 255, 0.18);
		border-color: #fff;
	}

	.visit-btn {
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-decoration: none;
		border: 1px solid var(--color-primary);
		padding: 0.5rem 1rem;
		border-radius: 2px;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.visit-btn:hover {
		background: var(--color-primary);
		color: #0d0d0d;
		opacity: 1;
	}

	/* ── Details side ── */
	.project-details {
		padding: 2.5rem;
		background: var(--color-background-themes);
		border-left: 1px solid var(--color-muted);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.project-row.reverse .project-details {
		border-left: none;
		border-right: 1px solid var(--color-muted);
	}

	.details-header {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.project-index {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-primary);
		letter-spacing: 0.1em;
	}

	.project-title {
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--color-heading);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		line-height: 1.1;
	}

	.project-genre {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-text-muted);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.project-description {
		font-size: 0.875rem;
		color: var(--color-text);
		line-height: 1.65;
		margin: 0;
	}

	.specs-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-muted);
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.spec {
		display: flex;
		justify-content: space-between;
		font-size: 0.72rem;
		font-family: var(--font-mono);
	}

	.spec-label {
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.spec-value {
		color: var(--color-heading);
	}

	.action-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: auto;
		flex-wrap: wrap;
	}

	.trailer-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.75rem;
		background: transparent;
		color: var(--color-primary);
		border: 1px solid var(--color-primary);
		border-radius: 2px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		cursor: pointer;
		font-family: var(--font-body);
		transition: background 0.15s ease, color 0.15s ease;
	}

	.trailer-btn:hover {
		background: var(--color-primary);
		color: #0d0d0d;
	}

	.link-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.75rem;
		background: var(--color-primary);
		color: #0d0d0d;
		border-radius: 2px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		text-decoration: none;
		transition: opacity 0.15s ease;
	}

	.link-btn:hover {
		opacity: 0.85;
	}

	/* ── Empty state ── */
	.empty-state {
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		padding: 2rem 0;
	}

	/* ── Modal ── */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		backdrop-filter: blur(6px);
	}

	.modal-box {
		width: 100%;
		max-width: 1200px;
		background: #0d0d0d;
		border: 1px solid #2e2e2e;
		border-radius: 2px;
		overflow: hidden;
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8);
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.6rem 1rem;
		border-bottom: 1px solid #2e2e2e;
		background: #1a1a1a;
	}

	.modal-title {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--color-primary);
		text-transform: uppercase;
	}

	.modal-close {
		background: none;
		border: none;
		color: #5e5e5e;
		font-size: 0.9rem;
		cursor: pointer;
		padding: 0.1rem 0.3rem;
		line-height: 1;
		transition: color 0.15s ease;
	}

	.modal-close:hover {
		color: #e0e0e0;
	}

	.video-wrapper {
		position: relative;
		aspect-ratio: 16 / 9;
		width: 100%;
		background: #000;
	}

	.video-wrapper iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		.project-row,
		.project-row.reverse {
			grid-template-columns: 1fr;
			direction: ltr;
		}

		.project-image {
			min-height: 220px;
		}

		.project-row.reverse .project-details {
			border-right: none;
			border-left: none;
			border-top: 1px solid var(--color-muted);
		}

		.project-details {
			border-left: none;
			border-top: 1px solid var(--color-muted);
		}

		.modal-backdrop {
			padding: 1rem;
		}
	}
</style>
