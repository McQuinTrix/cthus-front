import { SIGN_UP } from '../actions/index';


export default function (state={},action) {
    switch(action.type){
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