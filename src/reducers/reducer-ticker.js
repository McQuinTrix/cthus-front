/**
 * Created by harshalcarpenter on 11/18/17.
 */

import { FETCH_BTC, FETCH_ETH } from '../actions/index';

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
    }
    return state;
}