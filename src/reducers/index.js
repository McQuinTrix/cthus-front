import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import tickerReducer from "./reducer-ticker";
import signReducer from "./reducer-sign";

const rootReducer = combineReducers({
    ticker: tickerReducer,
    sign: signReducer
});

export default rootReducer;