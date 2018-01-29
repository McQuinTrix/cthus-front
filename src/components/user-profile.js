/**
 * Created by harshalcarpenter on 1/21/18.
 */

import React from 'react';
import { connect } from "react-redux";
import { updateUser, getUser } from "../actions";
import { PORT_GET, UPDATE_USERINFO, USER_INFO } from "../actions/index";

//User Profile
class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: ""
        };
        this.getUserInfo.bind(this);
    }

    toUpdateFromAPI = false;

    updateUser(){
        this.props.updateUser(this.props.userId,{
            fname: this.state.fname,
            lname: this.state.lname
        });
        this.toUpdateFromAPI = true;
    }

    getUserInfo(){
        this.props.getUser(this.props.userId);
    }

    handleChange(event,type){
        let obj = {};
        obj[type] = event.target.value;
        this.setState(obj);
    }

    componentWillMount(){
        this.getUserInfo();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.sign.hasOwnProperty(USER_INFO) && !this.toUpdateFromAPI){
            let result = nextProps.sign[USER_INFO].result;
            this.setState({
                fname: result.fname,
                lname: result.lname
            })
        }
        if(nextProps.sign.hasOwnProperty(UPDATE_USERINFO) && this.toUpdateFromAPI){
            this.getUserInfo();
            this.toUpdateFromAPI = false;
        }
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
                        <input className="input-large input-white-back"
                               value={fName}
                               onChange={(e)=>{this.handleChange(e,'fname')}}
                               placeholder="Enter First Name ..."/>
                    </div>
                    <div className="input-cover">
                        <input className="input-large input-white-back"
                               value={lName}
                               onChange={(e)=>{this.handleChange(e,'lname')}}
                               placeholder="Enter Last Name ..."/>
                    </div>
                    <button className="button-active-large"
                            onClick={this.updateUser.bind(this)}>
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
        sign: state.sign
    }
}

export default connect(mapStateToProps, { updateUser, getUser })(UserProfile);