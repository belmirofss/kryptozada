import { loadMainTickers } from '$lib/api';
import { site_url } from '$lib/constants';
import { coinPath } from '$lib/utils';

const url = (path, priority) =>
	`<url><loc>${site_url}${path}</loc><changefreq>hourly</changefreq><priority>${priority}</priority></url>`;

export async function get() {
	try {
		const tickers = await loadMainTickers();
		const urls = [url('/', '1.0'), ...tickers.map((ticker) => url(coinPath(ticker), '0.8'))];

		return {
			headers: {
				'content-type': 'application/xml',
				'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
			},
			body: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
				'\n'
			)}\n</urlset>\n`
		};
	} catch {
		return {
			status: 500
		};
	}
}
