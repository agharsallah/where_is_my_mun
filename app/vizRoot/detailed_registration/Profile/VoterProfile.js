import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle,CircleMarker } from 'react-leaflet';
import Control from 'react-leaflet-control';
import ReactLoading from 'react-loading';
import ThemeRadio from '../containers/pickFilter/ThemeRadio' ;
import ColorBrew from '../containers/dynamic color/ColorBrew';
import RaisedButton from 'material-ui/RaisedButton';
import  '../DetailedRegGovMapStyle.css' ;
import regression from 'regression';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import HistogramVoterProfile from './HistogramVoterProfile' ;
import BarMaleFemaleDiff from './BarMaleFemaleDiff' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuDrawerVoterProfile from './MenuDrawerVoterProfile' ;
import DescriptionVoterProfile from './DescriptionVoterProfile' ;

import { connect } from "react-redux";
import { getPopValue } from "../../../actions/index";
import { bindActionCreators } from "redux";

class VoterProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            gouv_name:"",munNumber:"",destroy:true,
            colorfun:this.getColorRegElg,keyTitle:"18-24 male vs female"
            ,mapAge:"18-24",diffrenceArray:[],
            maleNumber:0,femaleNumber:0,radioChart:"difference",mapClicked:false,
            maleHistogram:[],femaleHistogram:[],maleFemaleHistogram:[],clickedShapeName:"Click on the map",
            dynamicPercentage:[7,9,12],tranchePercentage:0,dynamicColor:["#f7fbff","#c6dbef","#6baed6","#084594"],
        }
    }
    componentWillReceiveProps(nextProps) {

        let keyColor,keyTitle,diffrenceArray=[],color,dynamicPercentage,dynamicColor;
         if (nextProps.mapAgeSlider==="18-24") {
             keyTitle="18-24 male vs female";
             //get the diffrence between male and female -18-24- in each govenorate
            this.props.shape.features.map((element,i)=>{
                parseInt(element.properties.registration_gov_m_18_21+element.properties.registration_gov_m_22_24)>parseInt(element.properties.registration_gov_f_18_21+element.properties.registration_gov_f_22_24)?color="#5895c5":color="#d56147"                
                diffrenceArray.push({value:{y:(Math.abs(parseInt(element.properties.registration_gov_f_18_21+element.properties.registration_gov_f_22_24)-parseInt(element.properties.registration_gov_m_18_21+element.properties.registration_gov_m_22_24))),color:color},
                                    gouv:element.properties.NAME_EN,color:color})
            })
            dynamicPercentage=[7,9,12];dynamicColor=["#f7fbff","#c6dbef","#6baed6","#084594"]
         }else if(nextProps.mapAgeSlider=="25-35"){
            keyTitle="25-35 male vs female";
            this.props.shape.features.map((element,i)=>{
                parseInt(element.properties.registration_gov_m_25_35)>parseInt(element.properties.registration_gov_f_25_35)?color="#5895c5":color="#d56147"                
                diffrenceArray.push({value:{y:(Math.abs(parseInt(element.properties.registration_gov_m_25_35)-parseInt(element.properties.registration_gov_f_25_35))),color:color},
                    gouv:element.properties.NAME_EN,color:color})
            })
            dynamicPercentage=[23,26,29];dynamicColor=["#f7fcf5","#c7e9c0","#74c476","#005a32"]
         }else if(nextProps.mapAgeSlider=="36-50"){
            keyTitle="36-50 male vs female";
            this.props.shape.features.map((element,i)=>{
                parseInt(element.properties.registration_gov_m_36_50)>parseInt(element.properties.registration_gov_f_36_50)?color="#5895c5":color="#d56147"
                diffrenceArray.push({value:{y:(Math.abs(parseInt(element.properties.registration_gov_m_36_50)-parseInt(element.properties.registration_gov_f_36_50))),color:color},
                    gouv:element.properties.NAME_EN,color:color})
            })
            dynamicPercentage=[28,30,32];dynamicColor=["#f7fcf5","#c7e9c0","#74c476","#005a32"]
         }else{
            keyTitle="+50 male vs female";
            this.props.shape.features.map((element,i)=>{
                parseInt(element.properties.registration_gov_m_p51)>parseInt(element.properties.registration_gov_f_p51)?color="#5895c5":color="#d56147"
                diffrenceArray.push({value:{y:(Math.abs(parseInt(element.properties.registration_gov_m_p51)-parseInt(element.properties.registration_gov_f_p51))),color:color},
                    gouv:element.properties.NAME_EN,color:color})
                    //console.log(typeof(diffrenceArray[i].value));
            })
            dynamicPercentage=[34,38,42];dynamicColor=["#fff7ec","#fee8c8","#fc8d59","#990000"]
         }
         diffrenceArray.sort(function(a, b){return b.value.y-a.value.y})
         this.setState({mapAge:nextProps.mapAgeSlider,keyTitle,diffrenceArray,
                        dynamicPercentage,dynamicColor
                        });

    }
    //get the value of the bar chart that control the Left chart and map (keep the same page : age profile)
    getRadioChart(value){
        this.setState({radioChart:value});
        value==="diffrence"?this.setState({ colorfun:this.getColorRegElg}):this.setState({ colorfun:this.getColorAgePercentage});
    }

    getColorRegElg(d) {
        if(d ==  "blue")      {return "#5895c5" }
        else                  {return "#d56147"}
    }  
    
    getColorAgePercentage(d,c1,grades) {
        if      (d >grades[2])       {return (c1[3]); }
        else if (d>grades[1])        {return (c1[2]);}
        else if (d>grades[0])        {return (c1[1]);}
        else                         {return (c1[0]);}
	}

    style(feature) {
        let property = feature.properties;
        let chosen,tranchePercentage;
        //for the map Coloring Male Vs Female | age percentage
        if (this.state.mapAge=="18-24") {
            (property.registration_gov_m_18_21+property.registration_gov_m_22_24)>(property.registration_gov_f_18_21+property.registration_gov_f_22_24)?
                chosen="blue":chosen="red";
            //18-24 percentage of all voters
            tranchePercentage=((property.registration_gov_m_18_21+property.registration_gov_m_22_24+property.registration_gov_f_18_21+property.registration_gov_f_22_24)*100)/property.allreg_sum
        }else if(this.state.mapAge=="25-35"){
            property.registration_gov_m_25_35>property.registration_gov_f_25_35 ? chosen="blue": chosen="red";
            tranchePercentage=((property.registration_gov_m_25_35+property.registration_gov_f_25_35)*100)/property.allreg_sum
        }else if(this.state.mapAge=="36-50"){
            property.registration_gov_m_36_50>property.registration_gov_f_36_50 ? chosen="blue": chosen="red";
            tranchePercentage=((property.registration_gov_m_36_50+property.registration_gov_f_36_50)*100)/property.allreg_sum
        }else{
            property.registration_gov_m_p51>property.registration_gov_f_p51 ? chosen="blue": chosen="red";
            tranchePercentage=((property.registration_gov_m_p51+property.registration_gov_f_p51)*100)/property.allreg_sum
        }
            if (this.state.radioChart==="difference") {
               return {
                    fillColor: this.getColorRegElg(chosen),
                    weight: 1,
                    opacity: 2,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.8
                }; 
            }else{
                return {
                fillColor: this.getColorAgePercentage(tranchePercentage,this.state.dynamicColor,this.state.dynamicPercentage),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };
            }
            
	}

    highlightFeature(e) {
        const layer = e.target;
        const property = layer.feature.properties;
        let maleNumber, femaleNumber,tranchePercentage;
        //for the tooltip
        if (this.state.mapAge=="18-24") {
            femaleNumber=property.registration_gov_f_18_21+property.registration_gov_f_22_24;
            maleNumber=property.registration_gov_m_18_21+property.registration_gov_m_22_24;
            tranchePercentage= ((maleNumber+ femaleNumber)*100)/property.allreg_sum; 
        }else if(this.state.mapAge=="25-35"){
            maleNumber= property.registration_gov_m_25_35;
            femaleNumber=property.registration_gov_f_25_35;
            tranchePercentage= ((maleNumber+ femaleNumber)*100)/property.allreg_sum; 
        }else if(this.state.mapAge=="36-50"){
            maleNumber=property.registration_gov_m_36_50;
            femaleNumber=property.registration_gov_f_36_50;
            tranchePercentage= ((maleNumber+ femaleNumber)*100)/property.allreg_sum; 
        }else{
            maleNumber= property.registration_gov_m_p51;
            femaleNumber= property.registration_gov_f_p51;
            tranchePercentage= ((maleNumber+ femaleNumber)*100)/property.allreg_sum; 
        }
        this.setState({destroy:false,gouv_name:property.NAME_EN,munNumber:property.munnumber,maleNumber,femaleNumber,
                       tranchePercentage 
                    });
        return layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 1
        });
	}
    resetFeature(e) {
	    var layer = e.target;
	     layer.setStyle({
	        weight: 5
	    });
        this.setState({destroy:true});
	}
    clickedShape(e){
        //for the histogram age BarChart
        let property=e.target.feature.properties;
        this.setState({maleHistogram:[-(property.registration_gov_m_18_21+property.registration_gov_m_22_24),-property.registration_gov_m_25_35,-property.registration_gov_m_36_50,-property.registration_gov_m_p51],
            femaleHistogram:[(property.registration_gov_f_18_21+property.registration_gov_f_22_24),property.registration_gov_f_25_35,property.registration_gov_f_36_50,property.registration_gov_f_p51],
            maleFemaleHistogram:[(property.registration_gov_f_18_21+property.registration_gov_f_22_24)+(property.registration_gov_m_18_21+property.registration_gov_m_22_24),property.registration_gov_f_25_35+property.registration_gov_m_25_35,property.registration_gov_f_36_50+property.registration_gov_m_36_50,property.registration_gov_f_p51+property.registration_gov_m_p51]
            ,radioChart:"age",mapClicked:true,clickedShapeName:property.NAME_EN,colorfun:this.getColorAgePercentage
        });
    }

    render() {
        const position = [34.85360, 6.59795];
        return (
                <div>
                {this.props.shapeIsLoaded ? <div><Map  maxZoom={23} center={position} zoom={6} className="initialposition" style={{height: "100vh", width: "100vw",position:"relative",zIndex:0}}>
                    <TileLayer
                    url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
                    />

                    <GeoJSON
                        key={"a"+this.props.key}
                        data= {this.props.shape}
                        style={this.style.bind(this)} 
                        onEachFeature={
                            (feature, layer) => {
                                //sending shapes center to marker component
                                //layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:"tooltipnamear",direction:"right" })
                                layer.on({mouseover: this.highlightFeature.bind(this)});
                                layer.on({mouseout: this.resetFeature.bind(this)});
                                layer.on({click: this.clickedShape.bind(this)});
                            }    
                        }
                    >
                        {this.state.radioChart==="difference"?
                        <Tooltip direction="bottom" className="leafletTooltip" >
                            <div>
                                <h4>{this.state.gouv_name}</h4>
                                {
                                    <div>
                                        <h5><b>{(this.state.maleNumber+this.state.femaleNumber).toLocaleString()} </b> total registered {this.state.mapAge} </h5>
                                        <h5><b>{(this.state.maleNumber).toLocaleString()}</b> registered male </h5>
                                        <h5> <b>{(this.state.femaleNumber).toLocaleString()}</b> Registered female</h5>
                                        <h5> <b>{(Math.abs(this.state.femaleNumber-this.state.maleNumber)).toLocaleString()}</b> voters Difference</h5>
                                    </div>
                                }
                            </div>
                        </Tooltip>:
                        <Tooltip direction="bottom" className="leafletTooltip" >
                            <div>
                                <h4>{this.state.gouv_name}</h4>
                                {
                                    <div>
                                        <h5>{(this.state.tranchePercentage).toFixed(2)}% </h5>
                                    </div>
                                }
                            </div>
                        </Tooltip>
                        }

                    </GeoJSON>
                        
                        {/*Left side ScatterPlot*/}
                        <div className="col-md-6" style={{marginTop:"22rem"}}>
                       
                            {/*Toggle to change the left chart*/}
                            {this.state.radioChart==="difference" ?
                                <BarMaleFemaleDiff 
                                    alldiffrenceArray={this.state.diffrenceArray} 
                                    title={this.state.mapAge}
                                />
                            :
                               <HistogramVoterProfile
                                maleHistogram={this.state.maleHistogram}
                                femaleHistogram={this.state.femaleHistogram}
                                mapClicked={this.state.mapClicked}
                                clickedShapeName={this.state.clickedShapeName}
                                maleFemaleHistogram={this.state.maleFemaleHistogram}
                                /> 
                            }
                         </div>

                    {/*Change Degree of map : Governorate - Municipality*/}
                
                    {/*to show description*/}
                    {console.log(this.props.count)}
                    {
                    this.props.count==1?
                    <DescriptionVoterProfile styleProp={{zIndex:1500,position:"fixed",right: "1%",marginTop: "40rem"}}/>
                    :
                    <div></div>
                    } 
                    
                   {/*Title of the map*/}
                    <Control position="topleft">
                        <div className="lefttitle" >
                            <h1 style={{marginTop:"5px"}} > Voter Profile</h1>
                            <p style={{fontSize:"13px"}}>this map shows upon choosing an age category which is more male or female </p>
                        </div>
                    </Control>

                    </Map>
                    {/* Menu Drawer */}
                    <MenuDrawerVoterProfile getRadioChart={this.getRadioChart.bind(this)} colorSet={this.state.dynamicColor} grades={this.state.dynamicPercentage} getColor={this.state.colorfun} keyTitle={this.state.keyTitle} mapKey={this.state.keyTitle} radioChart= {this.state.radioChart} />
                </div>
                :
                <div>
                    <div className="col-md-5"></div>
                    <div className="col-md-5" style={{marginTop:"43vh"}}>
                        <h2>"Loading Map"</h2>
                        <ReactLoading type="bars" color="#444" className="react-Loader" delay={0} />
                    </div>
                </div>
            }
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    mapColor:state.changeMapColor,
    mapAgeSlider:state.popFilter,
  };
}

export default connect(mapStateToProps)(VoterProfile);