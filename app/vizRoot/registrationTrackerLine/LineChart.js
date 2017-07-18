import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from './HighchartInit' ;
import regression from 'regression';

import './box-css.css';

class LineChart extends Component {
constructor(props) {
    super(props);
    this.state={options:{}}
}

componentWillMount() {
    //console.log(this.props.preRegression);
    let detailedDays = this.props.detailedDays,increaseDecrease=this.props.increaseDecrease,subject=this.props.subj
    //calculation regression arary
    console.log("aaaaaaaa",this.props.preRegression);
    let regression0=this.props.preRegression.equation[0],regression1=this.props.preRegression.equation[1]
    // create array of x values
    var xs = [];
    (this.props.inscription).forEach(function(d){
        console.log(d);
        xs.push(d);
    });
    console.log(xs);
    // get the max and min values of x, and calculate 
    // the corresponding y value using that x, m, and b
    var x0 = 0, 
        y0 = regression0*x0 + regression1;
    var xf = 26, 
        yf = regression0*xf + regression1;
    console.log(x0,y0);
    console.log(xf,yf);
    this.setState({
        options:{
            chart: {
                type: 'line',
                height:480
            
            },
            credits: false,
            title: {
                text: 'Daily '+ this.props.subj +' Number <br/> Municipal Election'
            },
            subtitle: {
                text: 'Source: ISIE.tn'
            },
            xAxis: {
                text: 'Number of '+this.props.subj,
                categories: this.props.dates,
            },
            yAxis: {
                title: {
                    text: 'Number of '+ this.props.subj 
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                         format: "{point.y:.0f}"
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: this.props.subj +' number',
                data: this.props.inscription,
            },{
        type: 'line',
        name: 'Regression Line',
        data: [[x0, y0], [xf, yf]],
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }],
                        tooltip:{
                useHTML: true,
                formatter: function() {
                    //formating date
                    let dat=(this.x).split("-")
                    //prepare the color of days
                    let dayString=detailedDays[this.point.index],incDcr=increaseDecrease[this.point.index] ,colored_day,state,statePercentage,image;
                    (dayString=="Saturday"||dayString=="Sunday") ? (colored_day='The value for <b style="color:red">' + detailedDays[this.point.index]+ '</b> '):(colored_day='The value for <b style="color:blue">' + detailedDays[this.point.index]+ '</b>')
                    //adding image to increase decrease
                    //incDcr.includes("increase") ? (incDcr=incDcr.replace("increase with", ""),image ="<img height='50px' src='/img/profits.svg'/>" ):(incDcr=incDcr.replace("decrease with", ""),image ="<img height='50px' src='/img/loss.svg'/>" )
                    console.log(this);

                return '<span style="color:' + this.series.color + '">\u25CF</span> ' + colored_day +' '+dat[0]+'-'+dat[1]+' is : <h5 style="text-align:center"><b>' + this.y + '</b><h5/>'+'<div><h5>'+incDcr
    }   
            }
        }   
    });
}
componentWillReceiveProps(nextProps) {
    this.setState({
        options:{
            chart: {
                type: 'line',
                 height:480
            },
            title: {
                text: 'Daily '+ nextProps.subj +' Number <br/> Municipal Election'
            },
            subtitle: {
                text: 'Source: ISIE.tn'
            },
            xAxis: {
                categories: nextProps.dates,
            },
            yAxis: {
                title: {
                    text: 'Number of '+nextProps.subj
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                        format: "{point.y:.0f}"
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: nextProps.subj +' number',
                data: nextProps.inscription
            }]
        }   
    });
}

    render() {
        //percentage of reg/update male and female
        let malePercentage,femalePercentage
        malePercentage=((Number(this.props.maleReg)*100)/Number(this.props.sumReg)).toFixed(2)
        femalePercentage=((Number(this.props.femaleReg)*100)/Number(this.props.sumReg)).toFixed(2)
        return (
            <div className="container_row">
                <div className={"backwardedChart col-md-12"} >
                <HighchartInit key={this.props.chartkey+this.props.inscription}  options={this.state.options}/>
                </div>

                <div className="cardinfo card-1 centerbox" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem",marginLeft:"5rem"}}>
                    Total {this.props.subj}<br/>
                    <img className="centerimg" style={{height:"30px"}} src="/img/sum.svg" />
                    <p className="maleFemaleNumText">{this.props.sumReg}</p>
                </div>
                <div className="cardinfo card-1 centerbox" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem",marginLeft:"21rem"}}>
                    Female {this.props.subj}<br/>
                    <img className="centerimg" style={{height:"30px"}} src="/img/woman.svg" />
                    <p className="maleFemaleNumText">{this.props.femaleReg} - {isNaN(femalePercentage)?"0":femalePercentage} %</p>
                </div>
                
                <div className="cardinfo card-1 centerbox" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem",marginLeft:"39rem"}}>
                    Male {this.props.subj}<br/>
                    <img className="centerimg" style={{height:"30px"}} src="/img/man.svg" />
                    <p className="maleFemaleNumText">{this.props.maleReg} - { isNaN(malePercentage)?"0":malePercentage} %</p>
                </div>
            </div>
        );
    }
}

export default LineChart;