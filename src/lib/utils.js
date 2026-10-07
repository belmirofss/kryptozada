const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/** Readable coin page URL, e.g. /cryptocurrency/bitcoin. */
export const coinPath = (ticker) => `/cryptocurrency/${encodeURIComponent(ticker.nameid)}`;

export const formatCurrency = (value) => usd.format(value);

/** Prices: keep cents for normal values, significant digits for tiny ones ($0.00001234). */
export const formatPrice = (value) => {
	const n = +value;
	if (!Number.isFinite(n)) return '—';
	if (n !== 0 && Math.abs(n) < 1) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumSignificantDigits: 4
		}).format(n);
	}
	return usd.format(n);
};

/** Big money values as $1.95T, $462.8B, $980.4M. */
export const formatCompactCurrency = (value) => {
	const n = +value;
	if (!Number.isFinite(n)) return '—';
	const abs = Math.abs(n);
	if (abs >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
	if (abs >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
	if (abs >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
	return formatPrice(n);
};

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

export const formatCompactNumber = (value) =>
	new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

/** Signed percentage using a real minus sign: +2.18%, −0.15%. */
export const formatPercent = (value) => {
	const n = +value;
	if (!Number.isFinite(n)) return '—';
	const abs = Math.abs(n).toFixed(2);
	const sign = +abs === 0 ? '' : n > 0 ? '+' : '−';
	return `${sign}${abs}%`;
};

/** 'up' | 'down' | 'flat' — tiny moves count as flat so stablecoins don't flicker. */
export const trend = (value) => {
	const n = +value;
	if (n > 0.005) return 'up';
	if (n < -0.005) return 'down';
	return 'flat';
};

export const trendArrow = (value) => ({ up: '▲', down: '▼', flat: '■' }[trend(value)]);

export const trendTextClass = (value) =>
	({ up: 'text-up', down: 'text-down', flat: 'text-muted' }[trend(value)]);

export const trendPillClass = (value) =>
	({
		up: 'bg-up-soft text-up',
		down: 'bg-down-soft text-down',
		flat: 'bg-neutral-200 text-ink'
	}[trend(value)]);

/** "up 1.06%", "down 0.15%", "flat" — used to build plain-language sentences. */
export const describeChange = (value) => {
	const t = trend(value);
	if (t === 'flat') return 'flat';
	return `${t} ${Math.abs(+value).toFixed(2)}%`;
};

const STABLECOINS = new Set([
	'USDT',
	'USDC',
	'DAI',
	'BUSD',
	'TUSD',
	'USDP',
	'USDD',
	'FDUSD',
	'PYUSD',
	'USDE',
	'USDS',
	'FRAX',
	'GUSD',
	'LUSD',
	'EURS',
	'EURC'
]);

export const isStablecoin = (ticker) => STABLECOINS.has(String(ticker.symbol).toUpperCase());
