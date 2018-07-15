/**
 * Created by harshalcarpenter on 5/26/18.
 */

import React from 'react';

export const CoinIntro = (props) => {
    let coinObj = props.coin,
        coinImage = coinObj.imgUrl,
        coinFullName = coinObj.full_name,
        coinCurrentValue = (+coinObj.currVal).toLocaleString();
    return (
        <div className="coin-intro">
            <div className="coin-intro-cover">
                <div className="coin-image-cover">
                    <img src={coinImage} className="coin-image"/>
                </div>
                <div className="coin-name">
                    {coinFullName}
                </div>
            </div>
            <div className="coin-curr">
                <span className="coin-type">Price</span>
                <span className="coin-amt">
                    $ {coinCurrentValue}
                </span>
            </div>
        </div>
    );
};