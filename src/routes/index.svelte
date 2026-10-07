<script>
	import DominanceCard from '$lib/components/dominance-card.svelte';
	import ListTickers from '$lib/components/list-tickers.svelte';
	import Seo from '$lib/components/seo.svelte';
	import TickerTape from '$lib/components/ticker-tape.svelte';
	import TopCard from '$lib/components/top-card.svelte';
	import { site_name, site_url } from '$lib/constants';
	import { describeChange, formatCompactCurrency, formatNumber, trend } from '$lib/utils';

	export let globalData;
	export let mainTickers;

	$: top10Tickers = mainTickers.slice(0, 10);
	$: change = +globalData.mcap_change;
	$: marketTrend = trend(change);
</script>

<Seo
	title="Crypto prices today: top {formatNumber(
		mainTickers.length
	)} coins by market cap | Kryptozada"
	description="Live prices, market caps and 24h moves for the top {formatNumber(
		mainTickers.length
	)} cryptocurrencies. The crypto market is worth {formatCompactCurrency(
		globalData.total_mcap
	)} today, {describeChange(globalData.mcap_change)} in 24 hours."
	jsonLd={[
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: site_name,
			url: `${site_url}/`
		}
	]}
/>

<TickerTape tickers={top10Tickers} />

<section
	class="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pb-10 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-14 lg:pb-[88px] lg:pt-20"
>
	<div class="flex flex-col gap-5 lg:gap-7">
		<span class="font-mono text-xs uppercase tracking-[0.08em] lg:text-[15px]"
			>Market brief · last 24 hours</span
		>
		<h1
			class="text-[54px] font-extrabold leading-[0.95] tracking-[-0.02em] sm:text-7xl xl:text-8xl"
		>
			Crypto is
			{#if marketTrend === 'flat'}
				<span class="mark">flat</span>
			{:else}
				<span class={marketTrend === 'up' ? 'mark' : 'mark-down'}
					>{marketTrend} {Math.abs(change).toFixed(2)}%</span
				>
			{/if}
			today.
		</h1>
		<p
			class="max-w-[760px] text-[19px] font-medium leading-normal lg:text-[28px] lg:leading-[1.45]"
		>
			All coins together are worth
			<span class="mark">{formatCompactCurrency(globalData.total_mcap)}</span>. Traders moved
			<span class="mark">{formatCompactCurrency(globalData.total_volume)}</span>
			in the last 24 hours across
			<span class="mark">{formatNumber(globalData.coins_count)}</span> coins.
		</p>
		<div class="mt-2 hidden flex-wrap gap-4 sm:flex">
			<a
				href="#markets"
				class="inline-flex h-14 items-center bg-ink px-7 text-lg font-bold text-white shadow-brutal-primary transition hover:-translate-x-0.5 hover:-translate-y-0.5"
				>Explore all markets ↓</a
			>
			<a
				href="#top10"
				class="inline-flex h-14 items-center border-[3px] border-ink px-7 text-lg font-bold transition hover:bg-paper"
				>See the top 10</a
			>
		</div>
	</div>

	<DominanceCard btc={+globalData.btc_d} eth={+globalData.eth_d} />
</section>

<section id="top10" class="scroll-mt-0 border-t-[3px] border-ink bg-paper">
	<div
		class="mx-auto flex max-w-[1440px] flex-col gap-5 py-8 lg:gap-9 lg:px-14 lg:pb-[88px] lg:pt-[72px]"
	>
		<div class="flex items-end justify-between px-4 sm:px-8 lg:px-0">
			<div>
				<h2 class="text-[38px] font-extrabold leading-none tracking-[-0.02em] lg:text-[64px]">
					The top 10
				</h2>
				<p class="mt-2.5 hidden text-xl font-medium lg:block">
					Ranked by market cap. Pick one to dig in.
				</p>
			</div>
			<a
				href="#markets"
				class="hidden text-lg font-bold underline-offset-4 hover:underline lg:inline"
				>See all {formatNumber(mainTickers.length)} →</a
			>
			<span class="font-mono text-xs lg:hidden" aria-hidden="true">swipe →</span>
		</div>
		<ol
			class="no-scrollbar flex snap-x gap-3.5 overflow-x-auto px-4 pb-3 pt-1 sm:px-8 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:p-0"
		>
			{#each top10Tickers as ticker, index (ticker.id)}
				<li class="w-[176px] shrink-0 snap-start lg:w-auto">
					<TopCard {ticker} position={index + 1} />
				</li>
			{/each}
		</ol>
	</div>
</section>

<section id="markets" class="scroll-mt-0 border-t-[3px] border-ink">
	<div class="mx-auto max-w-[1440px] px-4 pb-10 pt-8 sm:px-8 lg:px-14 lg:pb-24 lg:pt-[72px]">
		<ListTickers allTickers={mainTickers} />
	</div>
</section>
