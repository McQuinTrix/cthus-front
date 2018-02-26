import { SIGN_UP, SIGN_IN, PORT_GET, PORT_UPDATE,
        PROF_UPDATE, USER_INFO,UPDATE_USERINFO,GET_DATA,ERASE_DATA } from '../actions/index';


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
        case PROF_UPDATE:
            if(action.payload.status === 200){
                let obj ={};
                obj[PROF_UPDATE] = action.payload.data;
                return Object.assign({},state, obj);
            }
        break;
        case USER_INFO:
            if(action.payload.status === 200){
                let obj = {};
                obj[USER_INFO] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;
        case UPDATE_USERINFO:
            if(action.payload.status === 200){
                let obj = {};
                obj[UPDATE_USERINFO] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;
        case GET_DATA:
            if(action.payload.status === 200){
                let obj = {};
                obj[GET_DATA] = action.payload.data;
                return Object.assign({},state,obj);
            }
            break;
        case ERASE_DATA:
            let obj = {};
            obj[GET_DATA] = {};
            return Object.assign({},state,obj);
        default:
            return state;
            break;
    }
    return state;
}