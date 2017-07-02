import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import axios from 'axios' ;
import IrieMarker from './IrieMarker' ; 
import config from '../config'

import { connect } from "react-redux";
import { getPopValue } from "./actions/index";
import { bindActionCreators } from "redux";

class StatMap extends Component {
    constructor(props){
        super(props);
        this.state={feature:"",shape:g_mun_shapes,key:1,Irie:[],seats:"" ,population:"" ,etat:"" ,gouv_name:"",destroy:true}
    }
    
    componentWillMount() {
        let qString=config.apiUrl+"/api/shape/AllShapes";
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
         this.setState({shape:JSON.parse(response.data.data),key:2});
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
    
     getColor(d,c1) {
        if      (d >60000)      {return (c1[5]); }
        else if (d >40000)      {return (c1[4]);}
        else if (d>30000)        {return (c1[3]);}
        else if (d>20000)        {return (c1[2]);}
        else if (d>10000)        {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

    style(feature) {
        //check for what we have checked as filter subject : Population || state ||
        const slider = this.props.popSlider;
        if ((feature.properties.POP>=slider.min)&&(feature.properties.POP<=slider.max)) {
            var POPULATION = feature.properties.POP;
        }else {var POPULATION = "norange";}
        if ((slider.min==10000)&&(feature.properties.POP<10000)) {
            var POPULATION = feature.properties.POP; 
        }
        if ((slider.max==90000)&&(feature.properties.POP>90000)) {
            var POPULATION = feature.properties.POP; 
        }
        
	    return {
            fillColor: this.getColor(POPULATION,this.props.mapColor),
            color: 'black',
            weight: 2,
            fillOpacity: 0.8
	    };
	}

    highlightFeature(e) {
	    const layer = e.target;
        const property = layer.feature.properties;
     this.setState({destroy:false,seats:property.chair,population:property.POP,etat:property.etat,gouv_name:property.LABEL});
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
	
        const position = [34.855360, 8.8049795];
        return (
            
                <Map  maxZoom={23} center={position} zoom={7} className="initialposition" style={{height: "100vh", width: "100vw",position:"relative",zIndex:0}}>
                    <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <GeoJSON
                    key={"a"+this.state.key}
                    data= {this.state.shape}
                    style={this.style.bind(this)} 
                    onEachFeature={
                        (feature, layer) => {
                            layer.bindTooltip(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"center" })
                            layer.on({mouseover: this.highlightFeature.bind(this)});
                            layer.on({mouseout: this.resetFeature.bind(this)});   
                    }    
                    }
                    />

                    {this.props.checkedIrieButton?
                         <FeatureGroup color='purple'>
                            {this.state.Irie.map(function(object, i){
                                //console.log(object.latlon);
                                //console.log(object);
                                return <IrieMarker data={object.data} key={i} />;
                            })}
                        </FeatureGroup>:
                        <div/>
                    }
                    {/*show the information Div*/}
                    {(this.state.destroy==false)?<div className="one">{this.state.population}</div>: <div>aaaaa</div> }
                </Map>

        );
    }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of StatMap
  console.log("youhoooo",state);
  return {
    popSlider: state.popSlider,
    checkedIrieButton:state.irieCheckbox,
    mapColor:state.mapColor
  };
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps)(StatMap);

