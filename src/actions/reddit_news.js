/**
 * Created by harshalcarpenter on 2/25/18.
 */

import axios from "axios";

const reddit_url = "https://www.reddit.com/r/";
export const NEWS_UPDATE = "fetch_news";
export const CRYPTO = "CryptoCurrency";
export const BTC_NEWS = "Bitcoin";
export const ETH_NEWS = "Ethereum";
export const CRY_MAR = "CryptoMarkets";

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
    const req = axios.get(url);
    return {
        type: type,
        payload: req
    }
}