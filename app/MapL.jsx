import React, { Component } from 'react';
import { Map,Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';

class MapL extends Component {
  constructor(props){
    super (props);
    this.state=({center:[35.055360, 9.749795],zoom:7})
  }
  componentWillReceiveProps(nextProps) {
    this.setState({center:nextProps.markerpos,zoom:11});

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

                    >

                    </GeoJSON>

                </Map>
    );
  }
}

export default MapL;