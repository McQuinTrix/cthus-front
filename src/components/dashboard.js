/**
 * Created by harshalcarpenter on 11/16/17.
 */

import React from 'react';
import { Link } from 'react-router';

class DashBoard extends React.Component{
    render(){
        return(
            <div>
                <Link to="/">Go Back </Link>
                <Link to="/logo">Logo</Link>
            </div>
        )
    }
}

export default DashBoard;