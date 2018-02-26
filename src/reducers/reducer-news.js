/**
 * Created by harshalcarpenter on 2/25/18.
 */
import {NEWS_UPDATE} from '../actions/reddit_news';

export default function (state={},action) {
    switch(action.type){
        case NEWS_UPDATE:
            if(action.payload.status === 200){
                let obj = {};
                obj[NEWS_UPDATE] = action.payload.data;
                return Object.assign({}, state, obj);
            }
            break;
        default:
            return state;
    }
}