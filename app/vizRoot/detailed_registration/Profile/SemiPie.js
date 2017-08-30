import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;

class SemiPie extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {
        this.setState({
            options:{
                chart: {
                    type: 'pie',
                    backgroundColor: 'rgba(255, 255, 255, .4)',
                    width: 350,
                    height:250,
                    margin:0
                },
                title: {
                    text: this.props.title,
                    align: 'center',
                },
                credits:false,


            plotOptions: {
            pie: {
                     colors: ["#5895c5","#d56147"],
                    dataLabels: {
                        enabled: true,
                         distance: -20,
                        style: {
                            color: 'white'
                        },
                        formatter: function () {
                                console.log(this);
                               return (this.percentage).toFixed(2)+" %"
                            }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                innerSize: '50%',
                animation:false,
                data: [
                    ['Male', this.props.male],
                    ['Female',  this.props.female]
                ]
            }]
            }
        });
    }  

        render() {
            return (
                <div>
                <HighchartInit  options={this.state.options}  />
                </div>
            );
        }
}

export default SemiPie;