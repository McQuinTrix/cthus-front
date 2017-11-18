/**
 * Created by harshalcarpenter on 11/16/17.
 */

import React from 'react';
import { Link } from 'react-router-dom';

class DashBoard extends React.Component{
    render(){
        return(
            <div>
                <Link to="/">Go Back </Link>
            </div>
        )
    }
}

export default DashBoard;