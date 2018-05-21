/**
 * Created by harshalcarpenter on 5/19/18.
 */

import React from 'react';
import { NewsDesc } from './news-desc/news-desc';
import {NewsThumbnail} from './news-thumbnail/news-thumbnail';

export default class NewsBox extends React.Component{

    constructor(props){
        super(props);
    }

    itemClick(data){
        cordova.InAppBrowser.open(data.url, '_system');
    }
    render(){
        let article = this.props.article,
            data = article.data,
            className = "news-container news-"+(this.props.classType || "");

        return (<div className={className}
                     onClick={()=>{this.itemClick(data)}}>
                    <NewsThumbnail data={data}/>
                    <NewsDesc data={data}/>
                </div>)
    }
}