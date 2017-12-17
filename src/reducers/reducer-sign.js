import { SIGN_UP, SIGN_IN } from '../actions/index';


export default function (state={},action) {
    switch(action.type){
        case SIGN_UP:
            if(action.payload.status === 200){
                return Object.assign({}, state, {"SIGN_STATUS": action.payload.data});
            }
            break;
        case SIGN_IN:
            if(action.payload.status === 200){
                return Object.assign({}, state, {"SIGN_IN": action.payload.data});
            }
            break;
        default:
            return state;
            break;
    }
    return state;
}