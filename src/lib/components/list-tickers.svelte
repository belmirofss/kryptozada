<script>
    import { coinlore_img } from "$lib/constants";
    import { formatCurrency, formatNumber } from "$lib/utils";
    import { onMount } from "svelte";
    import orderBy from 'lodash/orderBy.js'
    import ListTickersToolbar from "./list-tickers-toolbar.svelte";
    import { splashScreenIsActive } from "$lib/store";
    import { goto } from "$app/navigation";

    export let allTickers;

    let tickers = [];

    const onSearchOrOrder = (event) => {
        tickers = orderBy(
            allTickers.filter(ticker => ticker.name.toLowerCase().includes(event.detail.searchText.toLowerCase())),
            ticker => {
                switch(event.detail.orderedBy) {
                    case 'rank':
                    case 'price_usd':
                    case 'market_cap_usd':
                    case 'percent_change_1h':
                    case 'percent_change_24h':
                    case 'percent_change_7d':  
                        return +ticker[event.detail.orderedBy];
                    default:
                        return ticker[event.detail.orderedBy];  
                }
            },
            [event.detail.orderedType]
        );
    };


    const openTicker = (id) => {
        splashScreenIsActive.set(true);
        goto(`/criptocurrency/${id}`)
    };

    onMount(() => {
        tickers = allTickers;
    });
</script>

<div class="mb-4">
    <ListTickersToolbar on:searchOrOrderEvent={onSearchOrOrder} />
</div>

<div class="max-h-96 overflow-y-auto">
    <table class="table-auto w-full">
        <thead>
            <tr class="h-16">
                <th class="sticky top-0 z-10 bg-white text-center">
                    #
                </th>
                <th class="sticky top-0 z-10 bg-white text-left">
                    Name
                </th>
                <th class="sticky top-0 z-10 bg-white text-right">
                    Price
                </th>
                <th class="sticky top-0 z-10 bg-white text-right">
                    Market cap
                </th>
                <th class="sticky top-0 z-10 bg-white text-right">
                    1h %
                </th>
                <th class="sticky top-0 z-10 bg-white text-right">
                    24h %
                </th>
                <th class="sticky top-0 z-10 bg-white text-right">
                    7d %
                </th>
            </tr>
        </thead>
        <tbody>
            {#each tickers as ticker, index}
                <tr class="h-16 hover:bg-gray-50 cursor-pointer" on:click={openTicker(ticker.id)} role="button">
                    <td class="text-center font-bold text-gray-400">
                        {index + 1}
                    </td>
                    <td>
                        <img class="h-8 mr-2 inline" src="{coinlore_img}/{ticker.nameid}.png" alt="{ticker.name} Logo" aria-hidden="true">
                        <span class="font-black">
                            {ticker.name} <span class="font-bold text-gray-400">${ticker.symbol}</span>
                        </span>
                    </td>
                    <td class="font-bold text-right">
                        {formatCurrency(ticker.price_usd)}
                    </td>
                    <td class="font-medium text-right">
                        {formatCurrency(ticker.market_cap_usd)}
                    </td>
                    <td class="font-medium text-right" class:text-red-600={ticker.percent_change_1h < 0} class:text-green-700={ticker.percent_change_1h > 0}>
                        {formatNumber(ticker.percent_change_1h)}%
                    </td>
                    <td class="font-medium text-right" class:text-red-600={ticker.percent_change_24h < 0} class:text-green-700={ticker.percent_change_24h > 0}>
                        {formatNumber(ticker.percent_change_24h)}%
                    </td>
                    <td class="font-medium text-right" class:text-red-600={ticker.percent_change_7d < 0} class:text-green-700={ticker.percent_change_7d > 0}>
                        {formatNumber(ticker.percent_change_7d)}%
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

{#if tickers.length}
    <p class="mt-2 text-right text-sm font-gray-400 font-medium">Listing {tickers.length} of {allTickers.length}</p>
{/if}

{#if !tickers.length}
	<p class="text-center text-md font-gray-400 font-medium">Nothing was found.</p>
{/if}