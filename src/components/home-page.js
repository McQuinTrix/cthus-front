/**
 * Created by harshalcarpenter on 11/16/17.
 */

import React from 'react';
import { Link,browserHistory } from "react-router";
import { connect } from "react-redux";
import { fetchBTC, fetchETH } from "../actions";
import Logo from './load-logo'
import { homeAnim } from './load-logo';

export const userId = "user_id";

var intVal;

class HomePage extends React.Component{

    getTicker(obj){
        obj.props.fetchBTC("btc");
        obj.props.fetchETH("eth");
    }

    checkForCookie(){
        let userIdVal = window.localStorage.getItem(userId);
        if(userIdVal && userIdVal.length > 0){
            this.props.history.push('/signup/false');
        }
    }

    componentDidMount(){
        intVal = setInterval(this.getTicker,3000,this);
        this.checkForCookie();
    }

    componentWillUnmount(){
        clearInterval(intVal);
    }

    render(){
        let BTC = "",
            ETH = "";

        if(this.props.tick.hasOwnProperty("BTC")){
            BTC = this.props.tick.BTC.last;
        }
        if(this.props.tick.hasOwnProperty("ETH")){
            ETH = this.props.tick.ETH.last;
        }
        return (
            <div className="hp-container">
                <div className="hp-header">
                    Cryptonthus
                </div>
                <div className="hp-quotes">
                    <div className="hp-quote-btc">
                        <label className="hp-btc-label">BTC: </label>
                        <span> {BTC}</span>
                    </div>
                    <div className="hp-quote-eth">
                        <label className="hp-eth-label">ETH: </label>
                        <span> {ETH}</span>
                    </div>
                </div>
                <div className="hp-buttons">
                    <Link to="/signup/true"
                          params={{ signUpBool: true }}
                          className="hp-button-black">Sign Up</Link>
                    <br/>
                    <Link to="/signup/false"
                          params={{ signUpBool: false }}
                          className="hp-button-black">Sign In</Link>
                </div>
                <div className="start-logo">
                    <Logo animStyle={homeAnim} height={300}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {tick: state.ticker}
}

export default connect(mapStateToProps, {  fetchBTC, fetchETH })(HomePage);