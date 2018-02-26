import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import tickerReducer from "./reducer-ticker";
import signReducer from "./reducer-sign";
import newsReducer from "./reducer-news";

const rootReducer = combineReducers({
    ticker: tickerReducer,
    sign: signReducer,
    news: newsReducer
});

export default rootReducer;