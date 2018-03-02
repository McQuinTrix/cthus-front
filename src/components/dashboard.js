/**
 * Created by harshalcarpenter on 11/16/17.
 */

import React from 'react';
import moment from 'moment'
import { Link } from 'react-router';
import { fetchBTC, fetchETH, getPortfolio,updateCoinAPI,getData,eraseData } from "../actions";
import { PORT_GET,PORT_UPDATE,GET_DATA } from "../actions/index";
import Logo, {smallAnim} from './load-logo';
import { connect } from "react-redux";
import axios from 'axios';

import Alert from './alert-message';
import ReLineChart from './feature-comp/line-chart';
import ReAreaChart from './feature-comp/area-chart';

//--- CT API Url
const ct_url = "https://cryptonthus.herokuapp.com/api";

//DashBoard
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eth: 0,
            btc: 0,
            updateCoin: "BTC",
            changePortVal: true
        };
        this.touchEnd.bind(this);
        this.touchStart.bind(this);
        this.updateCoinVal.bind(this);

        this.props.getData('eth');
        this.props.getData('btc');
    }

    coinObj = {
        "BTC":{
            name: "BTC",
            full_name: "Bitcoin",
            imgUrl: "imgs/icon/bitcoin.svg",
            amount: 0,
            data: [],
            lastDayVal: 0
        },
        "ETH":{
            name: "ETH",
            full_name: "Ethereum",
            imgUrl: "imgs/icon/ethereum.svg",
            amount: 0,
            data: [],
            lastDayVal: 0
        }
    };



    getPortData(){
        this.props.getPortfolio(this.props.userId);
    }

    //Swipe Detection
    startX = 0;
    touchStart(event, origEvent){
        this.startX = origEvent.changedTouches[0].pageX;
    }
    touchEnd(event, origEvent){
        let endX = origEvent.changedTouches[0].pageX;

        if(this.startX > endX+100){
            //alert("Swiped Right -> Left");
        }else if(this.startX+100 < endX){
            //alert("Swiped Left -> Right");
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
        this.refs.alertRef.showAlert({ message: "Portfolio Updated!", type: "success"});
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

    componentWillReceiveProps(nextProps){
        if(this.props.sign.hasOwnProperty(PORT_GET)
            && this.state.changePortVal){

            if(this.props.sign[PORT_GET].result.length){
                this.props
                    .sign[PORT_GET]
                    .result[0]
                    .coins
                    .forEach((elem,ind)=>{
                        this.coinObj[elem.type].amount = elem.value;
                    });
            }

            this.togglePortalVal()
        }

        let self = this;
        if(nextProps.sign[GET_DATA]){
            let response = nextProps.sign[GET_DATA];

            if(response.hasOwnProperty('result')){
                let coinObj = self.coinObj[response.type.toUpperCase()];
                coinObj.data = response.result.map((elem)=>{
                    let date = new Date(+elem.date);
                    return {
                        name: moment(date).format("MM/DD"),
                        value: +elem.value
                    }
                });
                coinObj.data.reverse();
                coinObj.lastDayVal = coinObj.data[coinObj.data.length - 48];
                this.props.eraseData();
            }
        }
    }

    togglePortalVal(){
        //Set State
        this.setState({
            changePortVal: !this.state.changePortVal
        })
    }

    componentWillMount(){

    }

    render(){

        let coinHTML =[],
            coinObj = this.coinObj,
            amount = 0,
            BTC = this.props.btc,
            ETH = this.props.eth;

        //Forming the HTML for each coin
        Object.keys(coinObj).forEach((elem,ind)=>{

            let coin = coinObj[elem],
                coverClass = "coin-cover",
                coinShrtClass = "coin-short";

            //TODO: Remove Name dependency
            if(elem === "BTC"){
                amount = amount + ((+BTC)* coinObj[elem].amount);
                coinObj[elem].currVal = +BTC;
            }else if(elem === "ETH"){
                amount = amount + ((+ETH)* coinObj[elem].amount);
                coinObj[elem].currVal = +ETH;
            }

            //If the coin is being updated
            if(elem === this.state.updateCoin){
                coverClass += " update-active";
            }

            //To check if green or red
            if(+coin.lastDayVal.value < coin.currVal){
                coinShrtClass += " up-tick";
            }else{
                coinShrtClass += " down-tick";
            }

            coinHTML.push(
                <div className={coverClass}
                     key={ind}
                     onTouchEnd={(e)=>{this.touchEnd(e,e.nativeEvent)}}
                     onTouchStart={(e)=>{this.touchStart(e,e.nativeEvent)}}>
                    <div className={coinShrtClass}
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
                                    <span className="coin-type">Price</span>
                                    <span className="coin-amt">
                                        $ {(+coin.currVal).toLocaleString()}
                                    </span>
                                </div>
                                {/*
                                    <div className="coin-fiat">
                                        <span className="coin-type">Value </span>
                                        <span className="coin-amt">
                                        $ {((+coin.currVal) * coin.amount).toFixed(2).toLocaleString()}
                                    </span>
                                    </div>
                                */}
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
                        <div className="coin-chart">
                            {
                                coin.data.length > 0

                                    ?

                                    <ReAreaChart width={340}
                                        height={300}
                                        chartData={coin.data}
                                        chartName={coin.full_name}
                                        dataKey="value"
                                        marginStyle={{top: 5, right: 30, left: 0, bottom: 5}}
                                        strokeColor="#20e5f1"/>

                                    :

                                    <div>Loading ...</div>
                            }
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div>
                <div className="dash-head">
                    <h2 className="dash-h2">Portfolio</h2>
                    <div className="dash-worth">
                        $ {amount.toFixed(2)}
                    </div>
                </div>
                <div className="dash-body">
                    <div className="curr-main">
                        <div className="curr-cover">
                            {coinHTML}
                        </div>
                    </div>
                </div>
                <Alert ref="alertRef"/>
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

export default connect(mapStateToProps, { getPortfolio,updateCoinAPI,getData,eraseData})(Dashboard);