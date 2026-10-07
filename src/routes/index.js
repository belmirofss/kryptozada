import { loadGlobalCryptoData, loadMainTickers } from '$lib/api';

export async function get() {
	try {
		const [globalDataResponse, mainTickers] = await Promise.all([
			loadGlobalCryptoData(),
			loadMainTickers()
		]);

		return {
			body: {
				globalData: globalDataResponse.data[0],
				mainTickers
			}
		};
	} catch {
		return {
			status: 500
		};
	}
}
