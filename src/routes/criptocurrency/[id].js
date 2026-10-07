import { loadTickerById } from '$lib/api';
import { coinPath } from '$lib/utils';

// Old numeric URLs (/criptocurrency/90) move permanently to /cryptocurrency/bitcoin.
export async function get({ params }) {
	try {
		const tickerResponse = await loadTickerById(params.id);
		const ticker = tickerResponse.data[0];

		if (!ticker) {
			return {
				status: 404
			};
		}

		return {
			status: 301,
			headers: {
				location: coinPath(ticker)
			}
		};
	} catch {
		return {
			status: 500
		};
	}
}
