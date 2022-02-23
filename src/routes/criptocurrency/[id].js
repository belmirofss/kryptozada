import { loadTickerById } from "$lib/api";

export async function get({ params }) {
    const { id } = params;

    try {
        const tickerResponse = await loadTickerById(id);
        const ticker = tickerResponse.data[0];

        if (ticker) {
            return {
                body: {
                    ticker
                }
            };
        }

        return {
            status: 404
        }
    } catch (err) {
        return {
            status: 500
        }
    }
}