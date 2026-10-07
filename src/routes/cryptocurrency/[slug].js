import { loadMarketsById, loadTickerById, loadTickers, MAIN_TICKERS_COUNT } from '$lib/api';
import { findCoinId } from '$lib/coins';
import { coinPath } from '$lib/utils';

const TOP_MARKETS = 5;

// Extras are nice to have: if they fail, the page still renders with the ticker.
const loadMarkets = async (id) => {
	try {
		const { data } = await loadMarketsById(id);
		const markets = Array.isArray(data) ? data : [];
		return {
			total: markets.length,
			top: [...markets].sort((a, b) => +b.volume_usd - +a.volume_usd).slice(0, TOP_MARKETS)
		};
	} catch {
		return { total: 0, top: [] };
	}
};

const loadNeighbours = async (rank) => {
	try {
		const start = Math.max(rank - 2, 0);
		const { data } = await loadTickers(start, rank > 1 ? 3 : 2);
		const list = data.data || [];
		return {
			previous: list.find((t) => +t.rank === rank - 1) || null,
			// Only the top 1,000 have pages, so the last one has no "next".
			next: (rank < MAIN_TICKERS_COUNT && list.find((t) => +t.rank === rank + 1)) || null
		};
	} catch {
		return { previous: null, next: null };
	}
};

export async function get({ params }) {
	const { slug } = params;

	try {
		const id = await findCoinId(slug.toLowerCase());

		if (!id) {
			return {
				status: 404
			};
		}

		const tickerResponse = await loadTickerById(id);
		const ticker = tickerResponse.data[0];

		if (!ticker) {
			return {
				status: 404
			};
		}

		// One URL per coin: send other spellings (case, renamed coins) to the canonical one.
		if (ticker.nameid !== slug) {
			return {
				status: 301,
				headers: {
					location: coinPath(ticker)
				}
			};
		}

		const [markets, neighbours] = await Promise.all([
			loadMarkets(id),
			loadNeighbours(+ticker.rank)
		]);

		return {
			body: {
				ticker,
				markets,
				neighbours
			}
		};
	} catch {
		return {
			status: 500
		};
	}
}
