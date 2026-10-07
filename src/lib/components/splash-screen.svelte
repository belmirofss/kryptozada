<script>
	import { fade } from 'svelte/transition';
	import Logo from './logo.svelte';
</script>

<div
	class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-primary"
	role="status"
	aria-live="polite"
	transition:fade={{ duration: 120 }}
>
	<span
		class="coin flex h-28 w-28 items-center justify-center rounded-full border-4 border-ink bg-white text-6xl font-extrabold shadow-brutal-lg sm:h-32 sm:w-32 sm:text-7xl"
		aria-hidden="true">K</span
	>
	<span class="sr-only">Loading</span>
	<span aria-hidden="true" class="hidden sm:block"><Logo /></span>
	<span aria-hidden="true" class="text-3xl font-extrabold tracking-[0.04em] sm:hidden"
		>KRYPTOZADA</span
	>
	<div class="flex w-56 flex-col gap-2.5" aria-hidden="true">
		<div class="grid h-6 grid-cols-10 gap-1 border-[3px] border-ink bg-white p-[3px]">
			{#each Array(10) as _, i}
				<span class="segment bg-ink" style="animation-delay: {i * 90}ms" />
			{/each}
		</div>
		<span class="text-center font-mono text-sm">Counting the market…</span>
	</div>
</div>

<style>
	.segment {
		opacity: 0;
		animation: fill 1.2s steps(1) infinite;
	}

	@keyframes fill {
		0% {
			opacity: 0;
		}
		10%,
		90% {
			opacity: 1;
		}
	}

	.coin {
		animation: bob 1s ease-in-out infinite alternate;
	}

	@keyframes bob {
		to {
			transform: translate(-4px, -6px);
			box-shadow: 14px 14px 0 #111111;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.coin,
		.segment {
			animation: none;
			opacity: 1;
		}
	}
</style>
