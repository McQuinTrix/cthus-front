/**
 * Created by harshalcarpenter on 2/25/18.
 */

import React from 'react';
import { getNews,NEWS_UPDATE,CRYPTO,BTC_NEWS,ETH_NEWS,CRY_MAR } from '../actions/reddit_news'
import moment from 'moment';

import { connect } from "react-redux";

//News
class News extends React.Component{
    constructor(props){
        super(props);
    }

    //news object
    newsObj = {};

    formNewsComp(type){
        let newsHTML = [];
debugger;
        newsHTML.push(<h1>{type}</h1>)
        this.newsObj[type].data.children.forEach((elem)=>{
            newsHTML.push(<div className="news-container">
                <div className="news-image">
                    <img src={elem.data.thumbnail}/>
                </div>
                <div className="news-desc">
                    <h3>{elem.data.title}</h3>
                    <div className="news-time">
                        {moment().utc(elem.data.created_utc).format("MMM DD,YYYY")}
                    </div>
                </div>
            </div>);
        });

        return newsHTML;
    }

    componentWillMount(){
        this.props.getNews(CRYPTO,3);
        this.props.getNews(BTC_NEWS,3);
        this.props.getNews(ETH_NEWS,3);
        this.props.getNews(CRY_MAR,3);
    }

    componentWillReceiveProps(nextProps){
        let self = this,
            news_update = nextProps.news[NEWS_UPDATE];
        debugger;
        if(news_update){
            this.newsObj[news_update.type] = news_update.data;
        }
    }

    render(){
        let sectionComp = [];

        Object.keys(this.newsObj).forEach((elem)=>{
            let sectionHTML = <div className="news-cover">{this.formNewsComp(elem)}</div>;
            sectionComp.push(sectionHTML);
        });

        return (
            <div>
                <h2>News</h2>
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