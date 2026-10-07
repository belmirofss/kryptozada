/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Prices are the same for every visitor, so let the CDN serve pages for a minute
	// (and a stale copy while it refreshes) instead of calling CoinLore on every hit.
	if (
		event.request.method === 'GET' &&
		(response.status === 200 || response.status === 301) &&
		!response.headers.has('cache-control')
	) {
		response.headers.set(
			'cache-control',
			'public, max-age=0, s-maxage=60, stale-while-revalidate=600'
		);
	}

	return response;
}
