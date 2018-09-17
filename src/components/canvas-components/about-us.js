/**
 * Created by harshalcarpenter on 5/17/18.
 */
import React from 'react';

//About Us
class AboutUs extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>About Us</h1>
                <div className="au-container">
                    <u>Cryptonthus</u> is a crypto-assets portfolio application with news updates(from reddit communities).
                </div>
            </div>
        );
    }
}

export default AboutUs;