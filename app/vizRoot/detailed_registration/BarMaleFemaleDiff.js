import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from './HighchartInit' ;

class BarMaleFemaleDiff extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {
        console.log(this.props.maleHistogram);
        let categories = ['18-24', '25-35', '36-50', '+50'];
        this.setState({
            options:{
                chart: {
                    type: 'bar'
                },
                credits: false,
                title: {
                    text: 'Diff Chart'
                }
            }
        });
    }  

        render() {
            return (
                <div style={{position:"absolute!important"}} >
                <HighchartInit  options={this.state.options} key={this.props.maleHistogram} />
                </div>
            );
        }
}

export default BarMaleFemaleDiff;