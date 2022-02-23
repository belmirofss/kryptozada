<script>
    import { goto } from "$app/navigation";
    import { coinlore_img } from "$lib/constants";
    import { splashScreenIsActive } from "$lib/store";

    export let ticker;
    export let position;

    const openTicker = () => {
        splashScreenIsActive.set(true);
        goto(`/criptocurrency/${ticker.id}`)
    };
</script>

<button on:click={openTicker} class="bg-white rounded-lg drop-shadow-md p-6 h-48 w-48 relative hover:scale-105 transition duration-150">
    <span class="text-sm absolute right-6 top-6 font-medium text-gray-400">#{position}</span>
    <div class="flex items-center justify-center flex-col">
        <img class="h-12 mx-auto mt-1" src="{coinlore_img}/{ticker.nameid}.png" alt="{ticker.name} Logo" aria-hidden="true">
        <span class="mx-auto mt-1 text-lg font-black">{ticker.name}</span>
        <span class="mx-auto text-md font-bold text-gray-400">${ticker.symbol}</span>
    </div>
</button>
