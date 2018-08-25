/**
 * Created by harshalcarpenter on 11/23/17.
 */

import React from 'react';
import { Link,browserHistory } from 'react-router';
import Logo, {smallAnim} from './load-logo';
import { connect } from "react-redux";
import { signUp, signIn,SIGN_IN,clearSignIn } from "../actions";
import PropTypes from 'prop-types';
import {userId} from './home-page.js';

import Alert from './alert-message';

class SignUp extends React.Component{
    signUpBool= true;
    pageState = "Sign In";
    otherState = "Sign Up";

    constructor(props){
        super(props);
        this.state = {
            password: "",
            email: ""
        };
        this.changeInput.bind(this);
        this.toggleState.bind(this);
    }

    checkForCookie(){
        let userIdVal = window.localStorage.getItem(userId);
        if(userIdVal && userIdVal.length > 0){
            this.props.history.push('/canvas/'+userIdVal);
        }
    }

    save(){
        if(this.state.email.length === 0 || this.state.password === 0){
            return;
        }
        if(this.signUpBool){
            this.props.signUp({
                'email':this.state.email,
                'password': this.state.password
            })
        }else{
            this.props.signIn({
                'email':this.state.email,
                'password': this.state.password
            })
        }
    }

    toggleState(){
        //Toggle Signup boolean
        this.signUpBool = !this.signUpBool;
        //Change the wordings
        this.changeState();
    }

    changeState(){
        if(this.signUpBool){
            this.pageState = "Sign Up";
            this.otherState = "Sign In";
        }else{
            this.pageState = "Sign In";
            this.otherState = "Sign Up";
        }
        this.setState(this.state);
    }

    changeInput(event){
        let val = event.target.value;

        this.setState({
            [event.target.name]: val
        })
    }

    handleKeyPress(event){
        if (event.key === 'Enter') {
            this.save();
        }
    }

    componentWillMount(){
        //Change Sign Up Bool variable to prop value
        this.signUpBool = this.props.params.id === "true";
    }

    componentDidMount(){
        //Change State --
        this.changeState();
        //Check for Cookie --
        this.checkForCookie();
    }

    componentWillReceiveProps(nextProps){
        debugger;
        let signInState = nextProps.sign[SIGN_IN];
        if( signInState && signInState.isSignedIn){

            window.localStorage.setItem(userId,signInState.data.userId);
            this.props.history.push('/canvas/'+signInState.data.userId);

        }else if(signInState && signInState.isSignedIn === false){

            this.refs.alertBox.showAlert({
                message: signInState.data.message || "Sign In Failed.",
                type: "error"
            });

            this.props.clearSignIn();
        }
    }

    render(){
        let pageState = this.pageState,
            otherState = this.otherState;

        return (
            <div className="su-box">
                <div className="su-container">
                    <div className="su-logo">
                        <Logo height={50} animStyle={smallAnim} loading=""/>
                    </div>
                    <h2>{pageState}</h2>
                    <div className="su-body">
                        <label className="su-inp-label">
                            <div className="su-inp-div">
                                Email Address
                            </div>
                            <input type="email"
                                   name="email"
                                   key="email"
                                   value={this.state.email}
                                   onChange={this.changeInput.bind(this)}
                                   className="su-inp"/>
                        </label>
                        <label className="su-inp-label">
                            <div className="su-inp-div">
                                Password
                            </div>
                            <input type="password"
                                   name="password"
                                   key="pass"
                                   value={this.state.password}
                                   onChange={this.changeInput.bind(this)}
                                   onKeyPress={this.handleKeyPress.bind(this)}
                                   className="su-inp"/>
                        </label>
                    </div>
                    <div className="su-footer">
                        <button className="su-cancel">Cancel</button>
                        <button className="su-save"
                                onClick={this.save.bind(this)}>Save</button>
                    </div>
                    <div className="su-buttons">
                        <a className="su-link" onClick={this.toggleState.bind(this)}>{otherState}</a>
                        <a className="su-link" onClick={browserHistory.goBack}>Back</a>
                    </div>
                </div>
                <Alert ref="alertBox"/>
            </div>
        );
    }
}

SignUp.propTypes = {
    signUpBool: PropTypes.bool
};

SignUp.defaultProps = {
    signUpBool: true
};

function mapStateToProps(state) {
    return {sign: state.sign}
}

export default connect(mapStateToProps, {  signUp, signIn,clearSignIn })(SignUp);