import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import axios from 'axios' ;
import config from '../../config'
import Control from 'react-leaflet-control';
import MapKey from './MapKey' ;
import ReactLoading from 'react-loading';
import InscriptionVsUpdateRadio from './containers/pickFilter/InscriptionVsUpdateRadio' ;

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class RegTrackMap extends Component {
    constructor(props){
        super(props);
        this.state={feature:"",shape:g_mun_shapes,shapeIsLoaded:false, key:1,Irie:[],
        inscription:"" ,update:"" ,gouv_name:"",destroy:true,
        grades:[0,2000, 3500,5000, 7000 ],keytitle:"Number of Registration 06-07 ",colorfun:this.getColor}
    }
    
    componentWillMount() {
        let qString=config.apiUrl+"/api/dailyins/shape_reg_upd-07-07";
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

        let qString2=config.apiUrl+"/api/iries/";
            axios({
                method: 'get',
                url: qString2,
                headers: {
                    'name': 'Isie',
                    'password': 'Isie@ndDi'
                }
            })
        .then(response=>{
            console.log('we got polling data frm db');
            this.setState({Irie:response.data});
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.radioFilterPicker=="pop") {
            this.setState({grades:[0,2000, 3500,5000, 7000 ],
                keytitle:"Number of Registration (06-07)",
                colorfun:this.getColor
            });
        }
        else {
            this.setState({grades:[0,450, 600,800, 1000 ],
                keytitle:"Number of polling update (06-07)",
                colorfun:this.getColorUpdate});

        }
    }
    
     getColor(d,c1) {
        if      (d >7000)      {return (c1[5]); }
        else if (d>5000)        {return (c1[4]);}
        else if (d>3500)        {return (c1[3]);}
        else if (d>2000)        {return (c1[2]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}
         getColorUpdate(d,c1) {
        if      (d >1000)      {return (c1[5]); }
        else if (d>800)        {return (c1[4]);}
        else if (d>600)        {return (c1[3]);}
        else if (d>450)        {return (c1[2]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

    style(feature) {
        //check for what we have checked as filter subject : Population || state ||
        if (this.props.radioFilterPicker=="pop") {
             var REGISTRATION = parseInt(feature.properties.inscription);
            return {
                fillColor: this.getColor(REGISTRATION,this.props.mapColor),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };
        }else if(this.props.radioFilterPicker=="update"){
            var UPDATE = parseInt(feature.properties.update);
            return {
                fillColor: this.getColorUpdate(UPDATE,this.props.mapColor),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };
        }
	}

    highlightFeature(e) {
        const layer = e.target;
        const property = layer.feature.properties;
        this.setState({destroy:false,update:property.update,inscription:property.inscription,gouv_name:property.NAME_EN});
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
        var grades=[0,10000, 20000,30000,40000, 60000 ]
        const position = [35.305360, 8.049795];
        return (
                <div>
                {this.state.shapeIsLoaded ? <Map  maxZoom={23} center={position} zoom={7} className="initialposition" style={{height: "100vh", width: "100vw",position:"relative",zIndex:0}}>
                    <TileLayer
                    url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> A.G'
                    />
                    <GeoJSON
                    key={"a"+this.state.key}
                    data= {this.state.shape}
                    style={this.style.bind(this)} 
                    onEachFeature={
                        (feature, layer) => {
                            layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:"tooltipnamear",direction:"center" })
                            layer.on({mouseover: this.highlightFeature.bind(this)});
                            layer.on({mouseout: this.resetFeature.bind(this)});   
                    }    
                    }
                    />

                    <Control position="bottomright" >
                        <MapKey colorSet={this.props.mapColor} grades={this.state.grades} getColor={this.state.colorfun} keyTitle={this.state.keytitle} />
                    </Control>
                    
                        <InscriptionVsUpdateRadio/>
                    {/*show the information Div*/}
                    {(this.state.destroy==false)?<div className="one">{this.state.population}</div>: <div>aaaaa</div> }
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

  console.log("youhoooo",state.radioFilterPicker);
  return {
    mapColor:state.changeMapColor,
    radioFilterPicker:state.radioFilterPicker
  };
}

export default connect(mapStateToProps)(RegTrackMap);

