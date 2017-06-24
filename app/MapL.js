import React, { Component } from 'react';
import { Map,Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import { isEqual } from 'underscore';
import PollingCenter from './PollingCenter' ; 
import PollingFilter from './PollingFilter' ;
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Download from 'material-ui/svg-icons/File/file-download';

import { Link  } from 'react-router';


class MapL extends Component {
  constructor(props){
    super (props);
    this.state=({shape:g_mun_shapes,center:[35.055360, 8.849795],zoom:7,polling:[],checkedPollingButton:false})
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.polling);
    if (isEqual(nextProps.markerpos, [0, 0])) {
      //console.log(nextProps.shape);
        this.setState({shape:JSON.parse(nextProps.shape),polling:nextProps.polling})
    }else{
     this.setState({center:nextProps.markerpos,zoom:13,shape:JSON.parse(nextProps.shape),polling:nextProps.polling});
    }

  }
  setZoom(value){
    let center=value.split(";")
    this.setState({center:[center[0],center[1]],zoom:16});
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
    
    const pin = L.icon({iconUrl: '/img/pin.svg',iconSize: [50, 50],iconAnchor: [40, 40]});

    return (
      <div>
{/*      <Checkbox
        className="onePollingCheck"
        key='reg'
        label={_t('Geocode.RegistrationCheck')}
        onCheck={event => this.setState({checkedPollingButton:!this.state.checkedPollingButton})}
      />*/}
      <RaisedButton icon={<Download />} containerElement={<Link to="/file/registration.pdf"/>} className="oneRegistrationDownload"  label={_t('Geocode.download')}  />
      <hr className="pollingfilter" style={{width:"27%",top:"138px",backgroundColor:'black',height:"2px"}} />
      <PollingFilter polling={this.props.polling} setZoom={this.setZoom.bind(this)} />
      <Checkbox
        className="onePollingCheck"
        style={{top:"59%"}}
        key='poll'
        label={_t('Geocode.PollingCheck')}
        onCheck={event => this.setState({checkedPollingButton:!this.state.checkedPollingButton})}
      />

      <Map  id='map' ref='map' maxZoom={23}  flyTo={true} center ={this.state.center} zoom={this.state.zoom} className="initialposition two " style={{height:"80vh",position:"relative",zIndex:0}}>
                    <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    <Marker position= {this.props.markerpos} icon={pin} />
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
                     <BaseLayer checked name="Light">
                                <TileLayer
                                attribution="mapbox"
                                url="https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                        </BaseLayer>
                        <BaseLayer  name="Leaflet">
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
                    {this.state.checkedPollingButton?
                          <FeatureGroup color='purple'>
                          {this.state.polling.map(function(object, i){
                            return <PollingCenter lat={object.latitude} lon={object.longitude} title={object.center} key={i} />;
                            })}
                        </FeatureGroup>:
                        <div/>}

                </Map>
        </div>
    );
  }
}

export default MapL;