/**
 * Created by harshalcarpenter on 5/23/18.
 */
import React from 'react';
import {connect} from 'react-redux';
import { confirmEmail} from '../../actions/index';

class ConfirmEmailComponent extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.confirmEmail(this.props.params.userid);
    }

    render(){
        return (
            <div>
                Your email is confirmed! Thank you!
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {sign: state.sign}
}

export default connect(mapStateToProps, {  confirmEmail })(ConfirmEmailComponent);