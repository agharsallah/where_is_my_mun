import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle,CircleMarker } from 'react-leaflet';
import axios from 'axios' ;
import config from '../../config'
import Control from 'react-leaflet-control';
import MapKey from './MapKey' ;
import ReactLoading from 'react-loading';
import InscriptionVsUpdateRadio from './containers/pickFilter/InscriptionVsUpdateRadio' ;
import ColorBrew from './containers/dynamic color/ColorBrew';
import SourceButton from './SourceButton' ;
import RaisedButton from 'material-ui/RaisedButton';
import  './DetailedRegGovMapStyle.css' ;

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class DetailedRegGovMap extends Component {
    constructor(props){
        super(props);
        this.state={feature:"",shape:g_mun_shapes,shapeIsLoaded:false, key:1,
        inscription:"" ,update:"" ,gouv_name:"",newMunNumber:"",oldMunNumber:"",extMunNumber:"",munNumber:"",destroy:true,
        grades:[60, 70, 80],dynamicReg:[60, 70, 80 ],colorfun:this.getColorRegElg,
        keytitle:"Percentage of Registered against Eligible ",
         enabledMarker:true,allInscription:[],allGouvname:[],allUpdate:[],sumInscription:0,sumUpdate:0,
         date:'06-07',dynamicUpdate:[450, 600,800, 1000]

        }
    }
    
    componentWillMount() {
        let qString=config.apiUrl+"/api/dailyins/detailed_gov_10-07";
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            //console.log(response.data.data)
            console.log('we got shape data frm db');
            console.log(response);
            this.setState({shape:JSON.parse(response.data.data),key:2,shapeIsLoaded:true});
        }
        )
        .catch(function (error) {
            console.log(error);
        });

    }
   
     getColorRegElg(d,c1,grades) {
         console.log("Geeeeeeeeeettttttt",grades);
        if      (d >grades[2])      {return (c1[5]); }
        else if (d>grades[1])        {return (c1[4]);}
        else if (d>grades[0])        {return (c1[2]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

    getColorUpdate(d,c1,grades) {
        if      (d >grades[3])      {return (c1[5]); }
        else if (d>grades[2])        {return (c1[4]);}
        else if (d>grades[1])        {return (c1[3]);}
        else if (d>grades[0])        {return (c1[2]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

    style(feature) {
        //check for what we have checked as filter subject : Population || state ||
        if (this.props.radioFilterPicker=="pop") {
            let REGISTRATION = parseInt(feature.properties.allreg_sum);
            let ELIGIBLE = parseInt(feature.properties._2014_eligilevoters);
            let eligVsReg = ((REGISTRATION*100)/ELIGIBLE).toFixed(2);
            return {
                fillColor: this.getColorRegElg(eligVsReg,this.props.mapColor,this.state.dynamicReg),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };
        }else if(this.props.radioFilterPicker=="update"){
            var UPDATE = parseInt(feature.properties["update"+this.props.regDate]);
            return {
                fillColor: this.getColorUpdate(UPDATE,this.props.mapColor,this.state.dynamicUpdate),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };
        }
	}

    highlightFeature(e) {
        const layer = e.target;
        const property = layer.feature.properties;

        this.setState({destroy:false,update:property["update"+this.props.regDate],inscription:property["inscription"+this.props.regDate],gouv_name:property.NAME_EN,newMunNumber:property.newnumber,oldMunNumber:property.oldnumber,extMunNumber:property.extendednumber,munNumber:property.munnumber});
        return layer.setStyle( {
            weight: 2,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
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
        const position = [35.305360, 8.049795];
        return (
                <div>
                {this.state.shapeIsLoaded ? <Map  maxZoom={23} center={position} zoom={7} className="initialposition" style={{height: "100vh", width: "100vw",position:"relative",zIndex:0}}>
                    <TileLayer
                    url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
                    />

                    <GeoJSON
                    key={"a"+this.state.key}
                    data= {this.state.shape}
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
                                {this.props.radioFilterPicker=="pop"?
                                    <div>
                                        <h3><b>{this.state.inscription}</b> / { this.state.sumInscription} Inscription</h3>
                                        <h3> Rank : <b>{(this.state.allInscription.map((e)=> { return e.value; }).indexOf(parseInt(this.state.inscription)))+1}</b> / 27 </h3>
                                        <h3><b>{this.state.munNumber}</b> Municipality</h3>
                                    </div>
                                :
                                    <div>
                                        <h3><b>{this.state.update}</b> / { this.state.sumUpdate} Polling Center Update </h3>
                                        <h3> Rank : <b>{(this.state.allUpdate.map((e)=> { return e.value; }).indexOf(parseInt(this.state.update)))+1}</b> / 27 </h3>
                                        <h3><b>{this.state.munNumber}</b> Municipality</h3>
                                    </div>
                                }
                            </div>
                        </Tooltip>

                    </GeoJSON>

                    {/*Toggle to change the map*/}
                    <InscriptionVsUpdateRadio/>

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
                            <h1> {this.props.radioFilterPicker==="pop"?"registred against Eligible Voters":(this.props.radioFilterPicker==="active"?"Active Registerd Voters ":"Voter Profile")} </h1>
                            <p style={{fontSize:"13px"}}>{this.props.radioFilterPicker==="pop"?"Registred from 2011 until 10-07-17 | Eligible - INS data of 2014 ":(this.props.radioFilterPicker==="active"?"Percentage of registration in municipal election against already registered ":"Voter Profile")}</p>
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

  console.log("youhoooo",state);
  return {
    mapColor:state.changeMapColor,
    radioFilterPicker:state.radioFilterPicker,
  };
}

export default connect(mapStateToProps)(DetailedRegGovMap);

