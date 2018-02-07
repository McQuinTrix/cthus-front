/**
 * Created by harshalcarpenter on 1/7/18.
 */

import React from 'react';
import {TweenMax} from "gsap";

export default class Alert extends React.Component{

    //Alert Element
    alertElem;
    //top initial for alert elem
    initialTop = "-60px";

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        TweenMax.to(this.alertElem, 0.5, {top:0});
        setTimeout(()=>{
            TweenMax.to(this.alertElem, 0.5, {top: this.initialTop});
        },nextProps.time || 5000);
    }

    render(){
        let summ = this.props.summ,
            mess = this.props.mess,
            type = this.props.type.toLowerCase(),
            typeClass = "",
            summClass = "a-summ";

        if(mess){}

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

        if(summ){
            summClass += ' display-none';
        }

        return (
            <div className={typeClass} ref={(elem) => (this.alertElem = elem)}>
                <div className={summClass}>
                    {summ}
                </div>
                <div className="a-mess">
                    {mess}
                </div>
            </div>
        );
    }
}