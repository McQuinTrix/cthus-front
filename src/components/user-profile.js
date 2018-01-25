/**
 * Created by harshalcarpenter on 1/21/18.
 */

import React from 'react';
import { connect } from "react-redux";
import { updateUser } from "../actions";
import { PORT_GET,PORT_UPDATE } from "../actions/index";

//User Profile
class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            fname: "",
            lname: ""
        }
    }

    updateChange(event,name){
        let obj = {};
        obj[name] = event.target.value;
        this.setState(obj);
    }

    updateUser(){

    }

    getUser(){

    }

    componentWillMount(){

    }

    render(){
        let hideShow = '',
            fName = this.state.fname,
            lName = this.state.lname;

        return (
            <div className={hideShow}>
                <h2>User Profile</h2>
                <div className="user-profile">
                    <div className="input-cover">
                        <input className="input-large"
                               value={fName}
                               onChange={(e)=>{this.updateChange(e,'fName')}}
                               placeholder="Enter First Name ..."/>
                    </div>
                    <div className="input-cover">
                        <input className="input-large"
                               value={lName}
                               onChange={(e)=>{this.updateChange(e,'lName')}}
                               placeholder="Enter Last Name ..."/>
                    </div>
                    <button className="button-active-large">
                        <i className="fa fa-floppy-o"></i> Save
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //return {sign: state.sign}
    return {

    }
}

export default connect(mapStateToProps, { updateUser })(UserProfile);