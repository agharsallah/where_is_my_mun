import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle,CircleMarker } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MapKey from '../MapKey' ;
import ReactLoading from 'react-loading';
import ThemeRadio from '../containers/pickFilter/ThemeRadio' ;
import ColorBrew from '../containers/dynamic color/ColorBrew';
import RaisedButton from 'material-ui/RaisedButton';
import  '../DetailedRegGovMapStyle.css' ;
import ScatterRegVsElig from './ScatterRegVsElig' ;
import regression from 'regression';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MenuDrawerRegVsElig from './MenuDrawerRegVsElig' ;
import counterpart from 'counterpart' ;
import Translate    from 'react-translate-component';
var _t = Translate.translate;

import { connect } from "react-redux";
import { getPopValue } from "../../../actions/index";
import { bindActionCreators } from "redux";

class RegVsElig extends Component {
    constructor(props){
        super(props);
        this.state={
            gouv_name:"",munNumber:"",destroy:true,eligVsReg:"",eligible2014:"", allRegistered:"",
            grades:[60, 70, 80],dynamicReg:[60, 70, 80 ],colorfun:this.getColorRegElg,
            keyTitle:counterpart.translate('RegVsElig.ALLKEY'),mapGender:"All",
            keyColor:["#ffffcc", "#c2e699", "#78c679","#238443"],
            menElgReg:[], femaleElgReg:[],govName:[],regressionRegElg:[],
            scatterGender:false,
            allkey:counterpart.translate('RegVsElig.ALLKEY'),
            malekey:counterpart.translate('RegVsElig.MALEKEY'),
            femalekey:counterpart.translate('RegVsElig.FEMALEKEY')
        }
    }

    componentWillMount() {

            // preparing the basic scatter chart data
            const dataArray=this.props.shape,menElgReg=[],femaleElgReg=[],govName=[],regressionRegElg=[];
            (dataArray.features).map((object,i)=>{
              menElgReg.push([Number(object.properties._2014_eligilevotersmale),Number(object.properties.allreg_male_sum)] )
              femaleElgReg.push([Number(object.properties._2014_eligilevotersfemale),Number(object.properties.allreg_female_sum)] )
              
              //gov name for hhighchart tooltip
              govName.push(object.properties.NAME_EN);
              //regression array for regression line
              regressionRegElg.push([Number(object.properties._2014_eligilevoters),Number(object.properties.allreg_sum)])
            })
            this.setState({
                menElgReg,femaleElgReg,govName,regressionRegElg      
            });
    }
        
   
     getColorRegElg(d,c1,grades) {
        if      (d >grades[2])       {return (c1[3]); }
        else if (d>grades[1])        {return (c1[2]);}
        else if (d>grades[0])        {return (c1[1]);}
        else                         {return (c1[0]);}
	}
/*    changeMapKeyColor(COLORSET){
            this.setState({keyColor:COLORSET});
    }*/
    style(feature) {
        //what we have checked as map filter 
            let REGISTRATION, ELIGIBLE,COLORSET;
            this.state.mapGender==="All"?
            (REGISTRATION = parseInt(feature.properties.allreg_sum),
             ELIGIBLE = parseInt(feature.properties._2014_eligilevoters),
             COLORSET=["#ffffcc", "#c2e699", "#78c679","#238443"]
            )
            : (this.state.mapGender==="Male"?
                (REGISTRATION = parseInt(feature.properties.allreg_male_sum),
                ELIGIBLE = parseInt(feature.properties._2014_eligilevotersmale),
                COLORSET=["#f7fbff","#c6dbef","#6baed6","#084594"]
                )
                :
                (REGISTRATION = parseInt(feature.properties.allreg_female_sum),
                ELIGIBLE = parseInt(feature.properties._2014_eligilevotersfemale),
                COLORSET=["#feebe2","#fbb4b9","#f768a1","#ae017e"]
                )
            )
            let eligVsReg = ((REGISTRATION*100)/ELIGIBLE).toFixed(2);
            return {
                fillColor: this.getColorRegElg(eligVsReg,COLORSET,this.state.dynamicReg),
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
        let eligVsRegPer,eligible,registered;
        this.state.mapGender==="All"?
        (eligVsRegPer= ((property.allreg_sum*100)/property._2014_eligilevoters).toFixed(2),
         eligible=property._2014_eligilevoters,registered=property.allreg_sum
        )
         :
            ( this.state.mapGender==="Male"?
            (eligVsRegPer= ((property.allreg_male_sum*100)/property._2014_eligilevotersmale).toFixed(2),
            eligible=property._2014_eligilevotersmale,registered=property.allreg_male_sum
            )
            :
            (eligVsRegPer= ((property.allreg_female_sum*100)/property._2014_eligilevotersfemale).toFixed(2),
            eligible=property._2014_eligilevotersfemale,registered=property.allreg_female_sum
            )
            )
        this.setState({destroy:false,gouv_name:property.NAME_EN,munNumber:property.munnumber,
                        eligVsReg:eligVsRegPer,eligible2014:eligible,allRegistered:registered});
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

    getMapGender(value){
        let keyColor,keyTitle;
        value==="All"?
            (keyColor=["#ffffcc", "#c2e699", "#78c679","#238443"],keyTitle=this.state.allkey)
            :   (value==="Male"?
                (keyColor=["#f7fbff","#c6dbef","#6baed6","#084594"],keyTitle=this.state.malekey)
                :
                (keyColor=["#feebe2","#fbb4b9","#f768a1","#ae017e"],keyTitle=this.state.femalekey)
                )
                this.setState({mapGender:value,keyColor,keyTitle})
    }

    render() {
        const position = [34.05360, 5.59795];
        const TITLE= <Translate type="text" content="RegVsElig.TITLE"/>
        const SUBTITLE= <Translate type="text" content="RegVsElig.SUBTITLE"/>
        /* Tooltip */
        const ELIGIBLE= <Translate type="text" content="RegVsElig.ELIGIBLE"/>
        const REGISTERED= <Translate type="text" content="RegVsElig.REGISTERED"/>
        const REGELG= <Translate type="text" content="RegVsElig.REGELG"/>
        const NONREG= <Translate type="text" content="RegVsElig.NONREG"/>
        /* Props to Scatter */

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
                        <Tooltip direction="bottom" className="leafletTooltip" >
                            <div>
                                <h3>{this.state.gouv_name}</h3>
                                {
                                    <div>
                                        <h4> <b> {(this.state.eligible2014).toLocaleString()}</b> {ELIGIBLE}</h4>
                                        <h4><b>{(this.state.allRegistered).toLocaleString()}</b> {REGISTERED}</h4>
                                        <h4><b>{this.state.eligVsReg} %</b> {REGELG}</h4>
                                        <h4><b>{(this.state.eligible2014-this.state.allRegistered).toLocaleString()}</b> {NONREG}</h4>
                                    </div>
                                }
                            </div>
                        </Tooltip>

                    </GeoJSON>
                    <ThemeRadio defaultSelected="pop" styles={{marginTop:"14vh",minWidth:"16vw",position:"fixed",zIndex:2,marginLeft:"83%"}}/>
                    {/*Left side ScatterPlot*/}
                    <div className="col-md-6" style={{marginTop:"22rem"}}>
                        {
                        <ScatterRegVsElig
                        menElgReg={this.state.menElgReg}
                        femaleElgReg={this.state.femaleElgReg}
                        allElgReg={this.state.regressionRegElg}
                        govName={this.state.govName}
                        regressionRegElg={regression.linear(this.state.regressionRegElg)}
                        genderFilter={this.state.mapGender}
                        />}
                    </div>

                    {/*Change Degree of map : Governorate - Municipality*/}
                
                    {/*to download raw data*/}
                        
                    {/*Map Keys coropleth*/}
                    <Control position="bottomright" >
                        <MapKey colorSet={this.state.keyColor} grades={this.state.grades} getColor={this.state.colorfun} keyTitle={this.state.keyTitle} key={this.state.keytitle} />
                    </Control>
                    
                    {/*Title of the map*/}
                    <Control position="topleft">
                        <div className="lefttitle" >
                            <h1 style={{marginTop:"5px"}} >{TITLE}</h1>
                            <p style={{fontSize:"13px"}}>{SUBTITLE}</p>
                        </div>
                    </Control>
                    
                    {/* Menu Drawer */}
                    <MenuDrawerRegVsElig getMapGender={this.getMapGender.bind(this)} colorSet={this.state.keyColor} grades={this.state.grades} getColor={this.state.colorfun} keyTitle={this.state.keyTitle} mapGender= {this.state.mapGender} />

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

  console.log("youhoooo from RegVsElig",state);
  return {
    mapColor:state.changeMapColor,
    genderFilter:state.PopCheckbox
  };
}

export default connect(mapStateToProps)(RegVsElig);

