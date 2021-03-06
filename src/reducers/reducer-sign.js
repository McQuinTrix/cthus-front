import { SIGN_UP, SIGN_IN, PORT_GET, PORT_UPDATE,
        PROF_UPDATE, USER_INFO,UPDATE_USERINFO,
        GET_DATA,ERASE_DATA, CLEAR_SIGN_IN,
        CONFIRM_EMAIL,USER_REACTIONS } from '../actions/index';

export default function (state={},action) {
    let obj = {};
    switch(action.type){
        case SIGN_UP:
            if(action.payload.status === 200){
                obj[SIGN_IN] = {
                    isSignedIn: action.payload.data.isSuccess,
                    data: action.payload.data.data
                };
                return Object.assign({}, state, obj);
            }
            break;

        case SIGN_IN:
            if(action.payload.status === 200){
                obj[SIGN_IN] = {
                    isSignedIn: action.payload.data.isSuccess,
                    data: action.payload.data.data
                };
                return Object.assign({}, state, obj );
            }else{
                obj[SIGN_IN] = {isSignedIn: false, data: "Sign In Failed"};
                return Object.assign({}, state, obj );
            }
            break;

        case PORT_GET:
            if(action.payload.status === 200){
                obj[PORT_GET] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;
        case PORT_UPDATE:
            if(action.payload.status === 200){
                obj[PORT_UPDATE] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;
        case PROF_UPDATE:
            if(action.payload.status === 200){
                obj[PROF_UPDATE] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;

        case USER_INFO:
            if(action.payload.status === 200){
                obj[USER_INFO] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;

        case UPDATE_USERINFO:
            if(action.payload.status === 200){
                obj[UPDATE_USERINFO] = action.payload.data;
                return Object.assign({},state, obj);
            }
            break;

        case GET_DATA:
            if(action.payload.status === 200){
                obj[GET_DATA] = action.payload.data;
                return Object.assign({},state,obj);
            }
            break;
        case ERASE_DATA:
            obj[GET_DATA] = {};
            return Object.assign({},state,obj);
            break;

        case CLEAR_SIGN_IN:
            obj[SIGN_IN] = {};
            return Object.assign({},state,obj);
            break;

        case CONFIRM_EMAIL:
            if(action.payload.status
                && action.payload.status === 200) {

                obj[CONFIRM_EMAIL] = action.payload.data;
            }
            return Object.assign({},state,obj);
            break;

        case USER_REACTIONS:
            if(action.payload.status
                && action.payload.status === 200) {
                obj[USER_REACTIONS] = action.payload.data;
            }

            return Object.assign({},state,obj);
            break;

        default:
            return state;
            break;
    }
    return state;
}