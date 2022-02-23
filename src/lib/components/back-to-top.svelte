<script>
    import { Icon, ArrowUp } from "svelte-hero-icons";

    const showOnPx = 150;
    let hidden = true;
  
    const goTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
  
    const scrollContainer = () => {
        return document.documentElement || document.body;
    }
  
    const handleOnScroll = () => {
        if (!scrollContainer()) {
            return;
        }
  
        if (scrollContainer().scrollTop > showOnPx) {
            hidden = false;
        } else {
            hidden = true;
        }
    }
</script>
  
<svelte:window on:scroll={handleOnScroll} />
  
<button class="opacity-100 transition duration-150 fixed z-50 right-10 bottom-10 bg-primary select-none p-3 rounded-full drop-shadow-md" class:invisible={hidden} class:opacity-0={hidden} on:click={goTop} aria-hidden="true">
    <Icon class="text-white" src="{ArrowUp}" size="24" />
</button>