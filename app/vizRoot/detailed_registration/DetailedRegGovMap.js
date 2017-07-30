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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class DetailedRegGovMap extends Component {
    constructor(props){
        super(props);
        this.state={
            gouv_name:"",munNumber:"",destroy:true,eligVsReg:"",eligible2014:"", allRegistered:"",
            grades:[60, 70, 80],dynamicReg:[60, 70, 80 ],colorfun:this.getColorRegElg,
            keyTitle:"Percentage of Registered Versus Eligible ",mapGender:"all",
            keyColor:["#fec44f", "#eaa43c", "#d4862b","#bd681c","#a54b0f","#8c2d04"],
            menElgReg:[], femaleElgReg:[],govName:[],regressionRegElg:[],
            scatterGender:false
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
        if      (d >grades[2])      {return (c1[5]); }
        else if (d>grades[1])        {return (c1[4]);}
        else if (d>grades[0])        {return (c1[2]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}
/*    changeMapKeyColor(COLORSET){
            this.setState({keyColor:COLORSET});
    }*/
    mapGenderSelect(e,index,value){
        let keyColor,keyTitle;
        value==="all"?
            (keyColor=["#fec44f", "#eaa43c", "#d4862b","#bd681c","#a54b0f","#8c2d04"],keyTitle="Percentage of Registered VS Eligible")
            :   (value==="male"?
                (keyColor=["#9ecae1", "#7ab0d3", "#5895c5","#397bb6","#1e60a6","#084594"],keyTitle="Male % of Registered VS Eligible")
                :
                (keyColor=["#fc9272", "#e97a5c", "#d56147","#c14832","#ad2c1f","#99000d"],keyTitle="Female % of Registered VS Eligible")
                )
                this.setState({mapGender:value,keyColor,keyTitle})
       
    }
    style(feature) {
        //what we have checked as map filter 
            let REGISTRATION, ELIGIBLE,COLORSET;
            this.state.mapGender==="all"?
            (REGISTRATION = parseInt(feature.properties.allreg_sum),
             ELIGIBLE = parseInt(feature.properties._2014_eligilevoters),
             COLORSET=["#fec44f", "#eaa43c", "#d4862b","#bd681c","#a54b0f","#8c2d04"]
            )
            : (this.state.mapGender==="male"?
                (REGISTRATION = parseInt(feature.properties.allreg_male_sum),
                ELIGIBLE = parseInt(feature.properties._2014_eligilevotersmale),
                COLORSET=["#9ecae1", "#7ab0d3", "#5895c5","#397bb6","#1e60a6","#084594"]
                )
                :
                (REGISTRATION = parseInt(feature.properties.allreg_female_sum),
                ELIGIBLE = parseInt(feature.properties._2014_eligilevotersfemale),
                COLORSET=["#fc9272", "#e97a5c", "#d56147","#c14832","#ad2c1f","#99000d"]
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
        this.state.mapGender==="all"?
        (eligVsRegPer= ((property.allreg_sum*100)/property._2014_eligilevoters).toFixed(2),
         eligible=property._2014_eligilevoters,registered=property.allreg_sum
        )
         :
            ( this.state.mapGender==="male"?
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
                        <Tooltip direction="bottom" className="leafletTooltip" >
                            <div>
                                <h3>{this.state.gouv_name}</h3>
                                {
                                    <div>
                                        <h4> <b> {(this.state.eligible2014).toLocaleString()}</b> Eligible</h4>
                                        <h4><b>{(this.state.allRegistered).toLocaleString()}</b> Registered</h4>
                                        <h4><b>{this.state.eligVsReg} %</b> Registered from Eligible</h4>
                                        <h4><b>{(this.state.eligible2014-this.state.allRegistered).toLocaleString()}</b> Non Registered</h4>
                                    </div>
                                }
                            </div>
                        </Tooltip>

                    </GeoJSON>
                    <ThemeRadio defaultSelected="pop" styles={{marginTop:"14vh",minWidth:"16vw",position:"fixed",zIndex:2,marginLeft:"83%"}}/>
                    {/*Left side ScatterPlot*/}
                    <div className="col-md-7" style={{marginTop:"22rem"}}>
                        {
                        <ScatterRegVsElig
                        menElgReg={this.state.menElgReg}
                        femaleElgReg={this.state.femaleElgReg}
                        allElgReg={this.state.regressionRegElg}
                        govName={this.state.govName}
                        regressionRegElg={regression.linear(this.state.regressionRegElg)}
                        genderFilter={this.props.genderFilter}
                        />}
                    </div>

                    {/*Toggle to change the map Gender*/}
                    <div  style={{zIndex:1500,position:"fixed",right: "1%",marginTop: "30rem"}} >
                        <SelectField
                            floatingLabelText="Gender -map-"
                            value={this.state.mapGender}
                            onChange={this.mapGenderSelect.bind(this)}
                            iconStyle={{fill:"red"}}
                            style={{width:"12vw"}}
                            >
                            <MenuItem value="all" primaryText="All" />
                            <MenuItem value="male" primaryText="Male" />
                            <MenuItem value="female" primaryText="Female" />
                        </SelectField>
                    </div>

                    {/*Change Degree of map : Governorate - Municipality*/}
                
                    {/*to download raw data*/}
                    <SourceButton styleProp={{zIndex:1500,position:"fixed",right: "1%",marginTop: "40rem"}}/> 
                        
                    {/*Map Keys coropleth*/}
                    <Control position="bottomright" >
                        <MapKey colorSet={this.state.keyColor} grades={this.state.grades} getColor={this.state.colorfun} keyTitle={this.state.keyTitle} key={this.state.keytitle} />
                    </Control>
                    
                    {/*Title of the map*/}
                    <Control position="topleft">
                        <div className="lefttitle" >
                            <h1 style={{marginTop:"5px"}} > Registered Versus Eligible Voters</h1>
                            <p style={{fontSize:"13px"}}>Registered from 2011 until 23-07-17 | Eligible - INS data of 2014</p>
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

  console.log("youhoooo from detailedRegGovMap",state);
  return {
    mapColor:state.changeMapColor,
    genderFilter:state.PopCheckbox
  };
}

export default connect(mapStateToProps)(DetailedRegGovMap);

