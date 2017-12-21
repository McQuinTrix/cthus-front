/**
 * Created by harshalcarpenter on 12/19/17.
 */

import React from 'react';
import Logo, {smallAnim} from './load-logo';
import { connect } from "react-redux";

class Canvas extends React.Component{
    constructor(props){
        super(props);
    }

    //Render
    render(){
        return (
            <div className="canvas-container">
                <div className="canvas-body">
                    {/*** Menu Button ***/}
                    <div className="canvas-menu-button">
                        <i className="fa fa-bars"></i>
                    </div>
                    {/* Top Icon */}
                    <div className="canvas-top-icon">
                        <Logo height={50}/>
                    </div>
                    <div className="dashboard">

                    </div>
                    <div className="other-pages">

                    </div>
                </div>
                <div className="canvas-menu">

                </div>
            </div>
        );
    }
}

Canvas.propTypes = {
    //signUpBool: PropTypes.bool
};

Canvas.defaultProps = {
    //signUpBool: true
};

function mapStateToProps(state) {
    //return {sign: state.sign}
    return {}
}

export default connect(mapStateToProps, { })(Canvas);