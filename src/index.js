
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import reducers from './reducers';
import promise from "redux-promise";

//Components
import HomePage from './components/home-page';
import DashBoard from './components/dashboard';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/dashboard" component={DashBoard}/>
                    <Route path="/" component={HomePage} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#crypton-body')
);

/*
<Route path="/posts/:id" component={PostsShow} />
<Route path="/" component={PostsIndex} />
*/
