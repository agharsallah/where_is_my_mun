import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;
import counterpart from 'counterpart' ;

class ScatterRegVsElig extends Component {
    constructor(props) {
        super(props);
        this.state={options:{},title:counterpart.translate('ScatterReg.SCATTER_TITLE'),
        Governorate:counterpart.translate('ScatterReg.Governorate'),
        Regression:counterpart.translate('ScatterReg.Regression'),
        Ideal:counterpart.translate('ScatterReg.Ideal'),
        Male:counterpart.translate('ScatterReg.Male'),
        Female:counterpart.translate('ScatterReg.Female'),
        Eligible:counterpart.translate('ScatterReg.Eligible'),
        Registered:counterpart.translate('ScatterReg.Registered'),
    }
    }
      
    localeChanged(options,newLocale) {
        this.setState({
        title: counterpart.translate('ScatterReg.SCATTER_TITLE'),Governorate:counterpart.translate('ScatterReg.Governorate'),
        Regression:counterpart.translate('ScatterReg.Regression'),Ideal:counterpart.translate('ScatterReg.Ideal'),
        Male:counterpart.translate('ScatterReg.Male'),Female:counterpart.translate('ScatterReg.Female'),
        Eligible:counterpart.translate('ScatterReg.Eligible'),Registered:counterpart.translate('ScatterReg.Registered')
        });
    }

    componentWillMount() {

        let govName= this.props.govName;
        //console.log(nextProps.regressionRegElg);
        let regression0=this.props.regressionRegElg.equation[0],regression1=this.props.regressionRegElg.equation[1]

        var xf = 450000, 
            yf = regression0*xf + regression1;
            var x0 = 25000,y0 = regression0*x0 + regression1;
            var xf = 850000,yf = regression0*xf + regression1;
           var dataSeries= [
                {name: this.state.Governorate,color: 'black', data: this.props.allElgReg},
                {type: 'line',name: this.state.Regression,data: [[x0, y0], [xf, yf]],marker: {enabled:false},states: {hover: {lineWidth: 0}}, enableMouseTracking: false},
                {type: 'line',color:"orange",name: this.state.Ideal,data: [[x0, x0], [xf, xf]],marker: {enabled:false},states: {hover: {lineWidth: 0}}, enableMouseTracking: false}

           ]
        
        var options={
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                backgroundColor: 'rgba(255, 255, 255, .6)'
            },
            credits: false,
            title: {
                text: counterpart.translate('ScatterReg.SCATTER_TITLE')
            },
            subtitle: {
                text: 'Source: ISIE - INS'
            },
            yAxis: {
                title: {
                    enabled: true,
                    text: this.state.Registered
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            xAxis: {
                title: {
                    text: this.state.Eligible
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: true
                            }
                        }
                    },
                }
            },
            series: dataSeries,
                        tooltip: {
                        style:{"z-index":"555"},
                        useHTML: true,
                        formatter: function() {
                            //formating date
                            let govNames=govName[this.point.index]
                            //console.log("govName",govName);
                            return '<b>'+this.series.name+' - '+govNames+'</b><br/><br/><p> Eligible : <b>'+this.point.x+'</b><p/> <p> Registered : <b>'+this.point.y+'</b><p/> '
                        }   
                    }
        }
        this.setState({
            options:options
        });
        //counterpart.onLocaleChange(this.localeChanged.bind(this,options));

    }

/*     componentWillUnmount() {
        console.log('unmounted');
        counterpart.offLocaleChange(this.localeChanged.bind(this));
    } */

    componentWillReceiveProps(nextProps) {

         let govName= nextProps.govName;
        //console.log(nextProps.regressionRegElg);
        let regression0=nextProps.regressionRegElg.equation[0],regression1=nextProps.regressionRegElg.equation[1]
        //console.log(regression0,regression1);
        // get the max and min values of x, and calculate 
        // the corresponding y value using that x, m, and b
        
        if (nextProps.genderFilter=="Male") {
            var x0 = 25000,y0 = regression0*x0 + regression1;
            var xf = 450000,yf = regression0*xf + regression1;
            var title="Registered Versus Eligible by Gender"
            var dataSeries= [
                {name: this.state.Male ,color: 'rgba(119, 152, 191, .5)',data: nextProps.femaleElgReg},
                {type: 'line',name: this.state.Regression ,data: [[x0, y0], [xf, yf]],marker: {enabled:false},states: {hover: {lineWidth: 0}}, enableMouseTracking: false},
                {type: 'line',color:"orange",name: this.state.Ideal,data: [[x0, x0], [xf, xf]],marker: {enabled:false},states: {hover: {lineWidth: 0}}, enableMouseTracking: false}
            ]
        }else if (nextProps.genderFilter=="Female"){
            var x0 = 25000,y0 = regression0*x0 + regression1;
            var xf = 450000,yf = regression0*xf + regression1;
            var title="Registered Versus Eligible by Gender"
            var dataSeries= [
                {name: this.state.Female ,color: 'rgba(223, 83, 83, .5)', data: nextProps.menElgReg},
                {type: 'line',name: this.state.Regression ,data: [[x0, y0], [xf, yf]],marker: {enabled:false},states: {hover: {lineWidth: 0}}, enableMouseTracking: false},
                {type: 'line',color:"orange",name: this.state.Ideal ,data: [[x0, x0], [xf, xf]],marker: {enabled:false},states: {hover: {lineWidth: 0}}, enableMouseTracking: false}
            ] 
        }
        else{
            var x0 = 25000,y0 = regression0*x0 + regression1;
            var xf = 850000,yf = regression0*xf + regression1;
           var title="Registered Versus Eligible"
           var dataSeries= [
                {name: this.state.Governorate,color: 'black', data: nextProps.allElgReg},
                {type: 'line',name: this.state.Regression,data: [[x0, y0], [xf, yf]],marker: {enabled:false},states: {hover: {lineWidth: 0}}, enableMouseTracking: false},
                {type: 'line',color:"orange",name: this.state.Ideal ,data: [[x0, x0], [xf, xf]],marker: {enabled:false},states: {hover: {lineWidth: 0}}, enableMouseTracking: false}

           ]
        }
        
        let options={
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                backgroundColor: 'rgba(255, 255, 255, .4)'
            },
            credits: false,
            title: {
                text: this.state.title
            },
            subtitle: {
                text: 'Source: ISIE - INS'
            },
            yAxis: {
                title: {
                    enabled: true,
                    text: this.state.Registered
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            xAxis: {
                title: {
                    text: this.state.Eligible
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: true
                            }
                        }
                    },
                }
            },
            series: dataSeries,
                        tooltip: {
                        style:{"z-index":"555"},
                        useHTML: true,
                        formatter: function() {
                            //formating date
                            let govNames=govName[this.point.index]
                            //console.log("govName",govName);
                            return '<b>'+this.series.name+' - '+govNames+'</b><br/><br/><p> Eligible : <b>'+this.point.x+'</b><p/> <p> Registered : <b>'+this.point.y+'</b><p/> '
                        }   
                    }
        }
        
        this.setState({
            options:options
        });
       //counterpart.onLocaleChange(this.localeChanged.bind(this)); 
        
    }
     
        render() {
            return (
                <div style={{position:"absolute!important"}} >
                <HighchartInit  options={this.state.options} styles={{height:"65vh"}} key={this.props.genderFilter+this.state.title} />
                </div>
            );
        }
}

export default ScatterRegVsElig;