<script>
	import { onMount } from 'svelte';
	import { coinlore_img } from '$lib/constants';

	export let ticker;
	export let size = 'h-8 w-8 text-sm';

	let img;
	let failed = false;

	// The image may fail before hydration attaches on:error, so check once on mount too.
	onMount(() => {
		if (img && img.complete && img.naturalWidth === 0) failed = true;
	});
</script>

<span
	class="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-white font-extrabold {size}"
	aria-hidden="true"
>
	{#if failed}
		{ticker.symbol.slice(0, 1)}
	{:else}
		<img
			bind:this={img}
			class="h-full w-full object-cover"
			src="{coinlore_img}/{ticker.nameid}.png"
			alt=""
			loading="lazy"
			on:error={() => (failed = true)}
		/>
	{/if}
</span>
