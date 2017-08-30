import React, { Component } from 'react';
var Highcharts = require('highcharts');

class HighchartInit extends Component {
componentDidMount() {
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.refs.chart,
            this.props.options
        );
    }
    componentWillUnmount() {
        this.chart.destroy();
    }
    
    render() {
        
        return (
            <div ref="chart" style={this.props.styles}/>
        );
    }
}

export default HighchartInit;