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
        this.state = {
            summary: "",
            message: "",
            type: ""
        }
    }

    showAlert(obj){

        this.setState({
            summary: obj["summary"] || "",
            message: obj["message"] || "",
            type: obj["type"]
        });

        TweenMax.to(this.alertElem, 0.5, {top:0});
        setTimeout(()=>{
            TweenMax.to(this.alertElem, 0.5, {top: this.initialTop});
        },obj.time || 5000);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){

    }

    render(){
        let summary = this.state.summary || "",
            message = this.state.message || "",
            type = this.state.type || "",
            typeClass = "",
            summClass = "a-summ";


        type = type.toLowerCase();

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

        if(message.length < 1){
            typeClass = "display-none";
        }

        if(!summary){
            summClass += ' display-none';
        }

        return (
            <div className={typeClass} ref={(elem) => (this.alertElem = elem)}>
                <div className={summClass}>
                    {summary}
                </div>
                <div className="a-mess">
                    {message}
                </div>
            </div>
        );
    }
}