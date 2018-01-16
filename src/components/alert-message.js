/**
 * Created by harshalcarpenter on 1/7/18.
 */

import React from 'react';

class Alert extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let summ = this.props.summ,
            mess = this.props.mess;
        return (
            <div className="alert-mess">
                <div className="a-summ">
                    {summ}
                </div>
                <div className="a-mess">
                    {mess}
                </div>
            </div>
        );
    }
}