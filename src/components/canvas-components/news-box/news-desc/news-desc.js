/**
 * Created by harshalcarpenter on 5/19/18.
 */
import React from 'react';
import moment from 'moment';
import NewsReact from './news-reaction/news-reaction';

export const NewsDesc = (props) =>{
    let data = props.data,
        postedDate = moment().utc(data.created_utc).format("MMM DD,YYYY");

    return (<div className="news-desc">
        <div>
            <span className="news-time">
                {postedDate}
            </span>
            <span className="news-source">
              {data.domain}
            </span>
        </div>
        <h3>{data.title}</h3>
        <NewsReact userDetail={{}} newsDetail={data}/>
    </div>)
};