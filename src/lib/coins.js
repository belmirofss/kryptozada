import { loadMainTickers } from './api';

// CoinLore only looks coins up by numeric id, so readable URLs need a slug -> id map.
// Slugs rarely change: refresh every 10 minutes, or after a minute on an unknown slug
// in case a coin just entered the top 1,000.
const MAX_AGE = 10 * 60 * 1000;
const MISS_RETRY_AFTER = 60 * 1000;

let ids = new Map();
let loadedAt = 0;
let pending = null;

const refresh = () => {
	if (!pending) {
		pending = loadMainTickers()
			.then((tickers) => {
				const next = new Map();
				for (const ticker of tickers) {
					if (!next.has(ticker.nameid)) next.set(ticker.nameid, ticker.id);
				}
				ids = next;
				loadedAt = Date.now();
			})
			.finally(() => {
				pending = null;
			});
	}
	return pending;
};

export const findCoinId = async (slug) => {
	const age = Date.now() - loadedAt;
	if (age > MAX_AGE || (!ids.has(slug) && age > MISS_RETRY_AFTER)) {
		try {
			await refresh();
		} catch (error) {
			// A stale map beats an error page.
			if (!ids.size) throw error;
		}
	}
	return ids.get(slug) || null;
};
