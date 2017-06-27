import React, { Component } from 'react';
import {Popup,Circle,Marker } from 'react-leaflet';
const market = L.icon({iconUrl: '/img/cart.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const post = L.icon({iconUrl: '/img/post-office.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
var markerIcon;
class RegSpotMarker extends Component {
    render() {
        if (this.props.data.type=="c") {
            markerIcon=market;   
        }else if(this.props.data.type=="p"){
            markerIcon=post;
        }
        return (
            <div>
                <Marker position={JSON.parse("[" + this.props.data.latlon + "]")} icon={markerIcon} >
                <Popup minWidth={250} >
                <div className="popupinfo">
                <h4 className="centerName" >{this.props.data.city} _ {this.props.data.city_en}</h4>
                <div >
                 <h4 >{this.props.data.name}</h4>
                </div>
                </div>
                </Popup>
                </Marker>
            </div>
        );
    }
}

export default RegSpotMarker;