import React, { Component } from 'react';
import MapL from './MapL.jsx';
import inside from 'point-in-polygon';
import SearchOne from './SearchOne' ;
import SearchTwo from './SearchTwo' ;
class App extends Component {
    
    constructor(props){
        super(props);
        this.state=({isGeocodingError:false,foundAddress:[0, 0],munname:"Type an address Or a known place next to the Citizen's home"})
        this.geocodeAddress=this.geocodeAddress.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.setSearchInputElementReference=this.setSearchInputElementReference.bind(this);
    }
    componentDidMount() {
        
    var mapElement = this.mapElement;
    this.geocoder = new google.maps.Geocoder();
}

    geocodeAddress(address){
    this.geocoder.geocode({  componentRestrictions: {country: 'TN'},'address': address }, function handleResults(results, status) {
        console.log(results[0].geometry.location)
      if (status === google.maps.GeocoderStatus.OK) {
        const MarkerLatLon=[ results[0].geometry.location.lat(),results[0].geometry.location.lng()];
        this.setState({
          foundAddress:MarkerLatLon,
          isGeocodingError: false
        });
        console.log('Adress founded');
        //get the name of which the point
        console.log(g_mun_shapes.features[0].geometry.coordinates[0])
        var AllSahapsArray=g_mun_shapes.features;
        const MarkerLonLat=[ results[0].geometry.location.lng(),results[0].geometry.location.lat()];
        for (var i = 0; i < AllSahapsArray.length; i++) {
            var shapeCoord=g_mun_shapes.features[i].geometry.coordinates[0];
            if (inside(MarkerLonLat,shapeCoord)) {
                let text = "Your municipality is : "+ AllSahapsArray[i].properties.name_en+" --("+AllSahapsArray[i].properties.circ+")";
                this.setState({munname:text});
            }
        }
        }else{
          this.setState({
          foundAddress: null,
          isGeocodingError: true
        });
        }
      
    }.bind(this));
  }
    
    handleFormSubmit(e){
        e.preventDefault();
        var address = this.searchInputElement.value;
        console.log(address)
        this.geocodeAddress(address);
    }


setSearchInputElementReference(inputReference){
     this.searchInputElement = inputReference;
}
setMapElementReference(mapElementReference){
     this.mapElement = mapElementReference;
}
    render() {
        return (
    <div className="container">

        <div className="row">
          <SearchOne handleFormSubmit={this.handleFormSubmit} setSearchInputElementReference={this.setSearchInputElementReference}  />
        </div>
        <div className="row">
          <div className="col-sm-12">

            {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <h4 className="bg-info">{this.state.munname} </h4>}

           {/* <div className="map" ref={this.setMapElementReference.bind(this)}></div>*/}
            <div className="map"><MapL markerpos={this.state.foundAddress}/></div>
          </div>
        </div>
      </div>
        );
    }
}

export default App;