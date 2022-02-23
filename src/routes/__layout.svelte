<script>
    import BackToTop from "$lib/components/back-to-top.svelte";
    import Footer from "$lib/components/footer.svelte";
    import Header from "$lib/components/header.svelte";
    import SplashScreen from "$lib/components/splash-screen.svelte";
    import { splashScreenIsActive } from "$lib/store";
    import "../app.css";

    let splashScreenIsActiveValue = true;
    splashScreenIsActive.subscribe(value => splashScreenIsActiveValue = value);
</script>

{#if splashScreenIsActiveValue}
    <SplashScreen />  
{/if}

<div class="bg-gray-50 flex flex-col min-h-screen min-w-screen">
    <Header />
    
    <main class="container mx-auto my-12 flex-1">
        <slot />
    </main>

    <Footer />
</div>

<BackToTop />

