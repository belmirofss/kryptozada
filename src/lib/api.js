import axios from 'axios';
import { api_url } from './constants';

const api = axios.create({
    baseURL: api_url
});

export const loadGlobalCryptoData = () => api.get('global');
export const loadTickers = (start = 0) => api.get('tickers', {
    params: {
        start,
        limit: 100
    }
});
export const loadMainTickers = () => new Promise(async (resolve, reject) => {
    try {
        const [
            top100Response,
            top200Response,
            top300Response,
            top400Response,
            top500Response,
            top600Response,
            top700Response,
            top800Response,
            top900Response,
            top1000Response
        ] = await Promise.all([
            loadTickers(0),
            loadTickers(100),
            loadTickers(200),
            loadTickers(300),
            loadTickers(400),
            loadTickers(500),
            loadTickers(600),
            loadTickers(700),
            loadTickers(800),
            loadTickers(900),
            loadTickers(1000)
        ]);

        const top100 = top100Response.data.data;
        const top200 = top200Response.data.data;
        const top300 = top300Response.data.data;
        const top400 = top400Response.data.data;
        const top500 = top500Response.data.data;
        const top600 = top600Response.data.data;
        const top700 = top700Response.data.data;
        const top800 = top800Response.data.data;
        const top900 = top900Response.data.data;
        const top1000 = top1000Response.data.data;

        resolve(top100.concat(
            top200,
            top300,
            top400,
            top500,
            top600,
            top700,
            top800,
            top900,
            top1000
        ));
    } catch (err) {
        reject (err);
    }
});
export const loadTop10Tickers = () => api.get('tickers', {
    params: {
        limit: 10
    }
});
export const loadTickerById = (id) => api.get('ticker', {
    params: {
        id
    }
});