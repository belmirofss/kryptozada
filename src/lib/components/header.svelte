<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchText } from '$lib/store';
	import Logo from './logo.svelte';

	const links = [
		{ href: '/#top10', label: 'Top 10' },
		{ href: '/#markets', label: 'Markets' },
		{ href: '/#dominance', label: 'Dominance' }
	];

	let menuOpen = false;
	let searchOpen = false;
	let desktopInput;
	let mobileInput;

	const showMarkets = async () => {
		menuOpen = false;
		if ($page.url.pathname !== '/') {
			await goto('/#markets');
		} else {
			document.getElementById('markets')?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const toggleSearch = async () => {
		searchOpen = !searchOpen;
		menuOpen = false;
		if (searchOpen) {
			await Promise.resolve();
			mobileInput?.focus();
		}
	};

	const onKeydown = (event) => {
		const target = event.target;
		const typing =
			target instanceof HTMLElement &&
			(target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
		if (event.key === '/' && !typing) {
			event.preventDefault();
			if (desktopInput?.offsetParent) desktopInput.focus();
			else toggleSearch();
		}
	};
</script>

<svelte:window on:keydown={onKeydown} />

<header class="relative z-40 border-b-[3px] border-ink bg-white">
	<div
		class="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:h-20 lg:px-14"
	>
		<a href="/" aria-label="Kryptozada home" class="shrink-0">
			<Logo />
		</a>

		<nav class="hidden items-center gap-9 text-[17px] font-semibold lg:flex" aria-label="Main">
			{#each links as link}
				<a href={link.href} class="underline-offset-4 hover:underline">{link.label}</a>
			{/each}
		</nav>

		<form
			class="relative hidden w-[340px] lg:block"
			role="search"
			on:submit|preventDefault={showMarkets}
		>
			<label for="header-search" class="sr-only">Search coins</label>
			<input
				id="header-search"
				class="brutal-input pr-12"
				placeholder="Search 1,000 coins"
				autocomplete="off"
				bind:this={desktopInput}
				bind:value={$searchText}
			/>
			<kbd
				class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border-2 border-ink px-1.5 font-mono text-xs"
				>/</kbd
			>
		</form>

		<div class="flex gap-2 lg:hidden">
			<button
				type="button"
				class="flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-white"
				aria-label="Search"
				aria-expanded={searchOpen}
				on:click={toggleSearch}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg
				>
			</button>
			<button
				type="button"
				class="flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-primary"
				aria-label="Menu"
				aria-expanded={menuOpen}
				on:click={() => {
					menuOpen = !menuOpen;
					searchOpen = false;
				}}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					aria-hidden="true"
				>
					{#if menuOpen}
						<path d="M6 6l12 12M18 6L6 18" />
					{:else}
						<path d="M4 7h16M4 12h16M4 17h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if searchOpen}
		<form
			class="border-t-[3px] border-ink bg-paper p-4 lg:hidden"
			role="search"
			on:submit|preventDefault={() => {
				searchOpen = false;
				showMarkets();
			}}
		>
			<label for="mobile-search" class="sr-only">Search coins</label>
			<input
				id="mobile-search"
				class="brutal-input"
				placeholder="Search by name or symbol"
				autocomplete="off"
				bind:this={mobileInput}
				bind:value={$searchText}
			/>
		</form>
	{/if}

	{#if menuOpen}
		<nav class="border-t-[3px] border-ink bg-primary lg:hidden" aria-label="Main">
			{#each links as link}
				<a
					href={link.href}
					class="block border-b-[3px] border-ink px-4 py-4 text-2xl font-extrabold last:border-b-0"
					on:click={() => (menuOpen = false)}>{link.label}</a
				>
			{/each}
		</nav>
	{/if}
</header>
