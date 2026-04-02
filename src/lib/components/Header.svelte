<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';
	import { siteMetadata } from '$lib/data/site';
	import { scrollY } from '$lib/stores/scroll';

	let atTop = $derived($scrollY < 40);
</script>

<header class="header" class:at-top={atTop}>
	<div class="header-inner container">
		<a href="/" class="site-logo">◈ TAKHIR.DEV</a>

		<nav class="header-nav">
			<a
				href="https://github.com/{siteMetadata.github}"
				target="_blank"
				rel="noopener noreferrer"
				class="github-btn"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
				<span>GitHub</span>
			</a>
			<ThemeSwitch />
		</nav>
	</div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		background-color: var(--color-background);
		border-bottom: 1px solid var(--color-muted);
		transition:
			border-color 0.4s ease;
	}

	.header.at-top {
		border-bottom-color: transparent;
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
	}

	.site-logo {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-heading);
		text-decoration: none;
		opacity: 1;
		transition: color 0.2s ease;
	}

	.site-logo:hover {
		color: var(--color-primary);
		opacity: 1;
	}

	.header-nav {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.github-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.75rem;
		background: var(--color-primary);
		color: #0d0d0d;
		border-radius: 2px;
		font-weight: 600;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: background-color 0.15s ease;
		text-decoration: none;
		opacity: 1;
	}

	.github-btn:hover {
		background-color: color-mix(in srgb, var(--color-primary) 80%, white 20%);
		opacity: 1;
	}
</style>
