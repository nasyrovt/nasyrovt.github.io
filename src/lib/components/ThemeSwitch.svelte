<script lang="ts">
	import { theme } from '$lib/stores/theme';

	let currentTheme = $derived($theme);

	function getIcon(t: string) {
		if (t === 'light') return '☀️';
		if (t === 'dark') return '🌙';
		return '👾';
	}
</script>

<button
	onclick={() => theme.cycle()}
	class="theme-switch"
	aria-label="Toggle theme"
	title="Current: {currentTheme}"
>
	<span class="theme-icon">{getIcon(currentTheme)}</span>
</button>

<style>
	.theme-switch {
		background: none;
		border: 2px solid var(--color-muted);
		border-radius: 9999px;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1.2rem;
	}

	.theme-switch:hover {
		border-color: var(--color-primary);
		transform: scale(1.1);
	}

	.theme-icon {
		line-height: 1;
	}
</style>
