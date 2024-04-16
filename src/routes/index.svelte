<script>
	import CardText from '$lib/components/card-text.svelte';
	import ListTickers from '$lib/components/list-tickers.svelte';
	import MiniCardTicker from '$lib/components/mini-card-ticker.svelte';
	import { splashScreenIsActive } from '$lib/store';
	import { formatCurrency, formatNumber } from '$lib/utils';

	export let globalData;
	export let top10Tickers;
	export let mainTickers;

	splashScreenIsActive.set(false);
</script>

<svelte:head>
	<title>Kryptozada | Welcome</title>
</svelte:head>

<div class="flex flex-col md:flex-row-reverse md:justify-between md:items-center">
	<img
		class="h-44 w-44 mb-4 mx-auto md:items-center md:ml-6 md:mb-0 md:h-52 md:w-52 lg:h-60 lg:w-60 xl:h-72 xl:w-72"
		src="/kryptozada-icon.png"
		alt="Kryptozada Logo"
		aria-hidden="true"
	/>

	<h1 class="text-4xl font-black md:text-5xl lg:text-6xl xl:text-8xl">
		Welcome to <span class="bg-primary text-white">Kryptozada</span>, a place about cryptocurrency
	</h1>
</div>

<hr class="my-12" />

<h6 class="text-3xl font-black">Top 10 criptocurrencies</h6>
<div class="mt-4 flex flex-row overflow-x-auto pb-6">
	{#each top10Tickers as ticker, index}
		<div class:ml-4={index > 0}>
			<MiniCardTicker {ticker} position={index + 1} />
		</div>
	{/each}
</div>

<hr class="my-12" />

<h6 class="text-3xl font-black">Infos about market</h6>
<div class="mt-4">
	<div class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
		<CardText>
			The total cryptocurrency <span class="font-bold">market capitalization</span> is
			<span class="bg-primary text-white p-1">{formatCurrency(globalData.total_mcap)}</span>
		</CardText>

		<CardText>
			The total <span class="font-bold">volume in 24</span> hours was
			<span class="bg-primary text-white p-1">{formatCurrency(globalData.total_volume)}</span>
		</CardText>

		<CardText>
			<span class="bg-primary text-white p-1">{formatNumber(globalData.coins_count)}</span>
			<span class="font-bold">cryptocurrencies</span> were counted for this infos
		</CardText>
	</div>

	<div class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0 mt-4">
		<CardText>
			<span class="font-bold">Bitcoin's</span> dominance is
			<span class="bg-primary text-white p-1">{globalData.btc_d}%</span>
		</CardText>

		<CardText>
			<span class="font-bold">Ethereum's</span> dominance is
			<span class="bg-primary text-white p-1">{globalData.eth_d}%</span>
		</CardText>
	</div>
</div>

<hr class="my-12" />

<h6 class="text-3xl font-black">List of main criptocurrencies</h6>
<div class="mt-4 bg-white p-6 rounded-lg drop-shadow-md">
	<ListTickers allTickers={mainTickers} />
</div>
