/**
 * Created by harshalcarpenter on 11/23/17.
 */

import React from 'react';
import { Link } from 'react-router';

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="su-box">
                <div className="su-container">
                    <h3>Sign Up</h3>
                    <div className="su-body">
                        <input type="email" name="email" />
                        <input type="password" name="password"/>
                        <input type="password" name="confirm-password"/>
                    </div>
                    <div className="su-footer">
                        <button>Cancel</button>
                        <button>Save</button>
                    </div>
                </div>
                <Link to="/sign-in" >Sign In</Link>
                <Link to="/">Back</Link>
            </div>
        );
    }
}