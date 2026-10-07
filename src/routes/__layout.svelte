<script>
	import { navigating } from '$app/stores';
	import BackToTop from '$lib/components/back-to-top.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import SplashScreen from '$lib/components/splash-screen.svelte';
	import bricolage from '$lib/fonts/bricolage-grotesque-latin-opsz-normal.woff2';
	import dmMono400 from '$lib/fonts/dm-mono-latin-400-normal.woff2';
	import dmMono500 from '$lib/fonts/dm-mono-latin-500-normal.woff2';
	import '../app.css';
</script>

<svelte:head>
	<!-- Start the font downloads with the HTML instead of waiting for the CSS. -->
	{#each [bricolage, dmMono400, dmMono500] as font}
		<link rel="preload" href={font} as="font" type="font/woff2" crossorigin="anonymous" />
	{/each}
</svelte:head>

{#if $navigating}
	<SplashScreen />
{/if}

<div id="top" class="flex min-h-screen flex-col bg-white">
	<a
		href="#content"
		class="sr-only z-50 bg-primary p-3 font-bold focus:not-sr-only focus:absolute focus:left-3 focus:top-3"
		>Skip to content</a
	>
	<Header />

	<main id="content" class="flex flex-1 flex-col">
		<slot />
	</main>

	<Footer />
</div>

<BackToTop />
