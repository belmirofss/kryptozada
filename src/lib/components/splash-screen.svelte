<script context="module">
    export const prerender = true;
</script>

<script>
    import Loading from "./loading.svelte";
</script>

<div class="fixed top-0 left-0 bg-white w-full h-full flex flex-col justify-center items-center z-50">
    <img class="h-24" src="/kryptozada-vert.png" alt="Kryptozada Logo" aria-hidden="true">
    
    <div class="mt-4">
        <Loading />
    </div>
</div>