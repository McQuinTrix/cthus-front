import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import tickerReducer from "./reducer-ticker";

const rootReducer = combineReducers({
    ticker: tickerReducer
});

export default rootReducer;