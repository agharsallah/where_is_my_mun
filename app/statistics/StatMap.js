import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import axios from 'axios' ;
import IrieMarker from './IrieMarker' ; 

class StatMap extends Component {
    constructor(props){
        super(props);
        this.state={feature:"",shape:g_mun_shapes,key:1,Irie:[]}
    }
    
    componentWillMount() {
        let qString="http://localhost:3000/api/shape/All";
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

    let qString2="http://localhost:3000/api/iries/";
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
         console.log(response.data);
         console.log(typeof(response.data.data));
         this.setState({Irie:response.data});
        }
    )
    .catch(function (error) {
        console.log(error);
    });
    
}
    
     getColor(d) {
	    return d > 30 ? '#000000' :
	           d > 20  ? '#2c7fb8' :
	           d > 18  ? '#81D4FA' :
	           d > 12  ? '#B3E5FC' :
	           d == 'inexistant'? '#FFFFFF' :
	                      '#B2DFDB';
	}
    style(feature) {
	    return {
	       fillColor: '#cadfae',
            color: 'black',weight: 2,
	    };
	}
    highlightFeature(e) {
	    var layer = e.target;
     this.setState({feature:layer.feature.properties.seats});
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
	        weight: 5,

	    });
        this.setState({feature:""});
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
                      }    
                    }
                    />
                    <GeoJSON
                    key={this.state.key}
                    data= {this.state.shape}
                    style={this.style.bind(this)} 
                    onEachFeature={
                        (feature, layer) => {
                            layer.bindTooltip(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"center" })
                      }    
                    }
                    />
                    {this.props.checkedIrieButton?
                         <FeatureGroup color='purple'>
                          {this.state.Irie.map(function(object, i){
                              console.log(object.latlon);
                              console.log(object);
                            return <IrieMarker data={object.data}  title={object.data.city_en} key={i} />;
                            })}
                        </FeatureGroup>:
                        <div/>
                    }
                </Map>

        );
    }
}

export default StatMap;
