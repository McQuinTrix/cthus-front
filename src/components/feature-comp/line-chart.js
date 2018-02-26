/**
 * Created by harshalcarpenter on 2/24/18.
 */

import React from 'react';

//-- Recharts
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class ReLineChart extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let chartWidth = this.props.width,
            chartHeight = this.props.height,
            chartData = this.props.chartData,
            marginStyle = this.props.marginStyle,
            strokeColor = this.props.strokeColor,
            dataKey = this.props.dataKey;

        return (
            <div>
                <LineChart width={chartWidth}
                           height={chartHeight}
                           data={chartData}
                           margin={marginStyle}>
                    <XAxis dataKey="name" stroke="#fff"/>
                    <YAxis domain={['dataMin', 'dataMax']} stroke="#fff"/>
                    <Tooltip/>

                    <Line type="monotone"
                          dataKey={dataKey}
                          stroke={strokeColor}
                          strokeWidth="3"
                          activeDot={{r: 8}}/>
                </LineChart>
            </div>
        )
    }
}

//<CartesianGrid strokeDasharray="3 3"/>
//<Legend stroke="#fff"/>