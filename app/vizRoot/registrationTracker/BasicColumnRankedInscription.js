import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from './HighchartInit' ;
class BasicColumnRankedInscription extends Component {
constructor(props) {
    super(props);
    this.state={options:{}}
}

componentWillMount() {
    var gouvNameArray=["Kasserine", "SidiBouzid", "Nabeul 2", "Tunis 1", "Medenine", "Kairouan", "Sousse", "Nabeul 1", "Bizerte", "Sfax 1", "Mahdia", "Monastir", "Jendouba", "Sfax 2", "Manouba", "BenArous", "Ariana", "Siliana", "Gabes", "Tozeur", "Beja", "Zaghouan", "Kebili", "LeKef", "Tunis 2", "Tataouine", "Gafsa"],
    inscriptionArray=[7487, 7083, 5272, 5181, 4711, 4705, 4660, 4377, 4323, 4173, 4098, 4076, 3875, 3441, 3322, 3194, 3165, 3101, 3079, 2952, 2937, 2738, 2666, 2181, 1714, 1675, 1430]

    this.setState({
        options:{
    chart: {
        type: 'column',
        backgroundColor: 'rgba(255, 255, 255, .4)',
    },
    credits: false,
    title: {
        text: this.props.title
    },
    subtitle: {
        text: '06-07-2017'
    },
    xAxis: {
        categories:gouvNameArray,
        crosshair: true,
                labels: {
            rotation: -45,
            style: {
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Registration number'
        }
    },
    tooltip: {
        headerFormat: '<h3>{point.key}: </h3>',
        pointFormat:'<b>{point.y}</b> Inscription',
    },
    plotOptions: {
        column: {
            dataLabels: {
                        enabled: false},
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        showInLegend: false,
        name: 'Tokyo',
        data: inscriptionArray,
        /*dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif'
            }
        }*/
    }]
}
    });
}
componentWillReceiveProps(nextProps) {
        var inscriptionArray=[],gouvNameArray=[]
    nextProps.allInscription.map((element,i)=>{
        inscriptionArray.push(element.value)
        gouvNameArray.push(element.gouv)
    })
    console.log("inscriptionArray",inscriptionArray);
    console.log("gouvNameArray",gouvNameArray);
    this.setState({
               options:{
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: gouvNameArray,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Tokyo',
        data: inscriptionArray

    }]
}
            })
            }


    
    render() {
        return (
            <HighchartInit key={"insc"} options={this.state.options}/>
        );
    }
}

export default BasicColumnRankedInscription;