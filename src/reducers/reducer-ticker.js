/**
 * Created by harshalcarpenter on 11/18/17.
 */

import { FETCH_BTC, FETCH_ETH, SIGN_UP } from '../actions/index';

export default function (state={},action) {
    switch(action.type){
        case FETCH_BTC:
            if(action.payload.status === 200){
                return Object.assign({},state, {"BTC": action.payload.data});
            }
            break;
        case FETCH_ETH:
            if(action.payload.status === 200) {
                return Object.assign({}, state, {"ETH": action.payload.data});
            }
            break;
        case SIGN_UP:
            if(action.payload.status === 200){
                return Object.assign({}, state, {"SIGN_STATUS": action.payload.data});
            }
            break;
        default:
            return state;
            break;
    }
    return state;
}