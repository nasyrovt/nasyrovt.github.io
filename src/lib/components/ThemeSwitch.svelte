<script lang="ts">
	import { theme } from '$lib/stores/theme';

	let currentTheme = $derived($theme);

	function getIcon(t: string) {
		if (t === 'light') return '☀️';
		return '🌙';
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
		background: var(--color-background-themes);
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: border-color 0.15s ease;
		font-size: 0.9rem;
	}

	.theme-switch:hover {
		border-color: var(--color-primary);
	}

	.theme-icon {
		line-height: 1;
	}
</style>
