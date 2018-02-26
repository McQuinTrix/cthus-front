/**
 * Created by harshalcarpenter on 2/25/18.
 */
import {NEWS_UPDATE,CRYPTO,BTC_NEWS,ETH_NEWS,CRY_MAR } from '../actions/reddit_news';

export default function (state={},action) {
    switch(action.type){
        case CRYPTO:

            if(action.payload.status === 200){
                let obj = {};
                obj[NEWS_UPDATE] = {type: action.type, data:action.payload.data};
                return Object.assign({}, state, obj);
            }
            break;
        case BTC_NEWS:

            if(action.payload.status === 200){
                let obj = {};
                obj[NEWS_UPDATE] = {type: action.type, data:action.payload.data};
                return Object.assign({}, state, obj);
            }
            break;
        case ETH_NEWS:

            if(action.payload.status === 200){
                let obj = {};
                obj[NEWS_UPDATE] = {type: action.type, data:action.payload.data};
                return Object.assign({}, state, obj);
            }
            break;
        case CRY_MAR:

            if(action.payload.status === 200){
                let obj = {};
                obj[NEWS_UPDATE] = {type: action.type, data:action.payload.data};
                return Object.assign({}, state, obj);
            }
            break;
        default:
            return state;
    }
    return state;
}