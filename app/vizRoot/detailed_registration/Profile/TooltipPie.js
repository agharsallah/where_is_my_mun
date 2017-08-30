import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;
import counterpart from 'counterpart' ;

class TooltipPie extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {
        console.log("allreg",this.props.allReg);
        console.log("registeredTranche",this.props.registeredTranche);
        let allReg=this.props.allReg,registeredTranche=this.props.registeredTranche;
        let sliceColor;
    if (this.props.chosenAge=="18-24") {sliceColor="#97c6e2 "}else if (this.props.chosenAge=="25-35")
    {sliceColor="#9dd59f"}else if (this.props.chosenAge=="36-50") {sliceColor="#9dd59f"}else{sliceColor="#fcaf8a"}
        this.setState({
            options:{
                chart: {
                    type: 'bar',
                    backgroundColor: 'rgba(255, 255, 255, .4)',
                    width: 350,
                    height:300,                },
                title: {
                    text: this.props.title+" "+this.props.chosenAge ,
                    align: 'center',
                },
                credits:false,


            plotOptions: {
            pie: {
                     colors: [sliceColor,"#7f7f7f"],
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: 'white'
                        },
                        distance: -10,
                        formatter: function () {
                            console.log(this);
                               return (this.percentage).toFixed(2)+" %"
                            }
                    },
                    showInLegend: true
                }
            },
            series: [{
                animation:false,
                type: 'pie',
                innerSize: '50%',
                animation:false,
                data: [
                            {name:counterpart.translate('TooltipPie.registerd') +this.props.chosenAge+" Tranche", y:registeredTranche,selected:true,sliced:true},
                            {name:counterpart.translate('TooltipPie.otherReg'), y:allReg-registeredTranche}
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

export default TooltipPie;