/**
 * Created by harshalcarpenter on 5/26/18.
 */

import React from 'react';

export const CoinAmount = (props) => {
    let coin = props.coin,
        coinTotal = coin.amount,
        coinAmt = ((+coin.currVal) * coinTotal).toFixed(2).toLocaleString()
    return (
        <div className="coin-amount">
            <div className="coin-total">
                {coinTotal}
            </div>
            <div className="coin-fiat">
                <span className="coin-amt">
                    $ {coinAmt}
                </span>
            </div>
        </div>
    );
};