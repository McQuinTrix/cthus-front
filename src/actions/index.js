import axios from "axios";

export const FETCH_BTC = "fetch_btc";
export const FETCH_ETH = "fetch_eth";

const root_url = "https://api.gemini.com/v1/pubticker/";

export function fetchBTC() {
    const req = axios.get(`${root_url}/btcusd`);

    return {
        type: FETCH_BTC,
        payload: req
    }
}

export function fetchETH() {
    const req = axios.get(`${root_url}/ethusd`);

    return {
        type: FETCH_ETH,
        payload: req
    }
}