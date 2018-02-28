/**
 * Created by harshalcarpenter on 2/24/18.
 */

import React from 'react';

//-- Recharts
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

export default class ReAreaChart extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let chartWidth = this.props.width,
            chartHeight = this.props.height,
            chartData = this.props.chartData,
            marginStyle = this.props.marginStyle,
            strokeColor = this.props.strokeColor,
            dataKey = this.props.dataKey,
            chartName = this.props.chartName;

        return (
            <div>
            <AreaChart width={chartWidth}
                       height={chartHeight}
                       data={chartData}
                       margin={marginStyle}>
                <defs>
                    <linearGradient id={`colorUv-${chartName}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={strokeColor} stopOpacity={0.3}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#fff" fontSiz/>
                <YAxis domain={['dataMin', 'dataMax']} stroke="#fff"/>
                <Tooltip />
                <Area type="monotone"
                      dataKey={dataKey}
                      stroke={strokeColor}
                      fillOpacity={1}
                      fill={`url(#colorUv-${chartName})`} />
            </AreaChart>
            </div>
        )
    }
}

//<CartesianGrid strokeDasharray="3 3"/>
//<Legend stroke="#fff"/>