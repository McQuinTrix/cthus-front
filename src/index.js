
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Link, hashHistory, Switch } from "react-router";

import reducers from './reducers';
import promise from "redux-promise";

//Components
import HomePage from './components/home-page';
import DashBoard from './components/canvas-components/dashboard';
import Logo from './components/load-logo';
import SignUp from './components/sign-up';
import Canvas from './components/canvas';
import ConfirmEmailComponent from './components/confirm-email/confirm-email';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={hashHistory}>
            <div>
                <Route path="/confirm-email/:userid" components={ConfirmEmailComponent}/>
                <Route path="/canvas/:userid" components={Canvas}/>
                <Route path="/signup/:id" component={SignUp}/>
                <Route path="/dashboard" component={DashBoard}/>
                <Route path="/" component={HomePage} />
            </div>
        </Router>
    </Provider>
    , document.querySelector('#crypton-body')
);

/*
<Route path="/posts/:id" component={PostsShow} />
<Route path="/" component={PostsIndex} />
*/
