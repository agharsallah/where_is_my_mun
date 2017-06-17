import React, { Component } from 'react';
import { Map,Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import { isEqual } from 'underscore'
import PollingCenter from './PollingCenter' ;
class MapL extends Component {
  constructor(props){
    super (props);
    this.state=({shape:g_mun_shapes,center:[35.055360, 9.749795],zoom:7})
  }

  
/*  componentWillMount() {
    console.log(this.props.shape);
  }*/
  
  componentWillReceiveProps(nextProps) {
    if (isEqual(nextProps.markerpos, [0, 0])) {
      //console.log(nextProps.shape);
        this.setState({shape:JSON.parse(nextProps.shape)})
    }else{
     this.setState({center:nextProps.markerpos,zoom:13,shape:JSON.parse(nextProps.shape)});
    }

  }
  style(feature) {
     return {
            fillColor: '#cadfae',
            color: 'black',weight: 2,
	    };
	}
  
  render() {

    //console.log('RRREENNDDEERR');
    if (typeof this.props.shape==='string') {
     // console.log('changes');
      var shape = JSON.parse(this.props.shape)
      //console.log(typeof(shape));
    }else{
      //console.log('render MpL object');
      var shape =this.props.shape
    }
    
    return (
 <Map  id='map' ref='map' maxZoom={23}  flyTo={true} center ={this.state.center} zoom={this.state.zoom} className="initialposition two " style={{height:550,position:"relative",zIndex:0}}>
                    <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    <Marker position= {this.props.markerpos}/>
                    <GeoJSON
                    key={this.props.key}
                    data= {shape}
                    style={this.style.bind(this)} 
                    onEachFeature={
                        (feature, layer) => {
                            layer.bindTooltip(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"center" })
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
                        
 {/* <LayersControl.Overlay name='Polling center'>
    <FeatureGroup color='purple'>
       {ArianaPolling.map(function(object, i){
        return <PollingCenter lat={object.Latitude} lon={object.Longitude} title={object.Centre_de_vote} key={i} />;
        })}
    </FeatureGroup>
  </LayersControl.Overlay>*/}
                    </LayersControl>
                </Map>
    );
  }
}

export default MapL;