import axios from 'axios';
import pick from 'lodash/pick.js';
import { api_url } from './constants';

const api = axios.create({
	baseURL: api_url
});

const PAGE_SIZE = 100;
const MAIN_TICKERS_COUNT = 1000;

// The home page ships all 1,000 tickers in its HTML, so keep only the fields the lists use.
const LIST_FIELDS = [
	'id',
	'symbol',
	'name',
	'nameid',
	'rank',
	'price_usd',
	'percent_change_1h',
	'percent_change_24h',
	'percent_change_7d',
	'market_cap_usd',
	'volume24'
];

export const loadGlobalCryptoData = () => api.get('global/');

export const loadTickers = (start = 0, limit = PAGE_SIZE) =>
	api.get('tickers/', {
		params: {
			start,
			limit
		}
	});

export const loadMainTickers = async () => {
	const pages = await Promise.all(
		Array.from({ length: MAIN_TICKERS_COUNT / PAGE_SIZE }, (_, i) => loadTickers(i * PAGE_SIZE))
	);

	return pages.flatMap((response) => response.data.data).map((ticker) => pick(ticker, LIST_FIELDS));
};

export const loadTickerById = (id) =>
	api.get('ticker/', {
		params: {
			id
		}
	});

export const loadMarketsById = (id) =>
	api.get('coin/markets/', {
		params: {
			id
		}
	});
