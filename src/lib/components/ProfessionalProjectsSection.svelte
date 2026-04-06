<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types';
	import { scrollReveal } from '$lib/utils/gsap';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	// ── Timeline ──────────────────────────────────────────────────────────────
	function extractDate(platform: string = '') {
		const parts = platform.split('·').map(s => s.trim());
		const datePart = parts.at(-1) ?? '';
		const years = datePart.match(/\d{4}/g) ?? [];
		const isPresent = /present/i.test(datePart);
		return {
			start: years[0] ?? '?',
			end: isPresent ? 'Present' : (years.at(-1) ?? years[0] ?? '?'),
			isPresent,
		};
	}

	const projectDates = projects.map(p => extractDate(p.platform));

	let activeIndex = $state(0);
	let rowEls = $state<(HTMLElement | undefined)[]>([]);

	let fillPct = $derived(
		projects.length <= 1 ? 0 : (activeIndex / (projects.length - 1)) * 100
	);

	function markerTop(i: number) {
		return projects.length <= 1 ? '0%' : `${(i / (projects.length - 1)) * 100}%`;
	}

	onMount(() => {
		const visible = new Set<number>();

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				const idx = parseInt((entry.target as HTMLElement).dataset.idx ?? '0');
				if (entry.isIntersecting) visible.add(idx);
				else visible.delete(idx);
			}
			if (visible.size > 0) activeIndex = Math.min(...visible);
		}, { rootMargin: '-30% 0px -30% 0px', threshold: 0 });

		rowEls.forEach(el => { if (el) observer.observe(el); });
		return () => observer.disconnect();
	});

	// ── Modal state ───────────────────────────────────────────────────────────
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

<section class="pro-section" id="professional">
	<div class="container">
		<div class="section-header" use:scrollReveal={{ y: 20 }}>
			<span class="section-arrow">▼</span>
			<h2 class="section-title">Professional Experience</h2>
		</div>

		{#if projects.length > 0}
			<div class="pro-content">

				<!-- Timeline sidebar -->
				<aside class="timeline-sidebar" aria-hidden="true">
					<div class="tl-track">
						<div class="tl-fill" style="height: {fillPct}%"></div>
					</div>
					{#each projectDates as date, i}
						<div class="tl-marker" class:active={i <= activeIndex} style="top: {markerTop(i)}">
							<div class="tl-dot"></div>
							<div class="tl-label">
								<span class="tl-year">{date.isPresent && i === 0 ? 'Now' : date.start}</span>
								{#if date.end !== date.start && !date.isPresent}
									<span class="tl-year-end">{date.end}</span>
								{/if}
							</div>
						</div>
					{/each}
				</aside>

				<div class="projects-list">
				{#each projects as project, i}
					<article
						class="project-row"
						class:reverse={i % 2 === 1}
						bind:this={rowEls[i]}
						data-idx={i}
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

							{#if project.tags && project.tags.length > 0}
								<ul class="tags-list">
									{#each project.tags as tag}
										<li class="tag">{tag}</li>
									{/each}
								</ul>
							{/if}

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
								{#if project.steam}
									<a href={project.steam} target="_blank" rel="noopener noreferrer" class="steam-btn">
										<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
											<path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.455 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.662 0 3.015-1.35 3.015-3.015zm-5.273.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/>
										</svg>
										Steam
									</a>
								{/if}
								{#if project.preview}
									<a href={project.preview} target="_blank" rel="noopener noreferrer" class="preview-btn">
										<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
											<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
										</svg>
										Try it
									</a>
								{/if}
								{#if project.url}
									<a href={project.url} target="_blank" rel="noopener noreferrer" class="link-btn">
										<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
											<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
										</svg>
										Visit
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
				</div><!-- /projects-list -->

			</div><!-- /pro-content -->
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
		z-index: 2;
		padding: 6rem 0;
		margin-bottom: 12rem;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-background-themes) 85%, var(--color-primary)) 0%,
			var(--color-background-themes) 50%,
			color-mix(in srgb, var(--color-background-themes) 88%, var(--color-secondary)) 100%
		);
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

	/* ── Timeline ── */
	.pro-content {
		display: grid;
		grid-template-columns: 72px 1fr;
		align-items: start;
		gap: 0;
	}

	.timeline-sidebar {
		position: relative;
		align-self: stretch;
	}

	.tl-track {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 10px;
		bottom: 10px;
		width: 1px;
		background: var(--color-muted);
	}

	.tl-fill {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background: var(--color-primary);
		transition: height 0.4s ease;
	}

	.tl-marker {
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		transition: color 0.3s ease;
		color: var(--color-text-muted);
	}

	.tl-marker.active {
		color: var(--color-primary);
	}

	.tl-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: 1.5px solid currentColor;
		background: var(--color-background-themes);
		transition: background 0.3s ease, transform 0.3s ease;
		flex-shrink: 0;
	}

	.tl-marker.active .tl-dot {
		background: var(--color-primary);
		transform: scale(1.3);
	}

	.tl-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1px;
	}

	.tl-year {
		font-family: var(--font-mono), monospace;
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		white-space: nowrap;
	}

	.tl-year-end {
		font-family: var(--font-mono), monospace;
		font-size: 0.52rem;
		opacity: 0.6;
		white-space: nowrap;
	}

	@media (max-width: 768px) {
		.pro-content {
			grid-template-columns: 1fr;
		}
		.timeline-sidebar {
			display: none;
		}
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
		object-fit: contain;
		object-position: center;
		display: block;
		transition: transform 0.4s ease;
		background: #000;
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

	.tags-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.62rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-primary) 35%, transparent);
		border-radius: 2px;
		padding: 0.2rem 0.55rem;
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

	.steam-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.75rem;
		background: #1b2838;
		color: #c7d5e0;
		border: 1px solid #2a475e;
		border-radius: 2px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		text-decoration: none;
		transition: background 0.15s ease, color 0.15s ease;
	}

	.steam-btn:hover {
		background: #2a475e;
		color: #fff;
	}

	.preview-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.75rem;
		background: transparent;
		color: var(--color-secondary);
		border: 1px solid var(--color-secondary);
		border-radius: 2px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		text-decoration: none;
		transition: background 0.15s ease, color 0.15s ease;
	}

	.preview-btn:hover {
		background: var(--color-secondary);
		color: #000;
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
			padding: 1.5rem;
			border-left: none;
			border-top: 1px solid var(--color-muted);
		}

		.spec {
			flex-wrap: wrap;
			gap: 0.2rem;
		}

		.spec-value {
			text-align: right;
		}

		.modal-backdrop {
			padding: 1rem;
		}
	}
</style>
