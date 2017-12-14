/**
 * Created by harshalcarpenter on 11/23/17.
 */

import React from 'react';
import { Link,browserHistory } from 'react-router';
import Logo, {smallAnim} from './load-logo';
import { connect } from "react-redux";
import { signUp } from "../actions";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pass: "",
            email: ""
        };
        this.changeInput.bind(this);
    }

    save(){
        signUp({
            'email':this.state.email,
            'password': this.state.pass
        })
    }

    changeInput(event){
        console.log(event.target.name);
        let val = this.state[event.target.name];
        this.setState({
            [event.target.name]: val+event.key
        })
    }

    render(){
        return (
            <div className="su-box">
                <div className="su-container">
                    <div className="su-logo">
                        <Logo height={50} animStyle={smallAnim} loading=""/>
                    </div>
                    <h2>Sign Up</h2>
                    <div className="su-body">
                        <label className="su-inp-label">
                            <div className="su-inp-div">
                                Email Address
                            </div>
                            <input type="email"
                                   name="email"
                                   key="email"
                                   value={this.state.email}
                                   onKeyPress={this.changeInput.bind(this)}
                                   className="su-inp"/>
                        </label>
                        <label className="su-inp-label">
                            <div className="su-inp-div">
                                Password
                            </div>
                            <input type="password"
                                   name="password"
                                   key="pass"
                                   value={this.state.pass}
                                   onKeyPress={this.changeInput.bind(this)}
                                   className="su-inp"/>
                        </label>
                    </div>
                    <div className="su-footer">
                        <button className="su-cancel">Cancel</button>
                        <button className="su-save"
                                onClick={this.save()}>Save</button>
                    </div>
                    <div className="su-buttons">
                        <Link to="/sign-in" className="su-link">Sign In</Link>
                        <a className="su-link" onClick={browserHistory.goBack}>Back</a>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {signup: state.sign}
}

export default connect(mapStateToProps, {  signUp })(SignUp);