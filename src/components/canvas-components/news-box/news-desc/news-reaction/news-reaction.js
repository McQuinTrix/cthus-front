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

    reactionsObj = {
        "like":"2A6NBDFJTX6HCDT8",
        "dislike":"VO75CLDFDNPB85W4"
    };

    onReact(reactionType){
        let data = {
            postId: this.props.newsDetail.id,
            postType: "reddit-post",
            userId: window.localStorage.getItem("user_id")
        };
        //if(this.reactionsObj.hasOwnProperty(reactionType.toLowerCase())){
        axios.post(`${ct_url}/action/${reactionType}`,data)
        //}else{
        //console.warn("Unknown Reaction");
        //}
    }

    render(){
        let newsDetail = this.props.newsDetail,
            userDetail = this.props.userDetail,
            commonReactionClass = "news-reaction";

        debugger;
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
                <span className="reaction reaction-like-span"
                      onClick={(event)=>{
                          event.stopPropagation();
                          this.onReact(this.reactionsObj.like)
                      }}>

                    <i className="fa fa-thumbs-o-up"></i>
                    <i className="fa fa-thumbs-up"></i>
                    Like
                </span>
                <span className="reaction reaction-dislike-span"
                      onClick={(event)=>{
                          event.stopPropagation();
                          this.onReact(this.reactionsObj.dislike)
                      }}>

                    <i className="fa fa-thumbs-o-down"></i>
                    <i className="fa fa-thumbs-down"></i>
                </span>
            </div>
        );
    }
}