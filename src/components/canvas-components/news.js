/**
 * Created by harshalcarpenter on 2/25/18.
 */

import React from 'react';
import { getNews,NEWS_UPDATE,CRYPTO,BTC_NEWS,ETH_NEWS,CRY_MAR } from '../../actions/reddit_news'
import { getReaction } from '../../actions/index';
import moment from 'moment';

import { connect } from "react-redux";
import Logo from "../load-logo";
import NewsBox from "./news-box/news-box";

//News
class News extends React.Component{

    //news object
    newsObj = {};
    newsIdArr = [];
    newsIdChanged = false;

    constructor(props){
        super(props);
        this.newsObj[BTC_NEWS] = {};
        this.newsObj[ETH_NEWS] = {};
        this.newsObj[CRYPTO] = {};
        this.newsObj[CRY_MAR] = {};
    }

    componentWillMount(){
        this.props.getNews(CRYPTO,15);
        this.props.getNews(BTC_NEWS,15);
        this.props.getNews(ETH_NEWS,15);
        this.props.getNews(CRY_MAR,15);
    }

    componentWillReceiveProps(nextProps){
        let news_update = nextProps.news[NEWS_UPDATE];

        if(news_update && news_update.hasOwnProperty("data")){
            this.newsObj[news_update.type] = this.cleanData(news_update.data.data,news_update.type);
            if(this.newsIdChanged){
                this.getReactionAPI(this.newsIdArr);
            }
        }
    }

    formSectionComponent(){
        let sectionComp = [];

        Object.keys(this.newsObj)
            .forEach((item,index) => {

            if(!this.newsObj[item].hasOwnProperty("children")){
                return ;
            }

            let children = this.newsObj[item].children,
                classType = this.newsObj[item].classType;

            if(Array.isArray(children)){
                let sectionHTML = (
                    <div className="news-cover" key={index}>
                        <h3 className="news-head">
                            {item}
                        </h3>
                        <div className="news-links">
                            {this.formNewsComp(item,classType)}
                        </div>
                    </div>
                );
                sectionComp.push(sectionHTML);
            }

        });

        return sectionComp;
    }

    formNewsComp(type,classType){
        let newsHTML = [];

        this.newsObj[type].children.forEach((item,index)=>{
            newsHTML.push(
                <NewsBox article={item}
                         key={index}
                         classType={classType}/>
            );
        });

        return newsHTML;
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
                if((elem.data[propToCheck].match(regex) && isMatch)
                    ||(!elem.data[propToCheck].match(regex) && !isMatch) ){

                    if(this.newsIdArr.indexOf(elem.data.id) < 0){
                        this.newsIdArr.push(elem.data.id);
                        this.newsIdChanged = true;
                    }
                    return true;
                }
            }
            return false;
        });

        return data;
    }

    getReactionAPI(postArr){
        this.props.getReaction(postArr, this.props.userId);
        this.newsIdChanged = false;
    }

    render(){
        let sectionComp  = this.formSectionComponent();

        return (
            <div className="latest-news">
                {sectionComp}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tick: state.ticker,
        news: state.news,
        sign: state.sign
    }
}

export default connect(mapStateToProps, {getNews,getReaction})(News);