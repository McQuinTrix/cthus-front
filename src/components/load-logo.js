/**
 * Created by harshalcarpenter on 11/18/17.
 */

import React from 'react';
import {TweenMax, Power3,Power2, TimelineLite, TweenLite, Linear} from "gsap";
export const homeAnim = "home-anim";
export const smallAnim = "small-anim";
import PropTypes from 'prop-types';



export default class Logo extends React.Component{
    rotate;
    constructor(props){
        super(props);
        this.state = {
            height: "300px"
        }
    }

    loadAnim() {
        let tl = new TimelineLite();

        TweenLite.to(this.cls1, 0, {rotation: 110,transformOrigin:"center center"});
        TweenLite.to(this.cls2, 0, {rotation: 106,transformOrigin:"center center"});
        TweenLite.to(this.cls3, 0, {rotation: 96,transformOrigin:"center center"});
        TweenLite.to(this.imageCover, 0, {scale:0.75,opacity: 0.75, y: -5,transformOrigin:"center center"});

        tl.to(this.imageCover, 3, {rotation:360,opacity: 1, y:0,transformOrigin:"center center", ease: Power2.easeIn},0)
            .to(this.cls1, 1.5, {rotation: 360,transformOrigin:"center center", ease: Power2.easeOut},2)
            .to(this.cls2, 1.5, {rotation: 360,transformOrigin:"center center", ease: Power2.easeOut},2)
            .to(this.cls3, 1.5, {rotation: 360,transformOrigin:"center center", ease: Power2.easeOut},2)
    }

    startRotate(){
        this.rotate.play();
        TweenLite.to(this.rotate,2,{timeScale:1});
    }

    stopRotate(){
        TweenLite.to(this.rotate,2,{timeScale:0,onComplete:function(){ this.pause() }})
    }

    componentWillMount(){

    }

    componentDidMount(){
        if(this.props.animStyle === homeAnim){
            this.loadAnim();
        }
        if(this.props.animStyle === smallAnim){
            this.rotate = new TweenMax.to(this.imageCover, .5, {rotation:"-360",transformOrigin:"center center", ease:Linear.easeNone,repeat:-1,paused:true}).timeScale(0);
            this.startRotate();
            setTimeout(()=>{
                this.stopRotate()
            },500);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.animStyle === smallAnim){
            if(nextProps.loading){
                this.startRotate();
            }
            if(nextProps.loading === false){
                this.stopRotate();
            }
        }
    }

    render(){
        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink"
                     height={this.props.height}
                     viewBox="-100 -100 609.82 630.66">
                    <defs>
                        <style>
                            {'.cls-1{fill:url(#linear-gradient);}.cls-2{fill:url(#linear-gradient-2);}.cls-3{fill:url(#linear-gradient-3);}'}
                        </style>
                        <linearGradient id="linear-gradient"
                                        x1="4.5"
                                        y1="87.83"
                                        x2="347.41"
                                        y2="87.83"
                                        gradientTransform="translate(-1 2)"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#2af6ff"/>
                            <stop offset="0.16" stopColor="#27f1fb"/>
                            <stop offset="0.34" stopColor="#20e4ef"/>
                            <stop offset="0.53" stopColor="#13cddc"/>
                            <stop offset="0.73" stopColor="#01aec1"/>
                            <stop offset="0.74" stopColor="#00acbf"/>
                            <stop offset="0.76" stopColor="#00afbf"/>
                            <stop offset="0.87" stopColor="#00b1bf"/>
                            <stop offset="0.98" stopColor="#00b1bf"/>
                            <stop offset="1" stopColor="#00b1bf"/>
                        </linearGradient>

                        <linearGradient id="linear-gradient-2"
                                        x1="419.82"
                                        y1="217.04"
                                        x2="152.05"
                                        y2="217.04"
                                        gradientTransform="translate(0 1)"
                                        xlinkHref="#linear-gradient"/>
                        <linearGradient id="linear-gradient-3"
                                        x1="61.18"
                                        y1="359.23"
                                        x2="231.81"
                                        y2="188.6"
                                        gradientTransform="translate(1)"
                                        xlinkHref="#linear-gradient"/>
                    </defs>
                    <title>Asset 1</title>
                    <g id="Layer_2" dataName="Layer 2">
                        <g id="Layer_1-2" dataName="Layer 1" ref={(b) => (this.imageCover = b)}>
                            <path className="cls-1"
                                  ref={(b) => (this.cls1 = b)}
                                  d="M301.1,21.4l-3.88-2.8c-106.29-47.77-231.18-.33-279,106A210.94,210.94,0,0,0,3.5,171.1c58.17-76,162.89-105,254-64a210,210,0,0,1,87.18,72.59A211.38,211.38,0,0,0,301.1,21.4Z"/>
                            <path className="cls-2"
                                  ref={(b) => (this.cls2 = b)}
                                  d="M341.37,45.73a211.74,211.74,0,0,0-41.26-26.1c58.71,75.57,60.12,184.21-2.6,261.89a210.36,210.36,0,0,1-145.46,77.6,210.59,210.59,0,0,0,99.82,57.34,210.15,210.15,0,0,0,121.11-74C446.19,251.79,432,118.94,341.37,45.73Z"/>
                            <path className="cls-3"
                                  ref={(b) => (this.cls3 = b)}
                                  d="M96,209.59a210,210,0,0,1,37.77-120A211.26,211.26,0,0,0,4.22,167.46,212.6,212.6,0,0,0,0,209.66c0,116.53,94.47,211,211,211a211.28,211.28,0,0,0,31.72-2.38l1.49-.23c.9-.14,1.79-.29,2.68-.45q5.64-1,11.16-2.27C165,393.21,95.78,309.43,96,209.59Z"/>
                        </g>
                    </g>
                </svg>
            </div>
        )
    }
}

Logo.propTypes = {
    animStyle: PropTypes.string,
    height: PropTypes.number
};

Logo.defaultProps = {
    animStyle: '',
    height: 300
};

/*
 <span dangerouslySetInnerHTML={{__html: this.state.svg}}></span>
 */
