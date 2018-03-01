/**
 * Created by harshalcarpenter on 2/25/18.
 */

import React from 'react';
import { getNews,NEWS_UPDATE,CRYPTO,BTC_NEWS,ETH_NEWS,CRY_MAR } from '../actions/reddit_news'
import moment from 'moment';

import { connect } from "react-redux";
import Logo from "./load-logo";

//News
class News extends React.Component{

    //news object
    newsObj = {};

    constructor(props){
        super(props);
        this.newsObj[BTC_NEWS] = "";
        this.newsObj[ETH_NEWS] = "";
        this.newsObj[CRYPTO] = "";
        this.newsObj[CRY_MAR] = "";
    }

    formNewsComp(type,index){
        let newsHTML = [];

        this.newsObj[type].forEach((elem,index2)=>{

            newsHTML.push(<div className="news-container"
                               onClick={()=>{ debugger; cordova.InAppBrowser.open(elem.data.url, '_system');}}
                               key={index2}>
                <div className="news-image">
                    {elem.data.thumbnail.length >8 ?
                        <img src={elem.data.thumbnail}/> :
                        <div className="margin-top-5">
                            <Logo height={90}/>
                        </div>
                    }
                </div>
                <div className="news-desc">
                    <h3>{elem.data.title}</h3>
                    <span className="news-time">
                        {moment().utc(elem.data.created_utc).format("MMM DD,YYYY")}
                    </span>
                    <span className="news-source">
                        {elem.data.domain}
                    </span>
                </div>
            </div>);
        });

        return newsHTML;
    }

    componentWillMount(){
        this.props.getNews(CRYPTO,15);
        this.props.getNews(BTC_NEWS,15);
        this.props.getNews(ETH_NEWS,15);
        this.props.getNews(CRY_MAR,15);
    }

    cleanData(data,type){
        let regex,
            propToCheck = "",
            isMatch = false;
        switch (type){
            case CRYPTO:
                regex = /(NEWS|DEVELOPMENT|EXCHANGE|POLITICS|RELEASE|MEDIA|SECURITY|PRIVACY)/;
                propToCheck = "link_flair_text";
                isMatch = true;
                break;

            case CRY_MAR:
                regex = /(ICOs|News|Educational|Exchange)/;
                propToCheck = "link_flair_text";
                isMatch = true;
                break;

            case BTC_NEWS:
                regex = /^self/;
                propToCheck = "thumbnail";
                isMatch = false;
                break;

            case ETH_NEWS:
                regex = /^self/;
                propToCheck = "thumbnail";
                isMatch = false;
                break;

            default:
                break;
        }
        data.children = data.children.filter((elem,index)=>{
            if(elem.data[propToCheck]){
                if(elem.data[propToCheck].match(regex) && isMatch){
                    return true;
                }else if(!elem.data[propToCheck].match(regex) && !isMatch){
                    return true;
                }
            }
            return false;
        });
        return data.children;
    }

    componentWillReceiveProps(nextProps){
        let self = this,
            news_update = nextProps.news[NEWS_UPDATE];
        if(news_update && news_update.hasOwnProperty("data")){
            this.newsObj[news_update.type] = this.cleanData(news_update.data.data,news_update.type);
        }
    }

    render(){
        let sectionComp = [];

        Object.keys(this.newsObj).forEach((elem,index)=>{
            if(Array.isArray(this.newsObj[elem])){
                let sectionHTML = (<div className="news-cover" key={index}>
                        <h3 className="news-head">{elem}</h3>
                        <div className="news-links">
                            {this.formNewsComp(elem,index)}
                        </div>
                    </div>);
                sectionComp.push(sectionHTML);
            }
        });

        return (
            <div>
                <div className="latest-news">
                    {sectionComp}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tick: state.ticker,
        news: state.news
    }
}

export default connect(mapStateToProps, {getNews})(News);