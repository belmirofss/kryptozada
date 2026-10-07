<script>
	let hidden = true;

	const onScroll = () => {
		hidden = (document.documentElement || document.body).scrollTop < 600;
	};
</script>

<svelte:window on:scroll={onScroll} />

<a
	href="#top"
	class="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-primary text-xl font-extrabold shadow-brutal-sm transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal lg:bottom-10 lg:right-10"
	class:invisible={hidden}
	class:opacity-0={hidden}
	aria-label="Back to top"
	tabindex={hidden ? -1 : 0}>↑</a
>
