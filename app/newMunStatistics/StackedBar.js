import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from './HighchartInit' ;
class StackedBar extends Component {
constructor(props) {
    super(props);
    this.state={title:"[apple]"}
}

componentWillMount() {
    var allpop=this.props.allpop;
    this.setState({
        options:{
            chart: {
                type: 'column',
                width: 300,
                height:250
            },
            title: {
                text: this.props.charttitle
            },
            xAxis: {
                categories: this.props.title
            },
            yAxis: {
                min: 0,
                title: {
                    text: this.props.ytitle
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            credits: false,
            legend: {
                align: 'right',
                x: 5,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}'+this.props.spec+'<br/>Total: {point.stackTotal}'+this.props.spec
            },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    dataLabels: {
                        enabled: true,
                        formatter:function() {
                            var pcnt = (this.y / allpop) * 100;
                            return Highcharts.numberFormat(pcnt) + '%';
                        },
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                name: 'Extended',
                data: [this.props.extpop]
            }, {
                name: 'Old',
                data: [this.props.oldpop]
            }, {
                name: 'New',
                data: [this.props.newpop]
            }]
        }
    });
}
componentWillReceiveProps(nextProps) {
    
}


    
    render() {
        return (
            <HighchartInit options={this.state.options}/>
        );
    }
}

export default StackedBar;