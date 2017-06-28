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
import config from './config'
console.log('---------------------------------');
console.log(config.apiUrl);

class Geocode extends Component {
    constructor(props){
        super(props);
        this.state=({isGeocodingError:false,GeocodeOption:'Google',foundAddress:[0, 0],governorate:'',munname:"Type an address Or a known place next to the Citizen's home",translation:false,GeolocationClicked:false})
        this.geocodeAddress=this.geocodeAddress.bind(this);
        this.geocodePosition=this.geocodePosition.bind(this)
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
    saveStat(address,geocodeService){
    let qString=config.apiUrl+"/api/addstat";
    axios({
        method: 'post',
        url: qString,
        headers: {
            'name': 'Isie',
            'password': 'Isie@ndDi'
        },
        data: {
            city: this.props.gouvName,
            searchedAdress: address ,
            result: !this.state.isGeocodingError,
            service: geocodeService ,
            searchedTime: new Date
		}
    })
    .then(response=>{
        //console.log(response.data.data)
        console.log('stat saved');
        }
    )
    .catch(function (error) {
        console.log(error);
    });   

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
            //Send stat to database
            this.saveStat(address,'Google');
            }else{
                this.setState({
                foundAddress:MarkerLatLon,
                isGeocodingError: false
                });
                //console.log('Adress founded');
                this.checkShape(MarkerLonLat)
                //Send stat to database
                this.saveStat(address,'Google')
            }
        }else{
          this.setState({
          foundAddress: null,
          isGeocodingError: true
        });
        this.saveStat(address,'Google')
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
                    //console.log('we got data frm Nomination');
                    //console.log(response.data.length>0);
                 if (response.data.length>0) {
                    const lat = response.data[0].lat;
                    //console.log(lat);
                    const lon = response.data[0].lon
                    const MarkerLatLon=[lat,lon];
                    const MarkerLonLat=[lon, lat];
                    this.setState({
                        foundAddress:MarkerLatLon,
                        isGeocodingError: false
                    });
                    this.checkShape(MarkerLonLat);
                    this.saveStat(address,'OSM')
                 }else{
                    this.setState({
                    foundAddress: null,
                    isGeocodingError: true
                    }); 
                    this.saveStat(address,'OSM')
                 }
                 
            }
        )
        .catch(function (error) {
            console.log(error);
        });
  }
    
    handleFormSubmit(e){
        //console.log('FOOOOOOOOORRRRRRMMMM SSUUUUBBBBMMMIIIT');
        this.setState({governorate:'',munname:'',translation:false});
        e.preventDefault();
        var address = this.searchInputElement.value;
        if (this.state.GeocodeOption=='Google') {
            //console.log('dddddddddddddddddddddddddddddddddddd');
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
    saveAdress(lat,lng){
         //save address
        let qString=config.apiUrl+"/api/addlocationstat";
        axios({
            method: 'post',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
            data: {
                lat: lat,
                lng: lng,
                searchedTime: new Date
            }
        })
        .then(response=>{
            //console.log(response.data.data)
            console.log('stat saved');
            }
        )
        .catch(function (error) {
            console.log(error);
        });   
    }
    //function trigered when user wantes to know his location
    geocodePosition(e){
        const MarkerLonLat=[e.coords.longitude,e.coords.latitude];
        const MarkerLatLon=[e.coords.latitude,e.coords.longitude];
        this.setState({
            foundAddress:MarkerLatLon,
            isGeocodingError: false
        });
        this.checkShape(MarkerLonLat);
        //save address
        this.saveAdress(e.coords.latitude,e.coords.longitude)
    }
    error(err){this.setState({foundAddress:null,isGeocodingError: true});}
    googleGeocode(){
        let qString="https://www.googleapis.com/geolocation/v1/geolocate?key="+"AIzaSyDW8ExLsJba18G8SNcJruE-dImlxMTfa_8";
        axios({
            method: 'post',
            url: qString
        })
        .then(response=>{
            //console.log(response.data.data)
            console.log('Google Geocode');
            
             const MarkerLatLon=[response.data.location.lat,response.data.location.lng];
             const MarkerLonLat=[response.data.location.lng,response.data.location.lat];
            this.setState({
                foundAddress:MarkerLatLon,
                isGeocodingError: false
            });
            this.checkShape(MarkerLonLat);
            //save address
            this.saveAdress(response.data.location.lat,response.data.location.lng)

            }
        )
        .catch(function (error) {
            console.log(error);
        });   
    }
    handleGeoLocatio(){
        //this.setState({GeolocationClicked:true});
        //check if used browser is chrome
        var isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");
        
        if(isIOSChrome||(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false)){
            this.googleGeocode();
        }else { 
         //not chrome and supported geolocation
         if (navigator.geolocation)
        {
            console.log("navigator.geolocation is supported");
            navigator.geolocation.getCurrentPosition(this.geocodePosition,this.error,{enableHighAccuracy: true,timeout: 5000,maximumAge: 0} );
        }
        else
        {
            console.log("navigator.geolocation not supported");
            this.googleGeocode();
        }

        }

    }
    
    //function for the radio button, determine which service to use Google or OSM
    GeolocationClicked(event){
        console.log(event.target.value);
        this.setState({GeocodeOption:event.target.value});
    }

    render() {
        return (
        <div className="container">

            <div className="row">
            <SearchOne handleFormSubmit={this.handleFormSubmit.bind(this)} setSearchInputElement={this.setSearchInputElement.bind(this)}/>
            </div>
            
            <div >
            <GeoRadioButton GeolocationClicked={this.GeolocationClicked.bind(this)}/>
            </div>
            
            <div className="row">
                <div className="col-sm-12">
                    {this.state.isGeocodingError ? <p className="bg-danger">{_t('Geocode.InavailableInfo')}</p> :
                        (this.state.translation ?
                        <h4 className="bg-info">{_t('Geocode.AvailableInfo')}{this.state.munname}{_t('Geocode.AvailableInfo2')}{this.state.governorate}{_t('Geocode.AvailableInfoar')}</h4>
                        :<h4 className="bg-info">{_t('Geocode.AvailableInfo0')}</h4>)}
                    <div className="map two-elm-container">
                        <MapL key={this.props.key} shape={this.props.shape} markerpos={this.state.foundAddress} polling={this.props.polling} gouv={this.props.gouvName}/>
                        <RaisedButton onTouchTap={this.handleGeoLocatio.bind(this)} className="oneGeoLocation"  label={_t('Geocode.WhereAmI')}  />
                        <RaisedButton onTouchTap={this.handleBackClick.bind(this)} className="one"  label={_t('Geocode.BackButton')}  />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Geocode;