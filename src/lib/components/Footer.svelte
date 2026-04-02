<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-inner">
		<span class="footer-status">
			<span class="status-dot">●</span>
			<span class="status-text">READY</span>
		</span>
		<span class="footer-copy">&copy; {year} Takhir Nasyrov</span>
	</div>
</footer>

<style>
	.footer {
		background: var(--color-background);
		border-top: 1px solid var(--color-muted);
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
		height: 32px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer-status {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.status-dot {
		color: var(--color-primary);
		font-size: 0.6rem;
		line-height: 1;
	}

	.status-text {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--color-primary);
		text-transform: uppercase;
	}

	.footer-copy {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-text-muted);
		letter-spacing: 0.05em;
	}
</style>
