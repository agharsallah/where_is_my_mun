import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;

class HistogramVoterProfile extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {
        //console.log(this.props.maleHistogram);
        let categories = ['18-24', '25-35', '36-50', '+50'];
        let align,maleHistogram,femaleHistogram;
        let totalNumber =this.props.maleFemaleHistogram
        //for component will mount fix
        this.props.mapClicked===true?(maleHistogram=this.props.maleHistogram,femaleHistogram=this.props.femaleHistogram,align="top")
            :(maleHistogram=[0],femaleHistogram=[0],align="middle")

        this.setState({
            options:{
                chart: {
                    type: 'bar',
                    backgroundColor: 'rgba(255, 255, 255, .4)'
                },
                title: {
                    text: this.props.clickedShapeName,
                },
                credits:false,
                subtitle: {
                    text: 'Isie'
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                console.log(this);
                                
                                let positiveNum=this.y
                                if (positiveNum<0) {
                                    positiveNum=this.y*(-1)
                                }
                                return (positiveNum);
                            }
                        }
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0)+'<br/>'+
                            'TotalNumber: '+ '</b>' +totalNumber[this.point.index]+'</b>'
                            ;
                            
                    }
                },

                series: [{
                    name: 'Male',
                    data: this.props.maleHistogram,
                    color:"#5895c5"
                }, {
                    name: 'Female',
                    data: this.props.femaleHistogram,
                    color:"#d56147"
                }]
            }
        });
    }  
        componentWillReceiveProps(nextProps) {
        console.log(nextProps.maleHistogram);
        let categories = ['18-24', '25-35', '36-50', '+50'];
        let totalNumber =nextProps.maleFemaleHistogram
        this.setState({
            options:{
                chart: {
                    type: 'bar',
                    backgroundColor: 'rgba(255, 255, 255, .4)'
                },
                title: {
                    text: nextProps.clickedShapeName+" -all ages"
                },
                subtitle: {
                    text: 'Isie'
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                console.log(this);
                                
                                let positiveNum=this.y
                                if (positiveNum<0) {
                                    positiveNum=this.y*(-1)
                                }
                                return (positiveNum);
                            }
                        }
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0)+'<br/>'+
                            'TotalNumber: '+ '</b>' +totalNumber[this.point.index]+'</b>'
                            ;
                            
                    }
                },

                series: [{
                    name: 'Male',
                    data: nextProps.maleHistogram,
                    color:"#5895c5"
                }, {
                    name: 'Female',
                    data: nextProps.femaleHistogram,
                    color:"#d56147"
                }]
            }
        });
    }  

        render() {
            return (
                <div style={{position:"absolute!important"}} >
                <HighchartInit  options={this.state.options} key={this.props.maleHistogram} styles={{height:"65vh"}}/>
                </div>
            );
        }
}

export default HistogramVoterProfile;