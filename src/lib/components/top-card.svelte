<script>
	import { coinPath, formatPrice } from '$lib/utils';
	import ChangePill from './change-pill.svelte';
	import CoinIcon from './coin-icon.svelte';
	import MomentumBars from './momentum-bars.svelte';

	export let ticker;
	export let position;
</script>

<a
	href={coinPath(ticker)}
	class="flex h-full flex-col gap-3 border-[3px] border-ink p-4 shadow-brutal transition duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_#111111] focus-visible:-translate-x-[3px] focus-visible:-translate-y-[3px] focus-visible:outline-none lg:gap-3.5 lg:p-5"
	class:bg-primary={position === 1}
	class:bg-white={position !== 1}
>
	<div class="flex items-center justify-between">
		<CoinIcon {ticker} size="h-10 w-10 border-[3px] text-lg lg:h-11 lg:w-11" />
		<span class="font-mono text-2xl font-medium lg:text-[28px]"
			>#{String(position).padStart(2, '0')}</span
		>
	</div>
	<div class="min-w-0">
		<div class="truncate text-lg font-extrabold lg:text-[22px]">{ticker.name}</div>
		<div class="font-mono text-sm text-muted">${ticker.symbol}</div>
	</div>
	<div class="font-mono text-lg font-medium lg:text-[22px]">{formatPrice(ticker.price_usd)}</div>
	<div class="mt-auto flex items-center justify-between gap-2">
		<ChangePill value={ticker.percent_change_24h} size="px-1.5 py-0.5 text-xs lg:text-sm lg:px-2" />
		<MomentumBars {ticker} />
	</div>
</a>
