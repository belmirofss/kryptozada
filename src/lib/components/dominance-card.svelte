<script>
	export let btc;
	export let eth;

	$: others = Math.max(100 - btc - eth, 0);
	$: rows = [
		{ label: 'Bitcoin dominance', value: btc },
		{ label: 'Ethereum dominance', value: eth },
		{ label: 'Everything else', value: others }
	];
</script>

<div
	id="dominance"
	class="flex scroll-mt-6 flex-col gap-4 border-[3px] border-ink bg-white p-5 shadow-brutal lg:gap-6 lg:p-8 lg:shadow-brutal-lg"
>
	<div class="flex items-baseline justify-between gap-4">
		<h2 class="text-xl font-extrabold lg:text-[28px]">Who owns the market?</h2>
		<span class="hidden font-mono text-sm sm:inline">share of total cap</span>
	</div>

	<div
		class="flex h-12 border-[3px] border-ink lg:h-[72px]"
		role="img"
		aria-label="Bitcoin {btc.toFixed(1)}%, Ethereum {eth.toFixed(1)}%, others {others.toFixed(1)}%"
	>
		<div
			class="flex items-center border-r-[3px] border-ink bg-primary pl-3 font-extrabold lg:text-xl"
			style="width: {btc}%"
		>
			BTC
		</div>
		<div
			class="flex items-center justify-center overflow-hidden border-r-[3px] border-ink bg-ink font-extrabold text-white"
			style="width: {eth}%"
		>
			<span class="hidden lg:inline">ETH</span>
		</div>
		<div class="hatch flex flex-1 items-center justify-center overflow-hidden font-bold">
			<span class="hidden lg:inline">Others</span>
		</div>
	</div>

	<dl class="flex flex-col text-base lg:text-lg">
		{#each rows as row}
			<div
				class="flex justify-between border-b-2 border-ink py-2.5 last:border-b-0 last:pb-0 lg:py-3"
			>
				<dt class="font-bold">{row.label}</dt>
				<dd class="font-mono font-medium">{row.value.toFixed(1)}%</dd>
			</div>
		{/each}
	</dl>
</div>

<style>
	.hatch {
		background: repeating-linear-gradient(135deg, #ffffff 0 8px, #e6e6e6 8px 10px);
	}
</style>
