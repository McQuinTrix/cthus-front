/**
 * Created by harshalcarpenter on 2/25/18.
 */
import {NEWS_UPDATE,CRYPTO,BTC_NEWS,ETH_NEWS,CRY_MAR } from '../actions/reddit_news';

export default function (state={},action) {
    let obj = {};
    switch(action.type){
        case CRYPTO:
            if(action.payload.status === 200){
                action.payload.data.data["classType"] = "crypto";
                obj[NEWS_UPDATE] = {type: action.type, data:action.payload.data};
                return Object.assign({}, state, obj);
            }
            break;
        case BTC_NEWS:
            if(action.payload.status === 200){
                action.payload.data.data["classType"] = "bitcoin";
                obj[NEWS_UPDATE] = {type: action.type, data:action.payload.data};
                return Object.assign({}, state, obj);
            }
            break;
        case ETH_NEWS:
            if(action.payload.status === 200){
                action.payload.data.data["classType"]  = "ethereum";
                obj[NEWS_UPDATE] = {type: action.type, data:action.payload.data};
                return Object.assign({}, state, obj);
            }
            break;
        case CRY_MAR:
            if(action.payload.status === 200){
                debugger;
                action.payload.data.data["classType"]  = "cryptomarkets";
                obj[NEWS_UPDATE] = {type: action.type, data:action.payload.data};
                return Object.assign({}, state, obj);
            }
            break;
        default:
            return state;
    }
    return state;
}