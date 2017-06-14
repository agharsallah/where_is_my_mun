import React, { Component } from 'react';
import MapL from './MapL';
import inside from 'point-in-polygon';
import SearchOne from './SearchOne' ;
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import GeoRadioButton from './GeoRadioButton' ;
import axios from 'axios' ;
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;

class Geocode extends Component {
    constructor(props){
        super(props);
        this.state=({isGeocodingError:false,GeocodeOption:'google',foundAddress:[0, 0],governorate:'',munname:"Type an address Or a known place next to the Citizen's home",translation:false})
        this.geocodeAddress=this.geocodeAddress.bind(this);
    }

    
    componentDidMount() {
        var mapElement = this.mapElement;
        this.geocoder = new google.maps.Geocoder();
    }
/*    componentWillReceiveProps(nextProps) {
        //console.log('GEEEEEOOOOOCCCCCOOOOOOOODDDDDDEEEEEUUUUPPPPPPPDAAAAAAAAAAA');
        this.setState({shapes:JSON.parse(nextProps.shape)});
        //console.log(nextProps.shape);
    }*/
    checkShape(MarkerLonLat){
        //get the name of which the point
        var shapefromdb=JSON.parse(this.props.shape)
        //console.log(shapefromdb.features[0].geometry.coordinates[0])
        //AllSahapsArray access to the geojsonshape feauture 
        var AllSahapsArray=shapefromdb.features;
        for (var i = 0; i < AllSahapsArray.length; i++) {
                    //shapeCoord access to municipality polygon (shape)
            var shapeCoord=shapefromdb.features[i].geometry.coordinates[0];
            if (inside(MarkerLonLat,shapeCoord)) {
            let munname = AllSahapsArray[i].properties.LABEL
            let governorate=AllSahapsArray[i].properties.gouv_name
            this.setState({munname,governorate,translation:true});
            }
        }
    }
    geocodeAddress(address){
      this.geocoder.geocode({componentRestrictions: {country: 'TN'},'address': address }, function handleResults(results, status) {
        //console.log(results)
        //console.log(status);
      if (status === google.maps.GeocoderStatus.OK) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng()
            const MarkerLatLon=[lat,lng];
            //for the insideµShape function
            const MarkerLonLat=[lng,lat];
            if ( (lat ==33.886917)&& (lng==9.537499000000025) ) {
                this.setState({
                foundAddress: null,
                isGeocodingError: true
                });
            }else{
                this.setState({
                foundAddress:MarkerLatLon,
                isGeocodingError: false
                });
                //console.log('Adress founded');
                this.checkShape(MarkerLonLat)
            }
        }else{
          this.setState({
          foundAddress: null,
          isGeocodingError: true
        });
        }
      
    }.bind(this));
  }
  geocodeAddressOSM(address){
        let qString=`http://nominatim.openstreetmap.org/search/${address}?format=json`
            axios({
                method: 'get',
                url: qString
            })
        .then(response=>{
            //console.log(response.data.data)
                    console.log('we got data frm Nomination');
                    console.log(response.data.length>0);
                 if (response.data.length>0) {
                    const lat = response.data[0].lat;
                    console.log(lat);
                    const lon = response.data[0].lon
                    const MarkerLatLon=[lat,lon];
                    const MarkerLonLat=[lon, lat];
                    this.setState({
                        foundAddress:MarkerLatLon,
                        isGeocodingError: false
                    });
                    this.checkShape(MarkerLonLat)
                 }else{
                    this.setState({
                    foundAddress: null,
                    isGeocodingError: true
                    }); 
                 }
                 
            }
        )
        .catch(function (error) {
            console.log(error);
        });
  }
    
    handleFormSubmit(e){
        this.setState({governorate:'',munname:'',translation:false});
        e.preventDefault();
        var address = this.searchInputElement.value;
        if (this.state.GeocodeOption=='google') {
            this.geocodeAddress(address);
        }else{
           this.geocodeAddressOSM(address); 
        }
        
    }


    setSearchInputElement(inputReference){
        this.searchInputElement = inputReference;
        console.log(inputReference);
    }

    handleBackClick(){
        this.props.BackToSelect();
    }

    handleGeocoderOption(event){
        console.log(event.target.value);
        this.setState({GeocodeOption:'OSM'});
    }
    render() {
        return (
        <div className="container">

            <div className="row">
            <SearchOne handleFormSubmit={this.handleFormSubmit.bind(this)} setSearchInputElement={this.setSearchInputElement.bind(this)}/>
            </div>
            
            <div >
            <GeoRadioButton handleGeocoderOption={this.handleGeocoderOption.bind(this)}/>
            </div>
            
            <div className="row">
                <div className="col-sm-12">
                    {this.state.isGeocodingError ? <p className="bg-danger">{_t('Geocode.InavailableInfo')}</p> :
                        (this.state.translation ?<h4 className="bg-info">{_t('Geocode.AvailableInfo')}{this.state.munname}{_t('Geocode.AvailableInfo2')}{this.state.governorate}{_t('Geocode.AvailableInfoar')}</h4>:<h4 className="bg-info">{_t('Geocode.AvailableInfo0')}</h4>)}
                    <div className="map two-elm-container">
                        <MapL key={this.props.key} shape={this.props.shape} markerpos={this.state.foundAddress}/>
                        <RaisedButton onTouchTap={this.handleBackClick.bind(this)} className="one"  label={_t('Geocode.BackButton')}  />
                         
                        </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Geocode;