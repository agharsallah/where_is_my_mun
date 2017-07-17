import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from './HighchartInit' ;
import './box-css.css';

class LineChart extends Component {
constructor(props) {
    super(props);
    this.state={options:{}}
}

componentWillMount() {
    console.log(this.props.dates);
    this.setState({
        options:{
            chart: {
                type: 'line',
                height:500
            
            },
            credits: false,
            title: {
                text: 'Daily Registration Number'
            },
            subtitle: {
                text: 'Source: ISIE.tn'
            },
            xAxis: {
                categories: this.props.dates,
            },
            yAxis: {
                title: {
                    text: 'Number of Registrations'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Registration over time',
                data: this.props.inscription
            }]
        }   
    });
}
componentWillReceiveProps(nextProps) {
    this.setState({
        options:{
            chart: {
                type: 'line'
            },
            title: {
                text: 'Daily Registration Number <br/> Municipal Election'
            },
            subtitle: {
                text: 'Source: ISIE.tn'
            },
            xAxis: {
                categories: nextProps.dates,
            },
            yAxis: {
                title: {
                    text: 'Number of Registrations'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Registration over time',
                data: nextProps.inscription
            }]
        }   
    });
}

    render() {
        return (
            <div className="container_row">
                <div className={"backwardedChart col-md-12"} >
                <HighchartInit key={this.props.chartkey}  options={this.state.options}/>
                </div>
                <div className="cardinfo card-1 centerbox" style={{position:"absolute !important",zIndex: 2,marginTop:"-1vh",marginLeft:"15vw",width:"12vw"}}>
                    Total Registration<br/>
                    <img className="centerimg" style={{height:"30px"}} src="/img/sum.svg" />
                    <p>{this.props.maleReg}</p>
                </div>
                
                <div className="cardinfo card-1 centerbox" style={{position:"absolute !important",zIndex: 2,marginTop:"-1vh",marginLeft:"49vw",width:"11vw !important"}}>
                    Female Registration<br/>
                    <img className="centerimg" style={{height:"30px"}} src="/img/woman.svg" />
                    <p>{this.props.femaleReg}</p>
                </div>
                
                <div className="cardinfo card-1 centerbox" style={{position:"absolute !important",zIndex: 2,marginTop:"-1vh",marginLeft:"62vw",width:"11vw"}}>
                    Male registration<br/>
                    <img className="centerimg" style={{height:"30px"}} src="/img/man.svg" />
                    <p>{this.props.sumReg}</p>
                </div>
            </div>
        );
    }
}

export default LineChart;