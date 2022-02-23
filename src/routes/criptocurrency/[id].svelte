<script>
    import { coinlore_img } from "$lib/constants";
    import { splashScreenIsActive } from "$lib/store";
import { formatCurrency, formatNumber } from "$lib/utils";

    export let ticker;

    splashScreenIsActive.set(false);
</script>

<svelte:head>
    <title>Kryptozada | {ticker.name}</title>
</svelte:head>

<img class="h-32 mx-auto mt-1" src="{coinlore_img}/{ticker.nameid}.png" alt="{ticker.name} Logo" aria-hidden="true">
<h1 class="text-4xl font-black mt-4 text-center">
    {ticker.name} 
</h1>
<h2 class="text-2xl font-bold text-center text-gray-400">
    ${ticker.symbol}
</h2>

<div class="mt-4 flex md:flex-row justify-between sm:flex-col">
    <div class="bg-white rounded-lg drop-shadow-md w-full mr-4">
        <table class="table-auto w-full mr-4">
            <tbody>
                <tr class="h-16">
                    <td class="p-6 font-bold">
                        Name
                    </td>
                    <td class="p-6 font-bold text-right">
                        {ticker.name}
                    </td>
                </tr>
                <tr class="h-16 bg-gray-50">
                    <td class="p-6 font-bold">
                        Symbol
                    </td>
                    <td class="p-6 font-bold text-right">
                        ${ticker.symbol}
                    </td>
                </tr>
    
                <tr class="h-16">
                    <td class="p-6 font-bold">
                        Price
                    </td>
                    <td class="p-6 font-bold text-right">
                        {formatCurrency(ticker.price_usd)}
                    </td>
                </tr>
    
                <tr class="h-16 bg-gray-50">
                    <td class="p-6 font-bold">
                        Price in $BTC
                    </td>
                    <td class="p-6 font-bold text-right">
                        {formatCurrency(ticker.price_btc)}
                    </td>
                </tr>
            </tbody>
        </table>    
    </div>

    <div class="bg-white rounded-lg drop-shadow-md w-full lg:mt-0 sm:mt-4">
        <table class="table-auto w-full">
            <tbody>
                <tr class="h-16 bg-gray-50">
                    <td class="p-6 font-bold">
                        Market cap
                    </td>
                    <td class="p-6 font-bold text-right">
                        {formatCurrency(ticker.market_cap_usd)}
                    </td>
                </tr>
                <tr class="h-16">
                    <td class="p-6 font-bold">
                        1h %
                    </td>
                    <td class="p-6 font-bold text-right" class:text-red-600={ticker.percent_change_1h < 0} class:text-green-700={ticker.percent_change_1h > 0}>
                        {formatNumber(ticker.percent_change_1h)}%
                    </td>
                </tr>
    
                <tr class="h-16 bg-gray-50">
                    <td class="p-6 font-bold">
                        24h %
                    </td>
                    <td class="p-6 font-bold text-right" class:text-red-600={ticker.percent_change_24h < 0} class:text-green-700={ticker.percent_change_24h > 0}>
                        {formatNumber(ticker.percent_change_24h)}%
                    </td>
                </tr>
    
                <tr class="h-16">
                    <td class="p-6 font-bold">
                        7d %
                    </td>
                    <td class="p-6 font-bold text-right" class:text-red-600={ticker.percent_change_7d < 0} class:text-green-700={ticker.percent_change_7d > 0}>
                        {formatNumber(ticker.percent_change_7d)}%
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>