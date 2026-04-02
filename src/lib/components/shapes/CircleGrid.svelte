<script lang="ts">
	interface Props {
		className?: string;
	}

	let { className = '' }: Props = $props();
</script>

<svg class="circle-grid {className}" width="100" height="100" viewBox="0 0 100 100">
	{#each Array(5) as _, row}
		{#each Array(5) as _, col}
			<circle cx={10 + col * 20} cy={10 + row * 20} r="4" fill="var(--color-muted)" opacity="0.3" />
		{/each}
	{/each}
</svg>

<style>
	.circle-grid {
		position: absolute;
		opacity: 0.4;
	}
</style>
