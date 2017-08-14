import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from './HighchartInit' ;
import counterpart  from 'counterpart';

import './box-css.css';

class LineChart extends Component {
constructor(props) {
    super(props);
    this.state={options:{}}
}

componentWillMount() {
    let detailedDays = this.props.detailedDays,increaseDecrease=this.props.increaseDecrease,subject=this.props.subj
    let regression0=this.props.preRegression.equation[0],regression1=this.props.preRegression.equation[1]
    // create array of x values
    var xs = [];
    (this.props.inscription).forEach(function(d){
        //console.log(d);
        xs.push(d);
    });
    // get the max and min values of x, and calculate 
    // the corresponding y value using that x, m, and b
    var x0 = 0, 
        y0 = regression0*x0 + regression1;
    var xf = (xs.length)-1, 
        yf = regression0*xf + regression1;
    //Calculating average
    this.setState({
        options:{
            chart: {
                type: 'line',
            },
            credits: false,
            title: {
                text: counterpart.translate('LineChart.TitleDaily')+ this.props.subj +counterpart.translate('LineChart.TitleNumber')
            },
            subtitle: {
                text: counterpart.translate('LineChart.source')
            },
            xAxis: {
                text: 'Number of '+this.props.subj,
                categories: this.props.dates,
            },
            yAxis: {
                title: {
                    text: counterpart.translate('LineChart.numberOf') + this.props.subj 
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
                name: counterpart.translate('LineChart.numberOf')+this.props.subj ,
                data: this.props.inscription,
                    },{
                type: 'line',
                name: counterpart.translate('LineChart.regression'),
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
                    (dayString=="Saturday"||dayString=="Sunday"||dayString=="Samedi"||dayString=="Dimanche") ? (colored_day='The value for <b style="color:red">' + detailedDays[this.point.index]+ '</b> '):(colored_day=counterpart.translate('LineChart.valuefor') + detailedDays[this.point.index]+ '</b>')
                    //adding image to increase decrease
                    //incDcr.includes("increase") ? (incDcr=incDcr.replace("increase with", ""),image ="<img height='50px' src='/img/profits.svg'/>" ):(incDcr=incDcr.replace("decrease with", ""),image ="<img height='50px' src='/img/loss.svg'/>" )
                    //console.log(this);
                    return '<span style="color:' + this.series.color + '">\u25CF</span> ' + colored_day +' '+dat[0]+'-'+dat[1]+' is : <h5 style="text-align:center"><b>' + this.y +' '+subject +'</b><h5/>'+'<div><h5>'+incDcr
                }   
            }
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
                <div className={"backwardedChart col-md-12"} style={{marginTop:"2rem"}} >
                <HighchartInit key={this.props.chartkey+this.props.inscription}  options={this.state.options}/>
                </div>
                <div className="col-md-12">
                <div className="cardinfo card-1 centerbox col-md-2" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem"}}>
                    <div className="col-md-12">
                        Total {this.props.subj}<br/>
                        <img className="centerimg" style={{height:"30px"}} src="/img/sum.svg" />
                        <p className="maleFemaleNumText">{this.props.sumReg.toLocaleString()}</p>
                    </div>
                </div>

                <div className="cardinfo card-1 centerbox col-md-2" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem"}}>
                    <div className="col-md-12">
                        Female {this.props.subj}<br/>
                        <img className="centerimg" style={{height:"30px"}} src="/img/woman.svg" />
                        <p className="maleFemaleNumText">{this.props.femaleReg.toLocaleString()} - {isNaN(femalePercentage)?"0":femalePercentage} %</p>
                    </div>
                </div>
                
                 <div className="cardinfo card-1 centerbox col-md-2" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem"}}>
                    <div className="col-md-12">
                        Male {this.props.subj}<br/>
                        <img className="centerimg" style={{height:"30px"}} src="/img/man.svg" />
                        <p className="maleFemaleNumText">{this.props.maleReg.toLocaleString()} - { isNaN(malePercentage)?"0":malePercentage} %</p>
                    </div>
                </div>
                
                <div className="cardinfo card-1 centerbox col-md-2" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem"}}>
                    <div className="col-md-12">
                        average {this.props.subj}<br/>
                        <img className="centerimg" style={{height:"30px"}} src="/img/average.PNG" />
                        <p className="maleFemaleNumText">{this.props.averageVal.toLocaleString()} per day</p>
                    </div>
                </div>

                <div className="cardinfo card-1 centerbox col-md-2" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem"}}>
                    <div className="col-md-12">
                        Highest {this.props.subj} <br/>
                        <img className="centerimg" style={{height:"30px"}} src="/img/increaseArrow.svg" />
                        <p className="maleFemaleNumText">{this.props.highest.toLocaleString()} </p>
                    </div>
                </div>

                <div className="cardinfo card-1 centerbox col-md-2" style={{position:"absolute !important",zIndex: 2,marginTop:"-10rem"}}>
                    <div className="col-md-12">
                        Lowest {this.props.subj} <br/>
                        <img className="centerimg" style={{height:"30px"}} src="/img/decreaseArrow.svg" />
                        <p className="maleFemaleNumText">{this.props.lowest.toLocaleString()} </p>
                    </div>
                </div> 
            </div>

            </div>
        );
    }
}

export default LineChart;