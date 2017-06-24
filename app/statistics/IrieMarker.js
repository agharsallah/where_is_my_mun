import React, { Component } from 'react';
import {Popup,Circle,Marker } from 'react-leaflet';
const polling = L.icon({iconUrl: '/img/office-block.svg',iconSize: [30, 30],iconAnchor: [20, 20]});

class IrieMarker extends Component {
    render() {
        const phone=this.props.data.phone
        console.log(typeof(phone));
        return (
            <div>
                <Marker position={JSON.parse("[" + this.props.data.latlon + "]")} icon={polling} >
                <Popup minWidth={250} >
                <div className="popupinfo">
                <h4 className="centerName" >{this.props.data.city} _ {this.props.data.city_en}</h4>
                <div id="container1" >
                 <img className="blockleft" src="/img/mobile-phone.svg" width="25px" height='25px' alt='phone img'  />
                 <h4  className="blockright" dir="rtl" >{phone}</h4>
                </div>
                <div id="container2">
                 <img className="blockleft" src="/img/mailing.svg" width="25px" height='25px' alt='phone img'  />
                 <h4 className="blockright" >{this.props.data.mail}</h4>
                </div>
                </div>
                </Popup>
                </Marker>
            </div>
        );
    }
}

export default IrieMarker;