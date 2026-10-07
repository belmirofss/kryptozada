<script>
	import { page } from '$app/stores';
	import { site_name, site_url } from '$lib/constants';

	export let title;
	export let description;
	export let noindex = false;
	/** Schema.org objects, rendered as JSON-LD. */
	export let jsonLd = [];

	const image = `${site_url}/kryptozada-icon.png`;

	$: canonical = `${site_url}${$page.url.pathname}`;
	// Built from a variable because a literal script tag here trips up the Svelte tooling.
	// "<" is escaped so data from the API can never close the tag early.
	const tagName = 'script';
	$: structuredData = jsonLd.map(
		(item) =>
			`<${tagName} type="application/ld+json">${JSON.stringify(item).replace(
				/</g,
				'\\u003c'
			)}</${tagName}>`
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{:else}
		<link rel="canonical" href={canonical} />
	{/if}

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site_name} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="500" />
	<meta property="og:image:height" content="500" />
	<meta property="og:image:alt" content="Kryptozada logo" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#each structuredData as tag}
		{@html tag}
	{/each}
</svelte:head>
