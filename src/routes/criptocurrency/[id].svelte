<script>
	import ChangePill from '$lib/components/change-pill.svelte';
	import CoinIcon from '$lib/components/coin-icon.svelte';
	import {
		describeChange,
		formatCompactCurrency,
		formatCompactNumber,
		formatPercent,
		formatPrice,
		trend,
		trendTextClass
	} from '$lib/utils';

	export let ticker;
	export let markets;
	export let neighbours;

	// Bars run from a centre line; each timeframe gets a scale that fits typical moves.
	const MOMENTUM = [
		{ key: 'percent_change_1h', label: 'Last hour', scale: 2 },
		{ key: 'percent_change_24h', label: '24 hours', scale: 10 },
		{ key: 'percent_change_7d', label: '7 days', scale: 25 }
	];

	$: moves = MOMENTUM.map((m) => {
		const value = +ticker[m.key];
		return {
			...m,
			value,
			trend: trend(value),
			width: Math.min(Math.abs(value) / m.scale, 1) * 50
		};
	});

	$: sentence = [
		{
			text: describeChange(ticker.percent_change_24h),
			suffix: 'today',
			value: ticker.percent_change_24h
		},
		{
			text: describeChange(ticker.percent_change_1h),
			suffix: 'in the last hour',
			value: ticker.percent_change_1h
		},
		{
			text: describeChange(ticker.percent_change_7d),
			suffix: 'this week',
			value: ticker.percent_change_7d
		}
	];

	$: volumeRatio = +ticker.market_cap_usd ? (+ticker.volume24 / +ticker.market_cap_usd) * 100 : 0;
	$: stats = [
		{ label: 'Market cap', value: formatCompactCurrency(ticker.market_cap_usd), highlight: true },
		{ label: 'Volume (24h)', value: formatCompactCurrency(ticker.volume24) },
		{
			label: 'Circulating supply',
			value: `${formatCompactNumber(ticker.csupply)} ${ticker.symbol}`
		},
		{
			label: 'Max supply',
			value: +ticker.msupply ? `${formatCompactNumber(ticker.msupply)} ${ticker.symbol}` : 'No cap'
		},
		{ label: 'Price in BTC', value: `${(+ticker.price_btc).toPrecision(4)} BTC` },
		{ label: 'Volume / market cap', value: `${volumeRatio.toFixed(2)}%` }
	];
</script>

<svelte:head>
	<title>Kryptozada | {ticker.name} ({ticker.symbol})</title>
</svelte:head>

<div class="border-b-[3px] border-ink">
	<nav
		class="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-4 text-[17px] font-semibold sm:px-8 lg:px-14 lg:py-6"
		aria-label="Breadcrumb"
	>
		<a href="/#markets" class="font-extrabold underline underline-offset-4">← All markets</a>
		<span aria-hidden="true">/</span>
		<span aria-current="page" class="truncate">{ticker.name}</span>
	</nav>
</div>

<div class="mx-auto flex w-full max-w-[1440px] flex-col">
	<section
		class="grid gap-7 px-4 pb-6 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:px-14 lg:pb-10 lg:pt-16"
	>
		<div class="flex items-center gap-5 lg:gap-8">
			<div class="relative shrink-0">
				<CoinIcon
					{ticker}
					size="h-[84px] w-[84px] border-[3px] text-4xl lg:h-[132px] lg:w-[132px] lg:border-4 lg:text-6xl"
				/>
				<span
					class="absolute -right-3 -top-2 rotate-[10deg] border-2 border-ink bg-primary px-2 py-0.5 font-mono text-sm lg:-right-[18px] lg:-top-2.5 lg:border-[3px] lg:px-2.5 lg:py-1 lg:text-lg"
					>#{ticker.rank}</span
				>
			</div>
			<div class="min-w-0">
				<h1
					class="break-words text-[52px] font-extrabold leading-[0.9] tracking-[-0.03em] lg:text-[96px] xl:text-[120px]"
				>
					{ticker.name}
				</h1>
				<div class="mt-1.5 font-mono text-base lg:mt-3 lg:text-[22px]">${ticker.symbol}</div>
			</div>
		</div>

		<div
			class="flex flex-col gap-2 border-[3px] border-ink bg-primary px-5 py-4 shadow-brutal lg:gap-2.5 lg:px-8 lg:py-7 lg:shadow-brutal-lg"
		>
			<span class="font-mono text-xs uppercase tracking-[0.08em] lg:text-sm">Price now</span>
			<span class="break-all font-mono text-[44px] font-medium leading-none lg:text-[68px]"
				>{formatPrice(ticker.price_usd)}</span
			>
			<div class="flex flex-wrap items-center justify-between gap-2 font-mono text-sm lg:text-lg">
				<span>= {(+ticker.price_btc).toPrecision(4)} BTC</span>
				<ChangePill value={ticker.percent_change_24h} suffix=" 24h" size="px-2 py-0.5 lg:px-2.5" />
			</div>
		</div>
	</section>

	<section class="px-4 pb-8 sm:px-8 lg:px-14 lg:pb-16 lg:pt-6">
		<p
			class="max-w-[1200px] text-[26px] font-bold leading-[1.35] lg:text-[44px] lg:leading-[1.3] lg:tracking-[-0.01em]"
		>
			{ticker.name} is
			{#each sentence as part, i}
				<span class={trend(part.value) === 'down' ? 'mark-down' : 'mark'}>{part.text}</span>
				{part.suffix}{i === 0 ? ', ' : i === 1 ? ', and ' : '.'}
			{/each}
		</p>
	</section>

	<section class="grid gap-6 px-4 pb-10 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-14 lg:pb-[72px]">
		<div
			class="flex flex-col gap-4 border-[3px] border-ink p-[18px] shadow-brutal lg:gap-[22px] lg:px-8 lg:py-7 lg:shadow-[8px_8px_0_#111111]"
		>
			<div class="flex items-baseline justify-between">
				<h2 class="text-[22px] font-extrabold lg:text-[28px]">Momentum</h2>
				<span class="font-mono text-xs lg:text-[13px]">bar = size of the move</span>
			</div>
			{#each moves as move}
				<div
					class="flex flex-col gap-1.5 lg:grid lg:grid-cols-[110px_minmax(0,1fr)_96px] lg:items-center lg:gap-4"
				>
					<div class="flex justify-between lg:contents">
						<span class="font-bold lg:text-lg">{move.label}</span>
						<span
							class="font-mono font-medium lg:order-last lg:text-right lg:text-xl {trendTextClass(
								move.value
							)}">{formatPercent(move.value)}</span
						>
					</div>
					<div class="track relative h-7 border-[3px] border-ink lg:h-10" aria-hidden="true">
						<span
							class="absolute -bottom-1.5 -top-1.5 left-1/2 w-[3px] -translate-x-1/2 bg-ink lg:-bottom-2 lg:-top-2"
						/>
						<span
							class="absolute bottom-1 top-1 lg:bottom-1.5 lg:top-1.5"
							class:bg-up-bar={move.trend === 'up'}
							class:bg-down-bar={move.trend === 'down'}
							class:bg-neutral-400={move.trend === 'flat'}
							style="width: {Math.max(move.width, 0.5)}%; {move.value >= 0
								? 'left: 50%'
								: 'right: 50%'}"
						/>
					</div>
				</div>
			{/each}
		</div>

		<dl class="grid grid-cols-2 gap-3 lg:gap-5">
			{#each stats as stat}
				<div
					class="flex flex-col gap-1 border-[3px] border-ink px-3.5 py-3 lg:gap-1.5 lg:px-5 lg:py-[18px]"
					class:bg-primary={stat.highlight}
				>
					<dt class="text-[13px] font-semibold lg:text-[15px]">{stat.label}</dt>
					<dd class="break-words font-mono text-lg font-medium lg:text-[26px]">{stat.value}</dd>
				</div>
			{/each}
		</dl>
	</section>
</div>

{#if markets.top.length}
	<section class="border-t-[3px] border-ink bg-paper">
		<div
			class="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 pb-10 pt-8 sm:px-8 lg:gap-7 lg:px-14 lg:pb-[72px] lg:pt-16"
		>
			<div class="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between">
				<h2 class="text-[32px] font-extrabold leading-none tracking-[-0.02em] lg:text-[56px]">
					Where {ticker.name} trades
				</h2>
				<span class="font-mono text-sm"
					>Top {markets.top.length} of {markets.total} markets by volume</span
				>
			</div>
			<div class="border-[3px] border-ink bg-white shadow-brutal lg:shadow-[8px_8px_0_#111111]">
				<div
					class="hidden h-[50px] grid-cols-[56px_minmax(0,2fr)_repeat(3,minmax(0,1fr))] items-center gap-4 bg-ink px-5 font-mono text-[13px] uppercase tracking-[0.06em] text-white lg:grid"
					aria-hidden="true"
				>
					<span>#</span><span>Exchange</span><span>Pair</span><span class="text-right">Price</span
					><span class="text-right">Volume 24h</span>
				</div>
				<ul>
					{#each markets.top as market, i}
						<li
							class="flex h-[66px] items-center justify-between gap-4 border-b-2 border-ink px-3.5 last:border-b-0 lg:grid lg:h-[62px] lg:grid-cols-[56px_minmax(0,2fr)_repeat(3,minmax(0,1fr))] lg:border-b-0 lg:border-t-2 lg:px-5 lg:text-lg"
						>
							<span class="hidden font-mono text-muted lg:block">{i + 1}</span>
							<span class="flex min-w-0 flex-col lg:contents">
								<b class="truncate font-extrabold">{market.name}</b>
								<span class="font-mono text-xs text-muted lg:text-lg lg:text-ink"
									>{market.base}/{market.quote}</span
								>
							</span>
							<span class="flex flex-col items-end lg:contents">
								<span class="font-mono text-[15px] lg:text-right lg:text-lg"
									>{formatPrice(market.price_usd)}</span
								>
								<span class="font-mono text-xs text-muted lg:text-right lg:text-lg lg:text-ink"
									><span class="lg:hidden">vol </span>{formatCompactCurrency(
										market.volume_usd
									)}</span
								>
							</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
{/if}

{#if neighbours.previous || neighbours.next}
	<section class="border-t-[3px] border-ink">
		<nav
			class="mx-auto grid max-w-[1440px] grid-cols-2 gap-3 px-4 pb-10 pt-7 sm:px-8 lg:gap-8 lg:p-14"
			aria-label="Coins ranked nearby"
		>
			{#if neighbours.previous}
				<a
					href="/criptocurrency/{neighbours.previous.id}"
					class="flex min-w-0 flex-col gap-0.5 border-[3px] border-ink p-3.5 shadow-brutal-sm transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal lg:flex-row lg:items-center lg:gap-5 lg:px-7 lg:py-6 lg:shadow-[8px_8px_0_#111111]"
				>
					<span class="hidden text-[40px] font-extrabold lg:inline" aria-hidden="true">←</span>
					<span class="flex min-w-0 flex-col">
						<span class="font-mono text-xs lg:text-sm"
							><span class="lg:hidden">← </span>Rank #{neighbours.previous.rank}</span
						>
						<b class="truncate text-xl font-extrabold lg:text-[32px]">{neighbours.previous.name}</b>
					</span>
					<span class="ml-auto hidden font-mono text-xl lg:inline"
						>{formatPrice(neighbours.previous.price_usd)}</span
					>
				</a>
			{:else}
				<span />
			{/if}
			{#if neighbours.next}
				<a
					href="/criptocurrency/{neighbours.next.id}"
					class="flex min-w-0 flex-col items-end gap-0.5 border-[3px] border-ink bg-primary p-3.5 shadow-brutal-sm transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal lg:flex-row lg:items-center lg:gap-5 lg:px-7 lg:py-6 lg:shadow-[8px_8px_0_#111111]"
				>
					<span class="hidden font-mono text-xl lg:inline"
						>{formatPrice(neighbours.next.price_usd)}</span
					>
					<span class="flex min-w-0 flex-col items-end lg:ml-auto">
						<span class="font-mono text-xs lg:text-sm"
							>Rank #{neighbours.next.rank}<span class="lg:hidden"> →</span></span
						>
						<b class="truncate text-xl font-extrabold lg:text-[32px]">{neighbours.next.name}</b>
					</span>
					<span class="hidden text-[40px] font-extrabold lg:inline" aria-hidden="true">→</span>
				</a>
			{/if}
		</nav>
	</section>
{/if}
