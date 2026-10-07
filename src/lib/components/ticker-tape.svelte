<script>
	import { coinPath, formatPercent, formatPrice, trend, trendArrow } from '$lib/utils';

	export let tickers = [];

	const colour = { up: 'text-[#7EE2A8]', down: 'text-[#FF9A8A]', flat: 'text-neutral-300' };
</script>

<div
	class="tape relative h-10 overflow-hidden bg-ink font-mono text-sm text-white sm:h-12"
	aria-label="Top 10 prices"
>
	<div class="tape-track flex h-full w-max items-center">
		{#each [0, 1] as copy}
			<ul class="flex items-center gap-10 pr-10" aria-hidden={copy === 1}>
				{#each tickers as ticker}
					<li class="flex items-center gap-2.5 whitespace-nowrap">
						<a
							class="font-medium text-primary hover:underline"
							href={coinPath(ticker)}
							tabindex={copy === 1 ? -1 : 0}>{ticker.symbol}</a
						>
						<span class="hidden sm:inline">{formatPrice(ticker.price_usd)}</span>
						<span class={colour[trend(ticker.percent_change_24h)]}
							>{trendArrow(ticker.percent_change_24h)}
							{formatPercent(ticker.percent_change_24h)}</span
						>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>

<style>
	.tape-track {
		animation: tape 45s linear infinite;
	}

	.tape:hover .tape-track,
	.tape:focus-within .tape-track {
		animation-play-state: paused;
	}

	@keyframes tape {
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tape-track {
			animation: none;
		}
	}
</style>
