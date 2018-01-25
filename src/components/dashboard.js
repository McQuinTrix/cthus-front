/**
 * Created by harshalcarpenter on 11/16/17.
 */

import React from 'react';
import { Link } from 'react-router';
import { fetchBTC, fetchETH, getPortfolio,updateCoinAPI } from "../actions";
import { PORT_GET,PORT_UPDATE } from "../actions/index";
import Logo, {smallAnim} from './load-logo';
import { connect } from "react-redux";

//DashBoard
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eth: 0,
            btc: 0,
            updateCoin: "",
            changePortVal: true
        };
        this.touchEnd.bind(this);
        this.touchStart.bind(this);
        this.updateCoinVal.bind(this);
    }

    coinObj = {
        "BTC":{
            name: "BTC",
            full_name: "Bitcoin",
            imgUrl: "imgs/icon/bitcoin.svg",
            amount: 0
        },
        "ETH":{
            name: "ETH",
            full_name: "Ethereum",
            imgUrl: "imgs/icon/ethereum.svg",
            amount: 0
        }
    };

    getPortData(){
        this.props.getPortfolio(this.props.userId);
    }

    //Swipe Detection
    startX = 0;
    touchStart(event, origEvent){
        //console.log(arguments);
        //console.log(origEvent.changedTouches[0].pageX);
        this.startX = origEvent.changedTouches[0].pageX;
    }
    touchEnd(event, origEvent){
        //console.log(arguments);
        //console.log(origEvent.changedTouches[0].pageX);
        let endX = origEvent.changedTouches[0].pageX;

        if(this.startX > endX+100){
            alert("Swiped Right -> Left");
        }else if(this.startX+100 < endX){
            alert("Swiped Left -> Right");
        }
    }

    updateCoinVal(coin,event){
        this.coinObj[coin].amount = event.target.value;
        this.forceUpdate();
    }

    updatePortfolio(coin){
        this.props.updateCoinAPI({
            userId: this.props.userId,
            type: coin,
            value: this.coinObj[coin].amount
        });
    }

    //Change Coin Value
    openUpdater(type){
        if(type === this.state.updateCoin){
            type = "";
        }
        this.setState({
            updateCoin: type
        });
    }

    componentDidMount(){
        this.getPortData();
    }

    togglePortalVal(){
        //Set State
        this.setState({
            changePortVal: !this.state.changePortVal
        })
    }

    render(){

        let coinHTML =[],
            coinObj = this.coinObj,
            amount = 0,
            BTC = this.props.btc,
            ETH = this.props.eth;

        if(this.props.sign.hasOwnProperty(PORT_GET) && this.state.changePortVal){
            if(this.props.sign[PORT_GET].result.length){
                this.props
                    .sign[PORT_GET]
                    .result[0]
                    .coins
                    .forEach((elem,ind)=>{
                        coinObj[elem.type].amount = elem.value;
                    });
            }

            this.togglePortalVal()
        }

        Object.keys(coinObj).forEach((elem,ind)=>{
            if(elem === "BTC"){
                amount = amount + ((+BTC)* coinObj[elem].amount);
                coinObj[elem].currVal = +BTC;
            }else if(elem === "ETH"){
                amount = amount + ((+ETH)* coinObj[elem].amount);
                coinObj[elem].currVal = +ETH;
            }

            let coin = coinObj[elem],
                coverClass = "coin-cover";

            if(elem === this.state.updateCoin){
                coverClass += " update-active";
            }

            coinHTML.push(
                <div className={coverClass}
                     key={ind}
                     onTouchEnd={(e)=>{this.touchEnd(e,e.nativeEvent)}}
                     onTouchStart={(e)=>{this.touchStart(e,e.nativeEvent)}}>
                    <div className="coin-short"
                         onClick={()=>{this.openUpdater(elem)}}>
                        <div className="coin-intro">
                            <div className="coin-image-cover">
                                <img src={coin.imgUrl} className="coin-image"/>
                            </div>
                            <div className="coin-name">
                                {coin.full_name}
                            </div>
                        </div>
                        <div className="coin-amount">
                            <div className="ca-cover">
                                <div className="coin-total">
                                    {coin.amount}
                                </div>
                                <div className="coin-curr">
                                    {(+coin.currVal).toLocaleString()}
                                </div>
                                <div className="coin-fiat">
                                    {((+coin.currVal)*coin.amount).toFixed(2).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="coin-more">
                        <div className="coin-update">
                            <input type="number"
                                   className="coin-input"
                                   value={coin.amount}
                                   onChange={(e)=>{this.updateCoinVal(elem,e)}} />
                            <button className="update-button"
                                    onClick={()=>{this.updatePortfolio(elem)}}>
                                <i className="fa fa-refresh"></i>
                                Update
                            </button>
                        </div>
                        {/* Chart */}
                    </div>
                </div>
            )
        });

        return (
            <div>
                <div className="dash-head">
                    <h2 className="dash-h2">Portfolio</h2>
                    <div className="dash-worth">
                        ${amount.toFixed(2)}
                    </div>
                </div>
                <div className="dash-body">
                    <div className="curr-main">
                        <div className="curr-cover">
                            {coinHTML}
                        </div>
                        <div className="curr-chart">
                            {/* BTC Chart */}
                            {/* ETH Chart */}
                            {/* Total Chart */}
                        </div>
                    </div>
                    <div className="curr-detail">

                    </div>
                </div>

            </div>
        );
    }
}


function mapStateToProps(state) {
    //return {sign: state.sign}
    return {
        tick: state.ticker,
        sign: state.sign
    }
}

export default connect(mapStateToProps, { getPortfolio,updateCoinAPI})(Dashboard);