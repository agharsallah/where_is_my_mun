import React, { Component } from 'react';
import {Popup,Circle,Marker } from 'react-leaflet';
const polling = L.icon({iconUrl: '/img/office-block.svg',iconSize: [30, 30],iconAnchor: [20, 20]});

class PollingCenter extends Component {
    render() {
        return (
            <div>
                <Marker position={JSON.parse("[" + this.props.latlon + "]")} icon={polling} >
                <Popup>
                <h5 >{this.props.title}</h5>
                </Popup>
                </Marker>
            </div>
        );
    }
}

export default PollingCenter;