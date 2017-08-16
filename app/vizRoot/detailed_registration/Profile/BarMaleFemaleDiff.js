import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;
import counterpart from 'counterpart' ;

class BarMaleFemaleDiff extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {
        let gouvNameArray=[],diffArray=[]
        if (this.props.title=="18-24") {
            gouvNameArray=["Tunis", "Bizerte", "Nabeul", "Ariana", "Monastir", "Ben Arous", "Jendouba", "Gabes", "Kasserine", "Zaghouan", "Beja", "Sidi Bouzid", "Gafsa", "Kebili", "Kairouan", "Le Kef", "Mahdia", "Sousse", "Manouba", "Siliana", "Sfax", "Medenine", "Tataouine", "Tozeur"]
            diffArray=[ {y:1956,color:"#d56147"}, {y:1837,color:"#d56147"}, {y:1805,color:"#d56147"}, {y:1217,color:"#d56147"}, {y:1198,color:"#d56147"}, {y:944,color:"#d56147"}, {y:760,color:"#d56147"}, {y:756,color:"#d56147"}, {y:724,color:"#5895c5"}, {y:621,color:"#d56147"}, {y:613,color:"#d56147"}, {y:577,color:"#5895c5"}, {y:552,color:"#5895c5"}, {y:532,color:"#d56147"}, {y:499,color:"#5895c5"}, {y:466,color:"#d56147"}, {y:456,color:"#d56147"}, {y:456,color:"#d56147"}, {y:433,color:"#d56147"}, {y:192,color:"#d56147"}, {y:172,color:"#5895c5"}, {y:92,color:"#5895c5"}, {y:45,color:"#d56147"}, {y:11,color:"#5895c5"}]
        }else if(this.props.title=="25-35"){
            gouvNameArray=["Tunis", "Gabes", "Ariana", "Ben Arous", "Monastir", "Bizerte", "Medenine", "Manouba", "Kebili", "Sousse", "Sfax", "Nabeul", "Jendouba", "Tataouine", "Beja", "Le Kef", "Tozeur", "Kasserine", "Sidi Bouzid", "Kairouan", "Gafsa", "Zaghouan", "Siliana", "Mahdia"]
            diffArray=[ {y:8258, color:"#d56147"}, {y:5669, color:"#d56147"}, {y:4441, color:"#d56147"}, {y:4429, color:"#d56147"}, {y:4385, color:"#d56147"}, {y:4182, color:"#d56147"}, {y:3555, color:"#d56147"}, {y:3213, color:"#d56147"}, {y:2915, color:"#d56147"}, {y:2896, color:"#d56147"}, {y:2655, color:"#5895c5"}, {y:2427, color:"#d56147"}, {y:1770, color:"#d56147"}, {y:1362, color:"#d56147"}, {y:1294, color:"#d56147"}, {y:1103, color:"#d56147"}, {y:1072, color:"#d56147"}, {y:903, color:"#5895c5"}, {y:817, color:"#5895c5"}, {y:660, color:"#5895c5"}, {y:588, color:"#d56147"}, {y:431, color:"#d56147"}, {y:323, color:"#d56147"}, {y:181, color:"#d56147"}]
        }else if(this.props.title=="36-50") {
           gouvNameArray=["Sfax", "Kairouan", "Nabeul", "Sousse", "Medenine", "Sidi Bouzid", "Kasserine", "Mahdia", "Jendouba", "Bizerte", "Gafsa", "Ariana", "Siliana", "Monastir", "Beja", "Ben Arous", "Zaghouan", "Manouba", "Le Kef", "Kebili", "Gabes", "Tozeur", "Tataouine", "Tunis"]
           diffArray= [ {y:14775,color:"#5895c5"}, {y:8424,color:"#5895c5"}, {y:7811,color:"#5895c5"}, {y:6182,color:"#5895c5"}, {y:5346,color:"#5895c5"}, {y:4767,color:"#5895c5"}, {y:4702,color:"#5895c5"}, {y:4568,color:"#5895c5"}, {y:3827,color:"#5895c5"}, {y:3772,color:"#5895c5"}, {y:3601,color:"#5895c5"}, {y:3469,color:"#5895c5"}, {y:3224,color:"#5895c5"}, {y:3011,color:"#5895c5"}, {y:2955,color:"#5895c5"}, {y:2420,color:"#5895c5"}, {y:2220,color:"#5895c5"}, {y:2196,color:"#5895c5"}, {y:1485,color:"#5895c5"}, {y:1212,color:"#d56147"}, {y:1040,color:"#d56147"}, {y:950,color:"#d56147"}, {y:824,color:"#5895c5"}, {y:731,color:"#5895c5"}]
        }else{
          gouvNameArray=["Sfax", "Nabeul", "Medenine", "Kairouan", "Bizerte", "Jendouba", "Sousse", "Sidi Bouzid", "Ben Arous", "Mahdia", "Monastir", "Kasserine", "Beja", "Ariana", "Gafsa", "Manouba", "Gabes", "Siliana", "Tunis", "Le Kef", "Zaghouan", "Tataouine", "Kebili", "Tozeur"]
          diffArray=[ {y:29207,color:"#5895c5"}, {y:18657,color:"#5895c5"}, {y:16671,color:"#5895c5"}, {y:16142,color:"#5895c5"}, {y:15523,color:"#5895c5"}, {y:13279,color:"#5895c5"}, {y:12761,color:"#5895c5"}, {y:12312,color:"#5895c5"}, {y:10621,color:"#5895c5"}, {y:10570,color:"#5895c5"}, {y:9661,color:"#5895c5"}, {y:9476,color:"#5895c5"}, {y:9231,color:"#5895c5"}, {y:8993,color:"#5895c5"}, {y:8150,color:"#5895c5"}, {y:7489,color:"#5895c5"}, {y:7377,color:"#5895c5"}, {y:7306,color:"#5895c5"}, {y:6965,color:"#5895c5"}, {y:4879,color:"#5895c5"}, {y:4855,color:"#5895c5"}, {y:4645,color:"#5895c5"}, {y:1069,color:"#5895c5"}, {y:467,color:"#5895c5"}]      
        }

    this.setState({
        options:{
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, .6)',
            },
            credits: false,
            title: {
                text: counterpart.translate('BarMaleFemaleDiff.title') +this.props.title
            },
            subtitle: {
                text: counterpart.translate('BarMaleFemaleDiff.subtitle')

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
                    text: counterpart.translate('BarMaleFemaleDiff.yaxe')
                }
            },
            tooltip: {
                headerFormat: '<h3>{point.key} : </h3>',
                pointFormat:' <b>{point.y}</b>',
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
                name: 'inscription',
                data: diffArray,

            }]
        }
    });
}  
    componentWillReceiveProps(nextProps) {
            var diffArray=[],gouvNameArray=[],colorArray=[]
        nextProps.alldiffrenceArray.map((element,i)=>{
            diffArray.push((element.value))
            gouvNameArray.push(element.gouv)
        })
        //console.log(diffArray);
        //console.log(gouvNameArray);
        this.setState({
                options:{
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, .6)',
            },
            credits: false,
            title: {
                text: counterpart.translate('BarMaleFemaleDiff.title') +this.props.title +nextProps.title
            },
            subtitle: {
                text: counterpart.translate('BarMaleFemaleDiff.subtitle')
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
                    text: counterpart.translate('BarMaleFemaleDiff.yaxe')
                }
            },
            tooltip: {
                headerFormat: '<h3>{point.key} </h3>',
                pointFormat:': <b>{point.y}</b>',
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
                data: diffArray,
            }]
            }
        });
    }


        render() {
            return (
                <div style={{position:"absolute!important"}} >
                <HighchartInit  options={this.state.options} key={this.props.title} styles={{height:"65vh"}}/>
                </div>
            );
        }
}

export default BarMaleFemaleDiff;