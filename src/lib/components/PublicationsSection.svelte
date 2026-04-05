<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';

	interface BlogPost {
		title: string;
		description: string;
		tags: string[];
	}

	interface VideoEntry {
		title: string;
		description: string;
		platform: string;
		tags: string[];
		driveId?: string;
	}

	const blogs: BlogPost[] = [
		{
			title: 'Home Made Audio Tools (Post-Mortem)',
			description: "A retrospective on building custom in-house audio tooling — what worked, what broke, and what I'd do differently.",
			tags: ['Audio', 'Tools', 'Post-Mortem'],
		},
		{
			title: 'You should ship games with MetaSound',
			description: 'Why MetaSound is a game-changer for procedural and adaptive audio in Unreal Engine, and how to get started.',
			tags: ['UE5', 'MetaSound', 'Audio'],
		},
	];

	const videos: VideoEntry[] = [
		{
			title: 'Self-made audio tools',
			description: 'Presented at PLAION DevSummit Montpellier 2024.',
			platform: 'Google Drive',
			tags: ['Tech Audio', 'Unreal Engine', 'MetaSound'],
			driveId: '1rf1G_TyQ52ZoAl_fEWvfVKb_JeE0_x7E',
		},
		{
			title: 'Third-Person Combat System from Scratch',
			description: 'Building a full combat system — combo attacks, blocking, dodging, and hit reactions — entirely in Unreal Animation Blueprint.',
			platform: 'Coming Soon',
			tags: ['UE5', 'Combat', 'Animation'],
		},
	];

	let blogCols = $derived(blogs.length <= 1 ? 1 : blogs.length <= 2 ? 2 : 3);
	let videoCols = $derived(videos.length <= 1 ? 1 : 2);

	let activeVideo = $state<VideoEntry | null>(null);

	function openVideo(video: VideoEntry) {
		activeVideo = video;
		document.body.style.overflow = 'hidden';
	}

	function closeVideo() {
		activeVideo = null;
		document.body.style.overflow = '';
	}

	function onBackdropKey(e: KeyboardEvent) {
		if (e.key === 'Escape') closeVideo();
	}

	function driveEmbedUrl(id: string) {
		return `https://drive.google.com/file/d/${id}/preview`;
	}
</script>

<section class="pub-section" id="publications">
	<div class="container">

		<!-- Section header -->
		<div class="panel-header" use:scrollReveal={{ y: 20 }}>
			<span class="panel-arrow">▼</span>
			<h2 class="panel-title">PUBLICATIONS</h2>
			<span class="panel-tag">BLOGS &amp; VIDEOS</span>
		</div>

		<!-- BLOGS ─────────────────────────────────────────────────────── -->
		<div class="subsection" use:scrollReveal={{ y: 16 }}>
			<div class="subsection-header">
				<span class="subsection-icon">▶</span>
				<h3 class="subsection-title">BLOGS</h3>
				<span class="subsection-count">{blogs.length}</span>
			</div>

			<div
				class="blog-grid"
				style="--cols: {blogCols}"
				use:scrollReveal={{ children: true, stagger: 0.08, y: 24 }}
			>
				{#each blogs as post}
					<article class="pub-card blog-card">
						<div class="card-body">
							<h4 class="card-title">{post.title}</h4>
							<p class="card-desc">{post.description}</p>
						</div>
						<div class="card-footer">
							<div class="card-tags">
								{#each post.tags as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
							<span class="card-link card-link--soon">COMING SOON</span>
						</div>
					</article>
				{/each}
			</div>
		</div>

		<!-- VIDEOS ─────────────────────────────────────────────────────── -->
		<div class="subsection" use:scrollReveal={{ y: 16 }}>
			<div class="subsection-header">
				<span class="subsection-icon">▶</span>
				<h3 class="subsection-title">VIDEOS</h3>
				<span class="subsection-count">{videos.length}</span>
			</div>

			<div
				class="video-grid"
				style="--cols: {videoCols}"
				use:scrollReveal={{ children: true, stagger: 0.1, y: 24 }}
			>
				{#each videos as video}
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<article
						class="pub-card video-card"
						class:playable={!!video.driveId}
						onclick={() => video.driveId && openVideo(video)}
						onkeydown={(e) => e.key === 'Enter' && video.driveId && openVideo(video)}
						role={video.driveId ? 'button' : undefined}
						tabindex={video.driveId ? 0 : undefined}
					>
						<div class="video-thumb">
							<div class="thumb-grid" aria-hidden="true"></div>
							{#if video.driveId}
								<div class="thumb-play-btn" aria-hidden="true">
									<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
								</div>
							{:else}
								<div class="thumb-coming" aria-hidden="true">COMING SOON</div>
							{/if}
						</div>
						<div class="card-body">
							<div class="video-meta-row">
								<span class="video-platform" class:drive={video.platform === 'Google Drive'}>{video.platform}</span>
							</div>
							<h4 class="card-title">{video.title}</h4>
							<p class="card-desc">{video.description}</p>
						</div>
						<div class="card-footer">
							<div class="card-tags">
								{#each video.tags as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
							{#if video.driveId}
								<span class="card-link">WATCH ▶</span>
							{:else}
								<span class="card-link card-link--soon">COMING SOON</span>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</div>

	</div>
</section>

<!-- Video modal -->
{#if activeVideo}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="modal-backdrop"
		onclick={closeVideo}
		onkeydown={onBackdropKey}
		role="dialog"
		aria-modal="true"
		aria-label="Video player"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<div class="modal-box" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<span class="modal-title">▶ {activeVideo.title}</span>
				<button class="modal-close" onclick={closeVideo} aria-label="Close">✕</button>
			</div>
			<div class="video-wrapper">
				<iframe
					src={driveEmbedUrl(activeVideo.driveId!)}
					title={activeVideo.title}
					frameborder="0"
					allow="autoplay"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div>
{/if}

<style>
	/* ── Section shell ──────────────────────────────────────────────────────── */
	.pub-section {
		padding: 5rem 0 4rem;
		margin-bottom: 12rem;
		position: relative;
		z-index: 2;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-background-themes) 85%, var(--color-secondary)) 0%,
			var(--color-background-themes) 50%,
			color-mix(in srgb, var(--color-background-themes) 88%, var(--color-primary)) 100%
		);
	}

	.pub-section::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 80px;
		background: linear-gradient(to bottom, transparent, var(--color-background-themes));
		pointer-events: none;
		z-index: 2;
	}

	.pub-section::after {
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

	/* ── Section header ─────────────────────────────────────────────────────── */
	.panel-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--color-muted);
		margin-bottom: 2.5rem;
	}

	.panel-arrow {
		color: var(--color-primary);
		font-size: 0.75rem;
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

	/* ── Subsection ─────────────────────────────────────────────────────────── */
	.subsection {
		margin-bottom: 3rem;
	}

	.subsection-header {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-bottom: 1.25rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid color-mix(in srgb, var(--color-muted) 50%, transparent);
	}

	.subsection-icon {
		color: var(--color-primary);
		font-size: 0.6rem;
	}

	.subsection-title {
		font-family: var(--font-mono), monospace;
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0;
	}

	.subsection-count {
		font-family: var(--font-mono), monospace;
		font-size: 0.55rem;
		color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 12%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
		padding: 0.05rem 0.4rem;
		border-radius: 2px;
	}

	/* ── Blog grid ──────────────────────────────────────────────────────────── */
	.blog-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.blog-grid .pub-card {
		flex: 0 0 calc((100% - (var(--cols, 3) - 1) * 1rem) / var(--cols, 3));
	}

	@media (max-width: 900px) {
		.blog-grid .pub-card {
			flex: 0 0 calc((100% - 1rem) / 2);
		}
	}

	@media (max-width: 560px) {
		.blog-grid .pub-card {
			flex: 0 0 100%;
		}
	}

	/* ── Video grid ─────────────────────────────────────────────────────────── */
	.video-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.video-grid .pub-card {
		flex: 0 0 calc((100% - (var(--cols, 2) - 1) * 1rem) / var(--cols, 2));
	}

	@media (max-width: 560px) {
		.video-grid .pub-card {
			flex: 0 0 100%;
		}
	}

	/* ── Card shared ────────────────────────────────────────────────────────── */
	.pub-card {
		background: var(--color-background);
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.pub-card:hover {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.card-body {
		padding: 1rem;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.card-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-heading);
		margin: 0;
		line-height: 1.4;
	}

	.card-desc {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
		flex: 1;
	}

	.card-footer {
		padding: 0.6rem 1rem;
		border-top: 1px solid color-mix(in srgb, var(--color-muted) 50%, transparent);
		background: color-mix(in srgb, var(--color-background) 60%, transparent);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.tag {
		font-family: var(--font-mono), monospace;
		font-size: 0.52rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		border: 1px solid var(--color-muted);
		padding: 0.1rem 0.4rem;
		border-radius: 1px;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-left: auto;
	}

	.card-date {
		font-family: var(--font-mono), monospace;
		font-size: 0.55rem;
		color: var(--color-text-muted);
		opacity: 0.7;
		white-space: nowrap;
	}

	.card-link {
		font-family: var(--font-mono), monospace;
		font-size: 0.58rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-primary);
		text-decoration: none;
		transition: opacity 0.15s ease;
		white-space: nowrap;
	}

	.card-link:hover { opacity: 0.7; }

	.card-link--soon {
		opacity: 0.35;
		cursor: default;
	}

	/* ── Video-specific ─────────────────────────────────────────────────────── */
	.video-card.playable {
		cursor: pointer;
	}

	.video-thumb {
		position: relative;
		height: 140px;
		background: #080c10;
		border-bottom: 1px solid var(--color-muted);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.thumb-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(100,120,160, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(100,120,160, 0.06) 1px, transparent 1px);
		background-size: 24px 24px;
	}

	.thumb-play-btn {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 1.5px solid rgba(255,255,255,0.25);
		color: rgba(255,255,255,0.6);
		transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
	}

	.video-card.playable:hover .thumb-play-btn {
		border-color: var(--color-primary);
		color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
	}

	.thumb-coming {
		position: relative;
		z-index: 2;
		font-family: var(--font-mono), monospace;
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: rgba(255,255,255,0.2);
		text-transform: uppercase;
	}

	.video-meta-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.video-platform {
		font-family: var(--font-mono), monospace;
		font-size: 0.52rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		border: 1px solid var(--color-muted);
		padding: 0.1rem 0.35rem;
		border-radius: 1px;
	}

	.video-platform.drive {
		color: #4da6ff;
		border-color: rgba(77,166,255,0.3);
	}

	/* ── Modal ──────────────────────────────────────────────────────────────── */
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
		max-width: 1000px;
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
		font-family: var(--font-mono), monospace;
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-primary);
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
		flex-shrink: 0;
	}

	.modal-close:hover { color: #e0e0e0; }

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
</style>
