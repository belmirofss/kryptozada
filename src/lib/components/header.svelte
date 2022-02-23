<script context="module">
    export const prerender = true;
</script>

<script>
    import { goto } from '$app/navigation';
    import { splashScreenIsActive } from '$lib/store';

    const goToIndex = () => {
        splashScreenIsActive.set(true);
        goto('/');
    };
</script>

<header class="py-4 flex items-center justify-center">
    <button aria-label="Back to start" on:click={goToIndex}>
        <img class="h-6 transition duration-150 grayscale hover:grayscale-0" src="/kryptozada-hor.png" alt="Kryptozada Logo">
    </button>
</header>