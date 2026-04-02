<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error-page">
	<div class="error-content">
		<h1 class="error-code">{$page.status}</h1>
		<p class="error-message">{$page.error?.message || 'Page not found'}</p>
		<a href="/" class="error-link">← Back to Home</a>
	</div>
</div>

<style>
	.error-page {
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	}

	.error-code {
		font-size: 6rem;
		font-weight: 700;
		margin: 0;
		background-image: var(--gradient-indigo);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.error-message {
		font-size: 1.25rem;
		color: var(--color-text-muted);
		margin: 0.5rem 0 2rem;
	}

	.error-link {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: var(--gradient-indigo);
		color: white;
		border-radius: 9999px;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.error-link:hover {
		transform: translateY(-2px);
		opacity: 1;
	}
</style>
