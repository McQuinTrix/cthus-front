import { SIGN_UP, SIGN_IN, PORT_GET,PORT_UPDATE } from '../actions/index';


export default function (state={},action) {
    switch(action.type){
        case SIGN_UP:
            if(action.payload.status === 200){
                return Object.assign({}, state, {"SIGN_STATUS": action.payload.data});
            }
            break;
        case SIGN_IN:
            if(action.payload.status === 200){
                let obj = {};
                obj[SIGN_IN] = action.payload.data;
                return Object.assign({}, state, obj );
            }
            break;
        case PORT_GET:
            if(action.payload.status === 200){
                let obj ={};
                obj[PORT_GET] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;
        case PORT_UPDATE:
            if(action.payload.status === 200){
                let obj ={};
                obj[PORT_UPDATE] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;
        default:
            return state;
            break;
    }
    return state;
}