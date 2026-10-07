<script>
	import { formatPercent, trend } from '$lib/utils';

	/** Mini diverging bars for 1h / 24h / 7d — the history CoinLore actually gives us. */
	export let ticker;

	const SCALE = { h1: 2, h24: 5, d7: 12 };

	$: bars = [
		{ key: 'h1', label: '1h', value: +ticker.percent_change_1h },
		{ key: 'h24', label: '24h', value: +ticker.percent_change_24h },
		{ key: 'd7', label: '7d', value: +ticker.percent_change_7d }
	].map((bar) => ({
		...bar,
		trend: trend(bar.value),
		height: Math.max(Math.min(Math.abs(bar.value) / SCALE[bar.key], 1) * 50, 4)
	}));

	$: summary = bars.map((b) => `${b.label} ${formatPercent(b.value)}`).join(', ');
</script>

<span class="inline-flex h-8 items-center gap-1.5" role="img" aria-label="Momentum: {summary}">
	{#each bars as bar}
		<span class="relative h-full w-2.5 bg-neutral-200">
			<span
				class="absolute inset-x-0"
				class:bg-up-bar={bar.trend === 'up'}
				class:bg-down-bar={bar.trend === 'down'}
				class:bg-neutral-400={bar.trend === 'flat'}
				style="height: {bar.height}%; {bar.value >= 0 ? 'bottom: 50%' : 'top: 50%'}"
			/>
		</span>
	{/each}
</span>
