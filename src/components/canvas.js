/**
 * Created by harshalcarpenter on 12/19/17.
 */

import React from 'react';
import Logo, {smallAnim} from './load-logo';
import { connect } from "react-redux";
import DashBoard from "./dashboard";
import { fetchBTC, fetchETH } from "../actions";

const canvasState = {
    dashboard:"dashboard",
    news: "news",
    profile: "profile",
    chat: "chat",
    info: "info"
};

var intVal;

class Canvas extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            menuOpen : false,
            canvasState: canvasState.dashboard
        }
    }

    getTicker(obj){
        obj.props.fetchBTC("btc");
        obj.props.fetchETH("eth");
    }

    toggleMenu(){
        this.setState({menuOpen: !this.state.menuOpen});
    }

    changeCanvasState(cState){
        this.setState({canvasState: canvasState[cState]});
        this.toggleMenu();
    }

    componentWillMount(){
        intVal = setInterval(this.getTicker,3000,this);
    }

    componentWillUnmount(){
        clearInterval(intVal);
    }

    //Render
    render(){

        let mwClass = this.state.menuOpen ? "" : "close-options";
        mwClass += " menu-wheel ";

        let currentState = this.state.canvasState;

        let BTC="", ETH="";
        if(this.props.tick.hasOwnProperty("BTC")){
            BTC = this.props.tick.BTC.last;
        }
        if(this.props.tick.hasOwnProperty("ETH")){
            ETH = this.props.tick.ETH.last;
        }

        return (
            <div className="canvas-container">
                <div className="canvas-body">

                    {/* Top Icon */}
                    <div className="canvas-top-icon">
                        <Logo height={50}/>
                        <h3 className="canvas-title">Cryptonthus</h3>
                    </div>

                    {/*** Menu Button ***/}
                    <div className="canvas-menu-button"
                         onClick={this.toggleMenu.bind(this)}>
                        <i className="fa fa-bars"></i>
                    </div>

                    {/* Menu Wheel */}

                    <div className={mwClass}>
                        <div className="mw-option"
                             onClick={()=> this.changeCanvasState(canvasState.dashboard)}>
                            <i className="fa fa-briefcase"></i>
                        </div>
                        <div className="mw-option"
                             onClick={()=> this.changeCanvasState(canvasState.news)}>
                            <i className="fa fa-newspaper-o"></i>
                        </div>
                        <div className="mw-option"
                             onClick={()=> this.changeCanvasState(canvasState.profile)}>
                            <i className="fa fa-user-circle"></i>
                        </div>
                        <div className="mw-option"
                             onClick={()=> this.changeCanvasState(canvasState.chat)}>
                            <i className="fa fa-comments"></i>
                        </div>
                        <div className="mw-option"
                             onClick={()=> this.changeCanvasState(canvasState.info)}>
                            <i className="fa fa-info-circle"></i>
                        </div>
                    </div>

                    {/** Canvas Cover **/}
                    <div className="canvas-cover">
                        {/*** Dashboard ***/}

                        <div className={`dashboard ${currentState === canvasState.dashboard ? '' : 'hide'}`}>
                            <Dashboard btc={BTC} eth={ETH} proppy="apples"/>
                        </div>

                        {/** Reddit News/Comments **/}
                        <div className={`news-block ${currentState === canvasState.news ? '' : 'hide'}`}>
                            <News/>
                        </div>

                        {/** Profile **/}
                        <div className={`user-prof ${currentState === canvasState.profile ? '' : 'hide'}`}>
                            <UserProfile/>
                        </div>

                        {/** Chats **/}
                        <div className={`chat-room ${currentState === canvasState.chat ? '' : 'hide'}`}>
                            <Chat/>
                        </div>

                        {/** About Us **/}
                        <div className={`about-us ${currentState === canvasState.info ? '' : 'hide'}`}>
                            <AboutUs/>
                        </div>
                    </div>
                </div>
                <div className="canvas-menu">

                </div>
            </div>
        );
    }
}


Canvas.propTypes = {
    //signUpBool: PropTypes.bool
};

Canvas.defaultProps = {
    //signUpBool: true
};

//DashBoard
class Dashboard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let coinHTML =[],
            coinObj = [
                {
                    name: "BTC",
                    full_name: "Bitcoin",
                    imgUrl: "imgs/icon/bitcoin.svg",
                    amount: 5
                },{
                    name: "ETH",
                    full_name: "Ethereum",
                    imgUrl: "imgs/icon/ethereum.svg",
                    amount: 25
                }
            ],
            amount = 0,
            BTC=this.props.btc,
            ETH=this.props.eth;


        coinObj.forEach((elem,ind)=>{
            debugger;
            if(elem.name === "BTC"){
                amount = amount + ((+BTC)* elem.amount);
                elem.currVal = +BTC;
            }else if(elem.name === "ETH"){
                amount = amount + ((+ETH)* elem.amount);
                elem.currVal = +ETH;
            }

            coinHTML.push(
               <div className="coin-cover">
                   <div className="coin-intro">
                       <div className="coin-image-cover">
                           <img src={elem.imgUrl} className="coin-image"/>
                       </div>
                       <div className="coin-name">
                           {elem.full_name}
                       </div>
                   </div>
                   <div className="coin-amount">
                       <div className="ca-cover">
                           <div className="coin-total">
                               {elem.amount}
                           </div>
                           <div className="coin-curr">
                               {(+elem.currVal).toLocaleString()}
                           </div>
                           <div className="coin-fiat">
                               {((+elem.currVal)*elem.amount).toFixed(2).toLocaleString()}
                           </div>
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
                        ${amount.toFixed(2)}
                    </div>
                </div>

                <div className="curr-cover">
                    {coinHTML}
                </div>
                <div className="curr-chart">
                    {/* BTC Chart */}
                    {/* ETH Chart */}
                    {/* Total Chart */}
                </div>
            </div>
        );
    }
}

//News
class News extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h2>News</h2>
                <div className="latest-news">

                </div>
            </div>
        );
    }
}

//User Profile
class UserProfile extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h2>User Profile</h2>
                <div className="user-profile">

                </div>
            </div>
        );
    }
}

//Chat
class Chat extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h2>Chat</h2>
                <div className="chat-room">

                </div>
            </div>
        );
    }
}

//About Us
class AboutUs extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h2>About Us</h2>
                <div className="about-us">

                </div>
            </div>
        );
    }
}

//Redux

function mapStateToProps(state) {
    //return {sign: state.sign}
    return {tick: state.ticker}
}

export default connect(mapStateToProps, { fetchBTC, fetchETH})(Canvas);