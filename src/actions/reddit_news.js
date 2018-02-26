/**
 * Created by harshalcarpenter on 2/25/18.
 */

import axios from "axios";

const reddit_url = "https://www.reddit.com/r/";
export const NEWS_UPDATE = "fetch_news";
export const CRYPTO = "crypto";
export const BTC_NEWS = "btc_news";
export const ETH_NEWS = "eth_news";
export const CRY_MAR = "cry_mar";

export function getNews(type,limit) {
    let url = reddit_url;
    switch(type){
        case CRYPTO:
            url += "CryptoCurrency/.json?limit="+limit;
            break;
        case BTC_NEWS:
            url += "Bitcoin/.json?limit="+limit;
            break;
        case ETH_NEWS:
            url += "ethereum/.json?limit="+limit;
            break;
        case CRY_MAR:
            url += "CryptoMarkets/.json?limit="+limit;
            break;
        default:
            return {
                type: NEWS_UPDATE,
                data: {}
            };
            break;
    }

    const req = axios.get(`${url}`);

    return {
        type: NEWS_UPDATE,
        payload: req
    }
}