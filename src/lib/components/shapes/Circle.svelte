<script lang="ts">
	interface Props {
		color?: string;
		size?: string;
		className?: string;
	}

	let { color = 'blue', size = '100px', className = '' }: Props = $props();
</script>

<div
	class="circle {className}"
	style="width: {size}; height: {size}; background-image: var(--gradient-{color});"
></div>

<style>
	.circle {
		border-radius: 50%;
		position: absolute;
		opacity: 0.6;
	}
</style>
