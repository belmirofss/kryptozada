<script>
	import orderBy from 'lodash/orderBy.js';
	import { searchText } from '$lib/store';
	import {
		formatCompactCurrency,
		formatNumber,
		formatPercent,
		formatPrice,
		isStablecoin,
		trendTextClass
	} from '$lib/utils';
	import ChangePill from './change-pill.svelte';
	import CoinIcon from './coin-icon.svelte';
	import MomentumBars from './momentum-bars.svelte';

	export let allTickers;

	const PAGE_SIZE = 25;

	const tabs = [
		{ id: 'all', label: 'All', test: () => true },
		{ id: 'gainers', label: 'Gainers', test: (t) => +t.percent_change_24h > 0 },
		{ id: 'losers', label: 'Losers', test: (t) => +t.percent_change_24h < 0 },
		{ id: 'stable', label: 'Stablecoins', test: isStablecoin }
	];

	const sorts = [
		{ id: 'market_cap_usd', label: 'Market cap', numeric: true },
		{ id: 'price_usd', label: 'Price', numeric: true },
		{ id: 'percent_change_24h', label: '24h %', numeric: true },
		{ id: 'percent_change_7d', label: '7d %', numeric: true },
		{ id: 'name', label: 'Name', numeric: false }
	];

	let tab = 'all';
	let sortBy = 'market_cap_usd';
	let direction = 'desc';
	let currentPage = 1;
	let listTop;

	const pickSort = (sort) => {
		if (sortBy === sort.id) {
			direction = direction === 'desc' ? 'asc' : 'desc';
		} else {
			sortBy = sort.id;
			direction = sort.numeric ? 'desc' : 'asc';
		}
	};

	$: counts = Object.fromEntries(tabs.map((t) => [t.id, allTickers.filter(t.test).length]));
	$: query = $searchText.trim().toLowerCase();
	$: activeSort = sorts.find((s) => s.id === sortBy);
	$: filtered = orderBy(
		allTickers.filter(
			(t) =>
				tabs.find((x) => x.id === tab).test(t) &&
				(!query || t.name.toLowerCase().includes(query) || t.symbol.toLowerCase().includes(query))
		),
		(t) => (activeSort.numeric ? +t[sortBy] : t[sortBy].toLowerCase()),
		[direction]
	);

	// Any change to the filters sends you back to page 1.
	$: tab, query, sortBy, direction, (currentPage = 1);

	$: pageCount = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
	$: rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
	$: from = filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
	$: to = Math.min(currentPage * PAGE_SIZE, filtered.length);
	$: pages = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, pageCount])]
		.filter((p) => p >= 1 && p <= pageCount)
		.sort((a, b) => a - b)
		.flatMap((p, i, arr) => (i > 0 && p - arr[i - 1] > 1 ? ['…', p] : [p]));

	const goToPage = (p) => {
		currentPage = p;
		if (listTop && listTop.getBoundingClientRect().top < 0) {
			listTop.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const COLUMNS =
		'lg:grid lg:grid-cols-[56px_minmax(0,2.2fr)_repeat(3,minmax(0,1fr))_repeat(3,minmax(0,0.7fr))_96px] lg:gap-4';
</script>

<div class="flex flex-col gap-5 lg:gap-7">
	<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
		<div>
			<h2 class="text-[38px] font-extrabold leading-none tracking-[-0.02em] lg:text-[64px]">
				All markets
			</h2>
			<p class="mt-2.5 text-lg font-medium lg:text-xl">
				The top {formatNumber(allTickers.length)} coins, sorted your way.
			</p>
		</div>
		<div class="w-full lg:w-[380px]">
			<label for="list-search" class="sr-only">Search by name or symbol</label>
			<input
				id="list-search"
				class="brutal-input lg:h-[52px] lg:text-[17px]"
				placeholder="Search by name or symbol"
				autocomplete="off"
				bind:value={$searchText}
			/>
		</div>
	</div>

	<div
		class="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-4"
	>
		<div class="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
			<div class="flex w-max border-[3px] border-ink" role="tablist" aria-label="Filter coins">
				{#each tabs as t}
					<button
						type="button"
						role="tab"
						aria-selected={tab === t.id}
						class="h-11 whitespace-nowrap border-r-[3px] border-ink px-4 text-[15px] font-bold last:border-r-0 lg:px-5 lg:text-base {tab ===
						t.id
							? 'bg-ink text-white'
							: 'bg-white hover:bg-paper'}"
						on:click={() => (tab = t.id)}
					>
						{t.label}
						<span class="ml-1 font-mono text-xs font-normal opacity-70">{counts[t.id]}</span>
					</button>
				{/each}
			</div>
		</div>

		<div
			class="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 font-semibold sm:mx-0 sm:px-0 lg:gap-2.5"
		>
			<span class="shrink-0">Sort by</span>
			{#each sorts as sort}
				<button
					type="button"
					class="h-10 shrink-0 whitespace-nowrap border-2 border-ink px-3.5 text-[15px] font-bold {sortBy ===
					sort.id
						? 'bg-primary'
						: 'bg-white hover:bg-paper'}"
					aria-pressed={sortBy === sort.id}
					on:click={() => pickSort(sort)}
				>
					{sort.label}{#if sortBy === sort.id}
						<span class="ml-1" aria-label={direction === 'desc' ? 'descending' : 'ascending'}
							>{direction === 'desc' ? '▼' : '▲'}</span
						>{/if}
				</button>
			{/each}
		</div>
	</div>

	<div
		bind:this={listTop}
		class="scroll-mt-6 border-[3px] border-ink bg-white shadow-brutal lg:shadow-brutal-lg"
	>
		<div
			class="hidden h-[52px] items-center border-b-[3px] border-ink bg-primary px-5 font-mono text-[13px] font-medium uppercase tracking-[0.06em] {COLUMNS}"
			aria-hidden="true"
		>
			<span>#</span><span>Coin</span><span class="text-right">Price</span><span class="text-right"
				>Market cap</span
			><span class="text-right">Volume 24h</span><span class="text-right">1h</span><span
				class="text-right">24h</span
			><span class="text-right">7d</span><span class="text-right">Momentum</span>
		</div>

		<ul>
			{#each rows as ticker (ticker.id)}
				<li class="border-b-2 border-ink">
					<a
						href="/criptocurrency/{ticker.id}"
						class="flex h-[72px] items-center gap-3 px-3.5 text-[17px] transition hover:bg-[#FFF4E0] focus-visible:bg-[#FFF4E0] focus-visible:outline-none lg:h-[66px] lg:px-5 {COLUMNS}"
					>
						<span class="w-8 shrink-0 font-mono text-[13px] text-muted lg:w-auto lg:text-[17px]"
							>{ticker.rank}</span
						>
						<span class="flex min-w-0 flex-1 items-center gap-3">
							<CoinIcon {ticker} />
							<span class="flex min-w-0 flex-col lg:flex-row lg:items-baseline lg:gap-3">
								<b class="truncate font-extrabold">{ticker.name}</b>
								<span class="font-mono text-xs text-muted lg:text-sm"
									>{ticker.symbol}<span class="lg:hidden">
										· {formatCompactCurrency(ticker.market_cap_usd)}</span
									></span
								>
							</span>
						</span>
						<span class="flex flex-col items-end gap-1 lg:contents">
							<span class="font-mono text-[15px] font-medium lg:text-right lg:text-[17px]"
								>{formatPrice(ticker.price_usd)}</span
							>
							<span class="lg:hidden"
								><ChangePill value={ticker.percent_change_24h} size="px-1.5 text-xs" /></span
							>
						</span>
						<span class="hidden text-right font-mono lg:block"
							>{formatCompactCurrency(ticker.market_cap_usd)}</span
						>
						<span class="hidden text-right font-mono lg:block"
							>{formatCompactCurrency(ticker.volume24)}</span
						>
						<span
							class="hidden text-right font-mono lg:block {trendTextClass(
								ticker.percent_change_1h
							)}">{formatPercent(ticker.percent_change_1h)}</span
						>
						<span
							class="hidden text-right font-mono lg:block {trendTextClass(
								ticker.percent_change_24h
							)}">{formatPercent(ticker.percent_change_24h)}</span
						>
						<span
							class="hidden text-right font-mono lg:block {trendTextClass(
								ticker.percent_change_7d
							)}">{formatPercent(ticker.percent_change_7d)}</span
						>
						<span class="hidden justify-end lg:flex"><MomentumBars {ticker} /></span>
					</a>
				</li>
			{/each}
		</ul>

		{#if !filtered.length}
			<div class="flex flex-col items-center gap-4 px-6 py-12 text-center">
				<p class="text-2xl font-extrabold lg:text-3xl">
					{query ? `No coin matches “${$searchText.trim()}”.` : 'Nothing here right now.'}
				</p>
				<button
					type="button"
					class="border-[3px] border-ink bg-primary px-4 py-2 font-extrabold"
					on:click={() => {
						searchText.set('');
						tab = 'all';
					}}>Show all coins</button
				>
			</div>
		{/if}

		<div
			class="flex flex-col gap-3 px-3.5 py-3 font-semibold sm:flex-row sm:items-center sm:justify-between lg:px-5"
		>
			<span class="font-mono text-sm lg:text-[15px]" aria-live="polite"
				>Showing {from}–{to} of {formatNumber(filtered.length)}</span
			>
			{#if pageCount > 1}
				<nav class="flex flex-wrap gap-1.5 lg:gap-2" aria-label="Pagination">
					<button
						type="button"
						class="h-11 border-2 border-ink bg-white px-3 font-bold disabled:opacity-40"
						disabled={currentPage === 1}
						on:click={() => goToPage(currentPage - 1)}
						aria-label="Previous page">←</button
					>
					{#each pages as p}
						{#if p === '…'}
							<span class="flex h-11 w-6 items-center justify-center">…</span>
						{:else}
							<button
								type="button"
								class="h-11 min-w-[44px] border-2 border-ink px-2 font-bold {p === currentPage
									? 'bg-ink text-white'
									: 'bg-white hover:bg-paper'}"
								aria-current={p === currentPage ? 'page' : undefined}
								on:click={() => goToPage(p)}>{p}</button
							>
						{/if}
					{/each}
					<button
						type="button"
						class="h-11 border-2 border-ink bg-primary px-3 font-bold disabled:opacity-40"
						disabled={currentPage === pageCount}
						on:click={() => goToPage(currentPage + 1)}
						aria-label="Next page">→</button
					>
				</nav>
			{/if}
		</div>
	</div>
</div>
