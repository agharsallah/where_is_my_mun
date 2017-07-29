import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle,CircleMarker } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MapKeyVoterProfile from './MapKeyVoterProfile' ;
import ReactLoading from 'react-loading';
import ThemeRadio from './containers/pickFilter/ThemeRadio' ;
import ColorBrew from './containers/dynamic color/ColorBrew';
import SourceButton from './SourceButton' ;
import RaisedButton from 'material-ui/RaisedButton';
import  './DetailedRegGovMapStyle.css' ;
import regression from 'regression';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import HistogramVoterProfile from './HistogramVoterProfile' ;
import BarMaleFemaleDiff from './BarMaleFemaleDiff' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class VoterProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            gouv_name:"",munNumber:"",destroy:true,
            colorfun:this.getColorRegElg,keyTitle:"Percentage of active registered voters"
            ,mapAge:"18-24",diffrenceArray:[],
            maleNumber:0,femaleNumber:0,radioChart:"difference",mapClicked:false,
            maleHistogram:[],femaleHistogram:[],maleFemaleHistogram:[],clickedShapeName:"Click on the map"
        }
    }
    componentWillReceiveProps(nextProps) {

        let keyColor,keyTitle,diffrenceArray=[],color;
         if (nextProps.mapAgeSlider==="18-24") {
             keyTitle="18-24 male vs female";
             //get the diffrence between male and female -18-24- in each govenorate
            this.props.shape.features.map((element,i)=>{
                parseInt(element.properties.registration_gov_m_18_21+element.properties.registration_gov_m_22_24)>parseInt(element.properties.registration_gov_f_18_21+element.properties.registration_gov_f_22_24)?color="#5895c5":color="#d56147"                
                diffrenceArray.push({value:{y:(Math.abs(parseInt(element.properties.registration_gov_f_18_21+element.properties.registration_gov_f_22_24)-parseInt(element.properties.registration_gov_m_18_21+element.properties.registration_gov_m_22_24))),color:color},
                                    gouv:element.properties.NAME_EN,color:color})
            })
         }else if(nextProps.mapAgeSlider=="25-35"){
            keyTitle="25-35 male vs female";
            this.props.shape.features.map((element,i)=>{
                parseInt(element.properties.registration_gov_m_25_35)>parseInt(element.properties.registration_gov_f_25_35)?color="#5895c5":color="#d56147"                
                diffrenceArray.push({value:{y:(Math.abs(parseInt(element.properties.registration_gov_m_25_35)-parseInt(element.properties.registration_gov_f_25_35))),color:color},
                    gouv:element.properties.NAME_EN,color:color})
            })
         }else if(nextProps.mapAgeSlider=="36-50"){
            keyTitle="36-50 male vs female";
            this.props.shape.features.map((element,i)=>{
                parseInt(element.properties.registration_gov_m_36_50)>parseInt(element.properties.registration_gov_f_36_50)?color="#5895c5":color="#d56147"
                diffrenceArray.push({value:{y:(Math.abs(parseInt(element.properties.registration_gov_m_36_50)-parseInt(element.properties.registration_gov_f_36_50))),color:color},
                    gouv:element.properties.NAME_EN,color:color})
            })

         }else{
            keyTitle="+50 male vs female";
            this.props.shape.features.map((element,i)=>{
                parseInt(element.properties.registration_gov_m_p51)>parseInt(element.properties.registration_gov_f_p51)?color="#5895c5":color="#d56147"
                diffrenceArray.push({value:{y:(Math.abs(parseInt(element.properties.registration_gov_m_p51)-parseInt(element.properties.registration_gov_f_p51))),color:color},
                    gouv:element.properties.NAME_EN,color:color})
                    //console.log(typeof(diffrenceArray[i].value));
            })
         }
         diffrenceArray.sort(function(a, b){return b.value.y-a.value.y})
         this.setState({mapAge:nextProps.mapAgeSlider,keyTitle,diffrenceArray});

    }
    
     getColorRegElg(d) {
        if(d ==  "blue")      {return "#5895c5" }
        else                  {return "#d56147"}
    }  

    handleRadioChart(e,value){
        console.log('vvvvvvvvvv',value);
        this.setState({radioChart:value});
    }
    style(feature) {
        let property = feature.properties;
        let chosen;
        //for the map Coloring 
        if (this.state.mapAge=="18-24") {
            (property.registration_gov_m_18_21+property.registration_gov_m_22_24)>(property.registration_gov_f_18_21+property.registration_gov_f_22_24)?
                chosen="blue":chosen="red"
        }else if(this.state.mapAge=="25-35"){
            property.registration_gov_m_25_35>property.registration_gov_f_25_35 ? chosen="blue": chosen="red"
        }else if(this.state.mapAge=="36-50"){
            property.registration_gov_m_36_50>property.registration_gov_f_36_50 ? chosen="blue": chosen="red"
        }else{
            property.registration_gov_m_p51>property.registration_gov_f_p51 ? chosen="blue": chosen="red"
        }

            return {
                fillColor: this.getColorRegElg(chosen),
                weight: 1,
                opacity: 2,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.8
            };
	}

    highlightFeature(e) {
        const layer = e.target;
        const property = layer.feature.properties;
        let maleNumber, femaleNumber;
        //for the tooltip
        if (this.state.mapAge=="18-24") {
            femaleNumber=property.registration_gov_f_18_21+property.registration_gov_f_22_24;
            maleNumber=property.registration_gov_m_18_21+property.registration_gov_m_22_24;
        }else if(this.state.mapAge=="25-35"){
            maleNumber= property.registration_gov_m_25_35;
            femaleNumber=property.registration_gov_f_25_35;
        }else if(this.state.mapAge=="36-50"){
            maleNumber=property.registration_gov_m_36_50;
            femaleNumber=property.registration_gov_f_36_50;
        }else{
            maleNumber= property.registration_gov_m_p51;
            femaleNumber= property.registration_gov_f_p51;
        }
        this.setState({destroy:false,gouv_name:property.NAME_EN,munNumber:property.munnumber,maleNumber,femaleNumber});
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
            ,radioChart:"barChart",mapClicked:true,clickedShapeName:property.NAME_EN
        });
    }

    render() {
        const position = [34.85360, 6.59795];
        return (
                <div>
                {this.props.shapeIsLoaded ? <Map  maxZoom={23} center={position} zoom={6} className="initialposition" style={{height: "100vh", width: "100vw",position:"relative",zIndex:0}}>
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
                        </Tooltip>

                    </GeoJSON>

                    {/*Left side ScatterPlot*/}
                    <div className="col-md-6" style={{marginTop:"22rem"}}>
                        {/*Toggle to change the left chart*/}


                            {this.state.radioChart==="barChart" ?
                                <HistogramVoterProfile
                                maleHistogram={this.state.maleHistogram}
                                femaleHistogram={this.state.femaleHistogram}
                                mapClicked={this.state.mapClicked}
                                clickedShapeName={this.state.clickedShapeName}
                                maleFemaleHistogram={this.state.maleFemaleHistogram}
                                />
                            :
                                <BarMaleFemaleDiff 
                                    alldiffrenceArray={this.state.diffrenceArray} 
                                    title={this.state.mapAge}
                                />}
                            <div  style={{background:"white",marginTop:"-64vh",zIndex: 0,width:"19rem",float:"right"}}>
                                <RadioButtonGroup name="activeVoterChart"  onChange={this.handleRadioChart.bind(this)} valueSelected={this.state.radioChart} >
                                    <RadioButton
                                        value="age"
                                        label="Age Percentage"
                                    />
                                    <RadioButton
                                        value="difference"
                                        label="male/female difference"
                                    />
                                    <RadioButton
                                        value="barChart"
                                        label="Age Histogram"
                                    />
                                </RadioButtonGroup>
                            </div>
                        
                    </div>

                    {/*Toggle to change the map AGE Tranche*/}
                    
                    <div  style={{zIndex:1500,position:"fixed",right: "1%",marginTop: "30rem"}} >
                        <SelectField
                            floatingLabelText="Age Tranche -map-"
                            value={this.state.mapAge}
                            iconStyle={{fill:"red"}}
                            style={{width:"12vw"}}
                            >
                            <MenuItem value="18-24" primaryText="18-24" />
                            <MenuItem value="25-35" primaryText="25-35" />
                            <MenuItem value="36-50" primaryText="36-50" />
                            <MenuItem value="+50" primaryText="+50" />
                        </SelectField>
                    </div>
                    {/*Change Degree of map : Governorate - Municipality*/}
                
                    {/*to download raw data*/}
                    <SourceButton styleProp={{zIndex:1500,position:"fixed",right: "1%",marginTop: "40rem"}} /> 
                        
                    {/*Map Keys coropleth*/}
                    <Control position="bottomright" >
                        <MapKeyVoterProfile colorSet={this.props.mapColor} grades={this.state.grades} getColor={this.state.colorfun} keyTitle={this.state.keyTitle} key={this.state.keyTitle} />
                    </Control>
                    
                    {/*Title of the map*/}
                    <Control position="topleft">
                        <div className="lefttitle" >
                            <h1 style={{marginTop:"5px"}} > Voter Profile</h1>
                            <p style={{fontSize:"13px"}}>this map shows upon choosing an age category which is more male or female </p>
                        </div>
                    </Control>

                </Map>:
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

  console.log("youhoooo from VoterProfile",state);
  return {
    mapColor:state.changeMapColor,
    genderFilter:state.PopCheckbox,
    mapAgeSlider:state.popFilter
  };
}

export default connect(mapStateToProps)(VoterProfile);