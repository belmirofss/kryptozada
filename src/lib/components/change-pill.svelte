<script>
	import { formatPercent, trendArrow, trendPillClass } from '$lib/utils';

	export let value;
	export let suffix = '';
	export let size = 'text-sm px-2 py-0.5';
</script>

<span
	class="inline-flex items-center gap-1 border-2 border-ink font-mono {trendPillClass(
		value
	)} {size}"
>
	<span aria-hidden="true">{trendArrow(value)}</span>{formatPercent(value)}{suffix}
</span>
