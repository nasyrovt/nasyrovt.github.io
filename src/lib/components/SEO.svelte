<script lang="ts">
	import { siteMetadata } from '$lib/data/site';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
	}

	let {
		title = siteMetadata.title,
		description = siteMetadata.description,
		image = siteMetadata.image,
		url = siteMetadata.siteUrl
	}: Props = $props();

	let fullTitle = $derived(title === siteMetadata.title ? title : `${title} | ${siteMetadata.author}`);
	let fullImage = $derived(image.startsWith('http') ? image : `${siteMetadata.siteUrl}${image}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="author" content={siteMetadata.author} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content={siteMetadata.author} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImage} />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				name: siteMetadata.author,
				url: siteMetadata.siteUrl,
				logo: fullImage
			},
			{
				'@type': 'WebPage',
				name: fullTitle,
				description: description,
				url: url
			}
		]
	})}</script>`}
</svelte:head>
