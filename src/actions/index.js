import axios from "axios";

export const FETCH_BTC = "fetch_btc";
export const FETCH_ETH = "fetch_eth";
export const SIGN_UP = "sign_up";
export const SIGN_IN = "sign_in";
export const PORT_GET = "port_get";
export const PORT_UPDATE = "port_update";
export const PROF_UPDATE = "prof_update";
export const USER_INFO = "get_userInfo";
export const UPDATE_USERINFO = "update_userInfo";
export const GET_DATA = "get_data";
export const ERASE_DATA = "erase_data";
export const CLEAR_SIGN_IN = "clear_sign_in";
export const CONFIRM_EMAIL = "confirm_email";

const root_url = "https://api.gemini.com/v1/pubticker/";
export const ct_url = "https://cryptonthus.herokuapp.com/api";
//const ct_url = "http://localhost:8000/api";

export function fetchBTC() {
    const req = axios.get(`${root_url}/btcusd`);

    return {
        type: FETCH_BTC,
        payload: req
    }
}

export function fetchETH() {
    const req = axios.get(`${root_url}/ethusd`);

    return {
        type: FETCH_ETH,
        payload: req
    }
}

export function signUp(data){
    const req = axios.post(`${ct_url}/signup`,data);

    return {
        type: SIGN_UP,
        payload: req
    }
}

export function updateCoinAPI(data){
    const req = axios.post(`${ct_url}/portfolio`,data);

    return {
        type: PROF_UPDATE,
        payload: req
    }
}

export function getPortfolio(id){
    const req = axios.get(`${ct_url}/portfolio/${id}`);

    return {
        type: PORT_GET,
        payload: req
    }
}


export function getUser(id){
    const req = axios.get(`${ct_url}/userInfo/${id}`);

    return {
        type: USER_INFO,
        payload: req
    }
}

export function updateUser(userId,data){
    const req = axios.put(`${ct_url}/userInfo/${userId}`,data);

    return {
        type: UPDATE_USERINFO,
        payload: req
    }
}

export function signIn(data){
    const req = axios.post(`${ct_url}/userInfo/signin`,data);

    return {
        type: SIGN_IN,
        payload: req
    }
}

export function getData(type){
    const req = axios.get(`${ct_url}/get-values/${type}`);

    return {
        type: GET_DATA,
        payload: req
    }
}

export function confirmEmail(userId) {
    const request = axios.post(`${ct_url}/confirm-email/${userId}`)

    return {
        type: CONFIRM_EMAIL,
        payload: request
    }
}

export function eraseData(){
    return {
        type: ERASE_DATA,
        payload: ""
    }
}

export function clearSignIn() {
    return {
        type: CLEAR_SIGN_IN,
        payload: ""
    }
}