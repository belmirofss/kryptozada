<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ status }) {
		return { props: { status } };
	}
</script>

<script>
	export let status;

	$: notFound = status === 404;
</script>

<svelte:head>
	<title>Kryptozada | {notFound ? 'Coin not found' : 'Something went wrong'}</title>
</svelte:head>

<section class="flex flex-1 items-center bg-paper">
	<div class="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8 lg:px-14 lg:py-24">
		<div
			class="flex max-w-3xl flex-col gap-4 border-[3px] border-ink bg-ink p-6 text-white shadow-brutal-lg lg:gap-5 lg:p-10"
		>
			<span class="font-mono text-xs uppercase tracking-[0.1em] text-primary lg:text-sm">
				{notFound ? 'Coin not found' : "Can't reach the market data"} · {status}
			</span>
			<span class="text-8xl font-extrabold leading-[0.9] text-primary lg:text-[160px]"
				>{status}</span
			>
			<h1 class="text-3xl font-extrabold leading-tight lg:text-5xl">
				{notFound ? 'This coin fell off the chain.' : "CoinLore isn't answering right now."}
			</h1>
			<p class="text-lg font-medium text-neutral-300 lg:text-xl">
				{notFound
					? 'It may have been delisted, or the link is wrong.'
					: 'Prices come from CoinLore. Give it a moment and try again.'}
			</p>
			<div class="mt-2 flex flex-wrap gap-3">
				<a
					href="/"
					class="border-[3px] border-white bg-primary px-4 py-2.5 font-extrabold text-ink transition hover:-translate-x-0.5 hover:-translate-y-0.5"
					>Back to all markets</a
				>
				{#if !notFound}
					<button
						type="button"
						class="border-[3px] border-white px-4 py-2.5 font-extrabold"
						on:click={() => location.reload()}>Try again</button
					>
				{/if}
			</div>
		</div>
	</div>
</section>
