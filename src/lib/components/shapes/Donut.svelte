<script lang="ts">
	interface Props {
		color?: string;
		size?: string;
		className?: string;
	}

	let { color = 'blue', size = '100px', className = '' }: Props = $props();
</script>

<div
	class="donut {className}"
	style="width: {size}; height: {size}; border-color: transparent; box-shadow: inset 0 0 0 {parseInt(size) / 5}px; background-image: var(--gradient-{color}); -webkit-background-clip: padding-box; background-clip: padding-box;"
></div>

<style>
	.donut {
		border-radius: 50%;
		position: absolute;
		opacity: 0.6;
		background-image: var(--gradient-blue);
		mask: radial-gradient(circle, transparent 55%, black 56%);
		-webkit-mask: radial-gradient(circle, transparent 55%, black 56%);
	}
</style>
