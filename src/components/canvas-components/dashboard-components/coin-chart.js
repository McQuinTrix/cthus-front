/**
 * Created by harshalcarpenter on 5/26/18.
 */

import React from 'react';
import ReAreaChart from '../../feature-comp/area-chart';

export const CoinChart = (props) =>{
    let coin = props.coin,
        width = 340;

    if(document.querySelector('.coin-intro')){
        width = parseInt(window.getComputedStyle(document.querySelector('.coin-intro')).width) - 20;
    }

    if(coin.data.length === 0){
        return <div>Loading ...</div>
    }

    return (
        <div className="coin-chart">
            <ReAreaChart width={width}
                         height={300}
                         chartData={coin.data}
                         chartName={coin.full_name}
                         dataKey="value"
                         marginStyle={{top: 5, right: 30, left: 0, bottom: 5}}
                         strokeColor="#20e5f1"/>
        </div>
    )
};