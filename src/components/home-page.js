/**
 * Created by harshalcarpenter on 11/16/17.
 */

import React from 'react';
import { Link } from "react-router";
import { connect } from "react-redux";
import { fetchBTC, fetchETH } from "../actions";
import Logo from './load-logo'

var intVal;

class HomePage extends React.Component{

    getTicker(obj){
        obj.props.fetchBTC("btc");
        obj.props.fetchETH("eth");
    }

    componentDidMount(){
        intVal = setInterval(this.getTicker,3000,this);
    }

    componentWillUnmount(){
        clearInterval(intVal);
    }

    render(){
        let BTC="", ETH="";
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
                    <button>Google</button>
                    <button>Sign In Email</button>
                </div>
                <div className="start-logo">
                    <Logo/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {tick: state.ticker}
}

export default connect(mapStateToProps, {  fetchBTC, fetchETH })(HomePage);