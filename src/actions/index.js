import axios from "axios";

export const FETCH_BTC = "fetch_btc";
export const FETCH_ETH = "fetch_eth";
export const SIGN_UP = "sign_up";

const root_url = "https://api.gemini.com/v1/pubticker/";
const ct_url = "https://cryptonthus.herokuapp.com/api";

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

export function signUp(data){
    const req = axios.post(`${ct_url}/signup`,data);

    return {
        type: SIGN_UP,
        payload: req
    }
}