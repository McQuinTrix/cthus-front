/**
 * Created by harshalcarpenter on 5/20/18.
 */

import React from 'react';
import axios from 'axios';
import {ct_url} from '../../../../../actions/index';

export default class NewsReact extends React.Component {
    constructor(props){
        super(props);
    }

    reaction(reactionType){
        if(reactionType){

        }

        axios.post(`${ct_url}/portfolio`,data);
    }

    render(){
        let newsDetail = this.props.newsDetail,
            userDetail = this.props.userDetail,
            commonReactionClass = "news-reaction";

        if( newsDetail.id &&
            userDetail.reactions &&
            userDetail.reactions.hasOwnProperty(newsDetail.name)){

            if(userDetail.reactions[newsDetail.id]){
                commonReactionClass += " reaction-like";
            }else{
                commonReactionClass += " reaction-dislike";
            }
        }

        return (
            <div className={commonReactionClass}>
                <span className="reaction reaction-like-span" onClick={()=>{this.reaction(true)}}>
                    <i className="fa fa-thumbs-o-up"></i>
                    <i className="fa fa-thumbs-up"></i>
                    Like
                </span>
                <span className="reaction reaction-dislike-span" onClick={()=>{this.reaction(false)}}>
                    <i className="fa fa-thumbs-o-down"></i>
                    <i className="fa fa-thumbs-down"></i>
                </span>
            </div>
        );
    }
}