import React, { Component } from 'react';
import { Map,Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;

class MapL extends Component {
  constructor(props){
    super (props);
    this.state=({center:[35.055360, 9.749795],zoom:7})
  }
  componentWillReceiveProps(nextProps) {
    this.setState({center:nextProps.markerpos,zoom:11});

  }
  style(feature) {
     return {
            fillColor: '#cadfae',
            color: 'black',weight: 2,
	    };
	}
  render() {

    return (
 <Map maxZoom={23}  flyTo={true} center ={this.state.center} zoom={this.state.zoom} className="initialposition" style={{height:550,position:"relative",zIndex:0}}>
                    <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position= {this.props.markerpos}/>
                    <GeoJSON data= {g_mun_shapes}
                    style={this.style.bind(this)} 
                    onEachFeature={
                        (feature, layer) => {
                            layer.bindTooltip(feature.properties.name_en,{ permanent: false,className:"tooltipnamear",direction:"center" })
                      }    
                    }
                    />
                    <LayersControl position="topright" className="one">
                        <BaseLayer checked name="Leaflet">
                                <TileLayer
                                attribution="Leaflet"
                                url="https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                        </BaseLayer>
                        <BaseLayer  name="OpenStreetMap">
                            <TileLayer
                                attribution="OpenStreetMap"
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>
                    </LayersControl>
                </Map>
    );
  }
}

export default MapL;