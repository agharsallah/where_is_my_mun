import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle,CircleMarker } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MapKey from './MapKey' ;
import ReactLoading from 'react-loading';
import ThemeRadio from './containers/pickFilter/ThemeRadio' ;
import ColorBrew from './containers/dynamic color/ColorBrew';
import SourceButton from './SourceButton' ;
import RaisedButton from 'material-ui/RaisedButton';
import  './DetailedRegGovMapStyle.css' ;
import ScatterRegVsElig from './ScatterRegVsElig' ;
import regression from 'regression';

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class ActiveRegistered extends Component {
    constructor(props){
        super(props);
        this.state={
            gouv_name:"",munNumber:"",destroy:true,eligVsReg:"",eligible2014:"", allRegistered:"",
            grades:[60, 70, 80],dynamicReg:[60, 70, 80 ],colorfun:this.getColorRegElg,
            keytitle:"Percentage of Registered Versus Eligible ",
            menElgReg:[], femaleElgReg:[],govName:[],regressionRegElg:[],
            dynamicUpdate:[450, 600,800, 1000],scatterGender:false
        }
    }
    
    componentWillMount() {
        console.log('cwm');
            // preparing the basic scatter chart data
            const dataArray=this.props.shape,menElgReg=[],femaleElgReg=[],govName=[],regressionRegElg=[];
            (dataArray.features).map((object,i)=>{
              menElgReg.push([Number(object.properties.allreg_male_sum),Number(object.properties._2014_eligilevotersmale)] )
              femaleElgReg.push([Number(object.properties.allreg_female_sum),Number(object.properties._2014_eligilevotersfemale)] )
              
              //gov name for hhighchart tooltip
              govName.push(object.properties.NAME_EN);
              //regression array for regression line
              regressionRegElg.push([Number(object.properties.allreg_sum),Number(object.properties._2014_eligilevoters)])
            })
            this.setState({
                            menElgReg,femaleElgReg,govName,regressionRegElg       
            });
    }
      
   
     getColorRegElg(d,c1,grades) {
        if      (d >grades[2])      {return (c1[5]); }
        else if (d>grades[1])        {return (c1[4]);}
        else if (d>grades[0])        {return (c1[2]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

    style(feature) {
        //check for what we have checked as filter subject : Population || state ||
            let REGISTRATION = parseInt(feature.properties.allreg_sum);
            let ELIGIBLE = parseInt(feature.properties._2014_eligilevoters);
            let eligVsReg = ((REGISTRATION*100)/ELIGIBLE).toFixed(2);
            return {
                fillColor: this.getColorRegElg(eligVsReg,this.props.mapColor,this.state.dynamicReg),
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
        const eligVsReg= ((property.allreg_sum*100)/property._2014_eligilevoters).toFixed(2)
        this.setState({destroy:false,gouv_name:property.NAME_EN,munNumber:property.munnumber,
                        eligVsReg:eligVsReg,eligible2014:property._2014_eligilevoters,allRegistered:property.allreg_sum});
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

    render() {
        const position = [34.05360, 3.59795];
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
                            }    
                        }
                    >
                        <Tooltip direction="bottom">
                            <div>
                                <h2>{this.state.gouv_name}</h2>
                                {
                                    <div>
                                        <h3><b>{this.state.eligVsReg} %</b> Registered from Eligible</h3>
                                        <h3> <b> {(this.state.eligible2014).toLocaleString()}</b> Eligible</h3>
                                        <h3><b>{(this.state.allRegistered).toLocaleString()}</b> Registered</h3>
                                    </div>
                                }
                            </div>
                        </Tooltip>

                    </GeoJSON>

                    {/*Toggle to change the map theme*/}

                    {/*Change Degree of map : Governorate - Municipality*/}
                
                    {/*Color changer button*/}
                    <ColorBrew />

                    {/*to download raw data*/}
                    <SourceButton/> 
                        
                    {/*Map Keys coropleth*/}
                    <Control position="bottomright" >
                        <MapKey colorSet={this.props.mapColor} grades={this.state.grades} getColor={this.state.colorfun} keyTitle={this.state.keytitle} />
                    </Control>
                    
                    {/*Title of the map*/}
                    <Control position="topleft">
                        <div className="lefttitle" >
                            <h1 style={{marginTop:"5px"}} > Active Registerd Voters</h1>
                            <p style={{fontSize:"13px"}}>Percentage of registration in municipal election Versus already registered</p>
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

  console.log("youhoooo from ActiveRegistered",state);
  return {
    mapColor:state.changeMapColor,
    genderFilter:state.PopCheckbox
  };
}

export default connect(mapStateToProps)(ActiveRegistered);

