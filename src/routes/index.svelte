<svelte:head>
	<title>Kryptozada | Welcome</title>
</svelte:head>

<script>
    import CardText from "$lib/components/card-text.svelte";
    import ListTickers from "$lib/components/list-tickers.svelte";
    import MiniCardTicker from "$lib/components/mini-card-ticker.svelte";
    import { splashScreenIsActive } from "$lib/store";
    import { formatCurrency, formatNumber } from "$lib/utils";

    export let globalData;
    export let top10Tickers;
    export let mainTickers;

    splashScreenIsActive.set(false);
</script>

<div class="flex justify-between items-center">
    <h1 class="text-8xl lg:text-6xl md:text-5xl font-black">
        Welcome to <span class="bg-primary text-white">Kryptozada</span>, a place about cryptocurrency's infos
    </h1>

    <img class="h-72 lg:h-60 md:h-52 ml-6" src="/kryptozada-icon.png" alt="Kryptozada Logo" aria-hidden="true">
</div>

<hr class="my-12" />

<h6 class="text-3xl font-black">Top 10 criptocurrencies</h6>
<div class="mt-4 flex flex-row overflow-x-auto pb-6">
    {#each top10Tickers as ticker, index}
        <div class:ml-4={index > 0}>
            <MiniCardTicker ticker={ticker} position={index + 1} />
        </div>
    {/each}
</div>

<hr class="my-12" />

<h6 class="text-3xl font-black">Infos about market</h6>
<div class="mt-4">
    <div class="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4">
        <CardText>
            The total cryptocurrency <span class="font-bold">market capitalization</span> is <span class="bg-primary text-white p-1">{formatCurrency(globalData.total_mcap)}</span>
        </CardText>

        <CardText>
            The total <span class="font-bold">volume in 24</span> hours was <span class="bg-primary text-white p-1">{formatCurrency(globalData.total_volume)}</span>
        </CardText>

        <CardText>
             <span class="bg-primary text-white p-1">{formatNumber(globalData.coins_count)}</span> <span class="font-bold">cryptocurrencies</span> were counted for this infos
        </CardText>
    </div>
        
    <div class="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 mt-4">
        <CardText>
            <span class="font-bold">Bitcoin's</span> dominance is <span class="bg-primary text-white p-1">{globalData.btc_d}%</span>
        </CardText>

        <CardText>
            <span class="font-bold">Ethereum's</span> dominance is <span class="bg-primary text-white p-1">{globalData.btc_d}%</span>
        </CardText>
    </div>
</div>

<hr class="my-12" />

<h6 class="text-3xl font-black">List of main criptocurrencies</h6>
<div class="mt-4 bg-white p-6 rounded-lg drop-shadow-md">
    <ListTickers allTickers={mainTickers} />
</div>