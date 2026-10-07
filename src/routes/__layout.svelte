<script>
	import { navigating } from '$app/stores';
	import BackToTop from '$lib/components/back-to-top.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	import SplashScreen from '$lib/components/splash-screen.svelte';
	import '../app.css';
</script>

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
