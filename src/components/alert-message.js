/**
 * Created by harshalcarpenter on 1/7/18.
 */

import React from 'react';

export default class Alert extends React.Component{
    constructor(props){
        super(props);
        debugger;
    }

    render(){
        let summ = this.props.summ,
            mess = this.props.mess,
            type = this.props.type.toLowerCase(),
            typeClass = "";

        switch(type){
            case "error":
                typeClass = "error-class";
                break;
            case "warn":
                typeClass = "warn-class";
                break;
            case "update":
                typeClass = "update-class";
                break;
            case "success":
                typeClass = "success-class";
                break;
            default:
                typeClass = "update-class";
                break;
        }

        typeClass += " alert-mess";

        return (
            <div className={typeClass}>
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