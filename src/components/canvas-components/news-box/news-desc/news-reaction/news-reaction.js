/**
 * Created by harshalcarpenter on 5/20/18.
 */

import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import {ct_url,USER_REACTIONS} from '../../../../../actions/index';

class NewsReact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userReactions : {}
        }
    }

    reactionsObj = {
        "like":"2A6NBDFJTX6HCDT8",
        "dislike":"VO75CLDFDNPB85W4"
    };

    onReact(reactionType){
        let userId = window.localStorage.getItem("user_id"),
            data = {
            postId: this.props.newsDetail.id,
            postType: "reddit-post",
            userId: userId
        }, userReactions = this.state.userReactions;
        if(userReactions.hasOwnProperty('reactions')){
            userReactions.reactions[userId].reactionType = reactionType;
        }else{
            userReactions ={
                reactions: {}
            };
            userReactions.reactions[userId] = {
                reactionType: reactionType
            }
        }
        this.setState({userReactions: userReactions});

        axios.post(`${ct_url}/action/${reactionType}`,data);
    }

    componentWillReceiveProps(nextProps){
        let userReactions = this.state.userReactions;
        if(nextProps.sign[USER_REACTIONS]){
            userReactions = nextProps.sign[USER_REACTIONS].data.filter(function(item, index){
                return item._id === this.props.newsDetail.id;
            },this)[0] || userReactions;
            this.setState({userReactions: userReactions});
        }
    }

    render(){
        let newsDetail = this.props.newsDetail,
            userDetail = this.props.userDetail,
            commonReactionClass = "news-reaction",
            userId = window.localStorage.getItem("user_id");

        if(this.state.userReactions.hasOwnProperty('reactions')
            && this.state.userReactions.reactions.hasOwnProperty(userId)){

            let reactionType = this.state.userReactions.reactions[userId].reactionType;

            if(reactionType === this.reactionsObj.like){
                commonReactionClass += " reaction-like";
            }else if(reactionType === this.reactionsObj.dislike){
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


function mapStateToProps(state) {
    return {
        sign: state.sign
    }
}

export default connect(mapStateToProps, {})(NewsReact);