/**
 * Created by harshalcarpenter on 11/16/17.
 */

import React from 'react';
import { Link } from "react-router-dom";

let url = "https://api.gemini.com/v1/pubticker/";

class HomePage extends React.Component{

    componentDidMount(){

    }

    render(){
        return (
            <div className="hp-container">
                <div className="hp-header">
                    Cryptonthus
                </div>
                <div className="hp-quotes">
                    <div className="hp-quote-btc">
                        <label className="hp-btc-label">BTC: </label>
                        <span> 7430.84</span>
                    </div>
                    <div className="hp-quote-eth">
                        <label className="hp-eth-label">ETH: </label>
                        <span> 430.84</span>
                    </div>
                </div>
                <div className="hp-buttons">
                    <button>Google</button>
                    <button>Sign In Email</button>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </div>
        );
    }
}

export default HomePage;