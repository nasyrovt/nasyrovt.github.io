<script lang="ts">
	import { siteMetadata } from '$lib/data/site';
</script>

<div class="contact-cta">
	<div class="cta-header">
		<span class="cta-header-arrow">▶</span>
		<span class="cta-header-label">GET IN TOUCH</span>
	</div>
	<div class="cta-body">
		<h3 class="cta-title">Get in Touch</h3>
		<p class="cta-text">Feel free to reach out via any of the channels below.</p>

		<div class="cta-links">
			<a href="mailto:nasyrovt@example.com" class="cta-link">
				<span>Email</span>
			</a>
			<a
				href="https://github.com/{siteMetadata.github}"
				target="_blank"
				rel="noopener noreferrer"
				class="cta-link"
			>
				<span>GitHub</span>
			</a>
			<a href="/cv.pdf" target="_blank" rel="noopener noreferrer" class="cta-link">
				<span>Download CV</span>
			</a>
		</div>
	</div>
</div>

<style>
	.contact-cta {
		background: var(--color-background);
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		padding: 0;
		transition: border-color 0.15s ease;
	}

	.cta-header {
		background: var(--color-background-themes);
		border-bottom: 1px solid var(--color-muted);
		padding: 0.5rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.cta-header-arrow {
		color: var(--color-primary);
		font-size: 0.6rem;
		line-height: 1;
	}

	.cta-header-label {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
	}

	.cta-body {
		padding: 1.5rem 1.25rem;
	}

	.cta-title {
		font-size: 0.9rem;
		font-weight: 700;
		margin: 0 0 0.4rem;
		color: var(--color-heading);
	}

	.cta-text {
		color: var(--color-text-muted);
		font-size: 0.8rem;
		margin: 0 0 1.25rem;
	}

	.cta-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.cta-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.875rem;
		border: 1px solid var(--color-muted);
		border-radius: 2px;
		color: var(--color-text);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: all 0.15s ease;
		text-decoration: none;
	}

	.cta-link:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
		opacity: 1;
	}
</style>
