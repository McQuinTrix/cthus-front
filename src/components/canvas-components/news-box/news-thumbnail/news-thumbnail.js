/**
 * Created by harshalcarpenter on 5/19/18.
 */
import React from 'react';
import Logo from '../../../load-logo';

export const NewsThumbnail = (props) =>{
    let data = props.data;

    if(data.thumbnail.length > 8){
        return (
            <div className="news-image">
                <img src={data.thumbnail}/>
            </div>
        )
    }

    return (
        <div className="news-image">
            <div className="margin-top-5">
                <Logo height={120}/>
            </div>
        </div>
    )
};