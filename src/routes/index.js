import { loadGlobalCryptoData, loadMainTickers, loadTop10Tickers } from '$lib/api';

export async function get() {
    try {
        const [globalDataResponse, top10TickersResponse, mainTickers] = await Promise.all([
            loadGlobalCryptoData(),
            loadTop10Tickers(),
            loadMainTickers()
        ]);

        return {
            body: {
                globalData: globalDataResponse.data[0],
                top10Tickers: top10TickersResponse.data.data,
                mainTickers
            }
        }
    } catch  {
        return {
            status: 500
        }
    }

};