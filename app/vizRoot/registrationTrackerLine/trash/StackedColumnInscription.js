import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from './HighchartInit' ;
class StackedColumnInscription extends Component {
constructor(props) {
    super(props);
    this.state={options:{},}
}

componentWillMount() {
    console.log(this.props.allinscription);
    var allinscription=0
    this.props.allinscription.map((element,i)=>{
        allinscription+=parseInt(element)
    })
    console.log(allinscription);
    this.setState({
        options:{
            chart: {
                type: 'bar',
                width: 500,
                height:200
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
                reversed: true
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
            bar: {
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
            },
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: this.props.gouv,
                data: [parseInt(this.props.inscription)],color:this.props.colorSet[4]
            },{
                name: 'other',
                data: [allinscription-this.props.inscription],color:this.props.colorSet[0]
            } ]
        }
    });
}
componentWillReceiveProps(nextProps) {
    this.setState({
        options:{
            chart: {
                type: 'bar',
                width: 300,
                height:200
            },
            title: {
                text: nextProps.charttitle
            },
            xAxis: {
                categories: nextProps.title
            },
            yAxis: {
                min: 0,
                title: {
                    text: nextProps.ytitle
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
                reversed: true
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
            bar: {
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
            },
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: nextProps.gouv,
                data: [parseInt(nextProps.inscription)],color:nextProps.colorSet[4]
            },{
                name: 'other',
                data: [parseInt(nextProps.allinscription)],color:nextProps.colorSet[0]
            } ]
        }
    });
}


    
    render() {
        return (
            <HighchartInit key={this.props.colorSet[0]+"insc"} options={this.state.options}/>
        );
    }
}

export default StackedColumnInscription;