<script lang="ts">
	import { scrollReveal } from '$lib/utils/gsap';
	import { parallax } from '$lib/utils/parallax';

	interface BlogPost {
		title: string;
		description: string;
		date: string;
		tags: string[];
		url?: string;
	}

	interface VideoEntry {
		title: string;
		description: string;
		duration: string;
		platform: string;
		tags: string[];
		url?: string;
	}

	const blogs: BlogPost[] = [
		{
			title: 'Building AI Enemies in Unreal Engine 5',
			description:
				'A deep dive into Behavior Trees and the Environment Query System for creating challenging enemy AI that reacts intelligently to player actions.',
			date: '2024-12-15',
			tags: ['UE5', 'AI', 'C++'],
			url: '#',
		},
		{
			title: 'Multiplayer Architecture Patterns in UE5',
			description:
				'Exploring replication strategies, lag compensation, and server authority for building robust competitive multiplayer experiences.',
			date: '2024-10-28',
			tags: ['UE5', 'Networking', 'Multiplayer'],
			url: '#',
		},
		{
			title: 'From Unity to Unreal: A Practical Guide',
			description:
				'Key mental-model shifts, workflow differences, and practical tips for Unity developers making the jump to Unreal Engine.',
			date: '2024-08-10',
			tags: ['UE5', 'Unity', 'Gamedev'],
			url: '#',
		},
	];

	const videos: VideoEntry[] = [
		{
			title: 'Procedural Dungeon Generation — Full Breakdown',
			description:
				'Step-by-step walkthrough of a procedural dungeon generator in UE5 using BSP trees, room templates, and corridor logic.',
			duration: '24:15',
			platform: 'YouTube',
			tags: ['UE5', 'Procedural', 'Tutorial'],
			url: '#',
		},
		{
			title: 'Third-Person Combat System from Scratch',
			description:
				'Building a full combat system — combo attacks, blocking, dodging, and hit reactions — entirely in Unreal Animation Blueprint.',
			duration: '38:42',
			platform: 'YouTube',
			tags: ['UE5', 'Combat', 'Animation'],
			url: '#',
		},
	];

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	}

</script>

<section class="pub-section" id="publications">
	<div class="container" use:parallax={{ speed: 0.08 }}>

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
							<div class="card-meta">
								<span class="card-date">{formatDate(post.date)}</span>
								{#if post.url && post.url !== '#'}
									<a href={post.url} target="_blank" rel="noopener noreferrer" class="card-link">
										READ →
									</a>
								{:else}
									<span class="card-link card-link--soon">COMING SOON</span>
								{/if}
							</div>
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
				use:scrollReveal={{ children: true, stagger: 0.1, y: 24 }}
			>
				{#each videos as video}
					<article class="pub-card video-card">
						<!-- Thumbnail placeholder -->
						<div class="video-thumb" aria-hidden="true">
							<div class="thumb-play">▶</div>
							<div class="thumb-duration">{video.duration}</div>
							<div class="thumb-grid"></div>
						</div>
						<div class="card-body">
							<div class="video-meta-row">
								<span class="video-platform">{video.platform}</span>
								<span class="video-duration-inline">{video.duration}</span>
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
							{#if video.url && video.url !== '#'}
								<a href={video.url} target="_blank" rel="noopener noreferrer" class="card-link">
									WATCH →
								</a>
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

<style>
	/* ── Section shell ──────────────────────────────────────────────────────── */
	.pub-section {
		padding: 5rem 0 4rem;
		margin-bottom: 12rem;
		position: relative;
		overflow: hidden;
		background-color: var(--color-background-themes);
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
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
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
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.blog-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.blog-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* ── Video grid ─────────────────────────────────────────────────────────── */
	.video-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.video-grid {
			grid-template-columns: repeat(2, 1fr);
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
	.video-thumb {
		position: relative;
		height: 120px;
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

	.thumb-play {
		position: relative;
		z-index: 2;
		font-size: 1.5rem;
		color: rgba(255, 255, 255, 0.15);
		line-height: 1;
	}

	.thumb-duration {
		position: absolute;
		bottom: 6px;
		right: 8px;
		z-index: 2;
		font-family: var(--font-mono), monospace;
		font-size: 0.6rem;
		font-weight: 700;
		color: rgba(255,255,255,0.5);
		background: rgba(0,0,0,0.5);
		padding: 0.1rem 0.35rem;
		border-radius: 2px;
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
		color: #ef5350;
		border: 1px solid rgba(239, 83, 80, 0.3);
		padding: 0.1rem 0.35rem;
		border-radius: 1px;
	}

	.video-duration-inline {
		font-family: var(--font-mono), monospace;
		font-size: 0.55rem;
		color: var(--color-text-muted);
		opacity: 0.6;
	}
</style>
