<script lang="ts">
	import { siteMetadata } from '$lib/data/site';
</script>

<div class="contact-cta">
	<h3 class="cta-title">Get in Touch</h3>
	<p class="cta-text">Feel free to reach out via any of the channels below.</p>

	<div class="cta-links">
		<a href="mailto:nasyrovt@example.com" class="cta-link">
			<span class="cta-icon">✉️</span>
			<span>Email</span>
		</a>
		<a
			href="https://github.com/{siteMetadata.github}"
			target="_blank"
			rel="noopener noreferrer"
			class="cta-link"
		>
			<span class="cta-icon">💻</span>
			<span>GitHub</span>
		</a>
		<a href="/cv.pdf" target="_blank" rel="noopener noreferrer" class="cta-link">
			<span class="cta-icon">📄</span>
			<span>Download CV</span>
		</a>
	</div>
</div>

<style>
	.contact-cta {
		background: var(--color-background-themes);
		border: 1px solid var(--color-muted);
		border-radius: 1rem;
		padding: 2.5rem;
		text-align: center;
		transition: all 0.3s ease;
	}

	.cta-title {
		font-size: 1.5rem;
		margin: 0 0 0.5rem;
	}

	.cta-text {
		color: var(--color-text-muted);
		margin: 0 0 1.5rem;
	}

	.cta-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.cta-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border: 2px solid var(--color-muted);
		border-radius: 9999px;
		color: var(--color-text);
		font-weight: 600;
		font-size: 0.875rem;
		transition: all 0.3s ease;
	}

	.cta-link:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
		transform: translateY(-2px);
		opacity: 1;
	}

	.cta-icon {
		font-size: 1.2rem;
	}
</style>
