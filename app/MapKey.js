import React, { Component } from 'react';
const market = L.icon({iconUrl: '/img/cart.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const post = L.icon({iconUrl: '/img/post-office.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const transpot = L.icon({iconUrl: '/img/bus-stop.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const service = L.icon({iconUrl: '/img/service.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const municipality = L.icon({iconUrl: '/img/city-hall.svg',iconSize: [40, 40],iconAnchor: [20, 20]});
class MapKey extends Component {
    
    render() {


        return (
             <div className="infoLeg legend Mapkey">
                <p style={{marginLeft:"20px"}}>Map Key</p>
                <div id="container1" >
                 <img className="blockleftKey" src="/img/cart.svg" width="20px" height='20px' alt='phone img'  />
                 <h4  className="blockrightKey" >Shopping center</h4>
                </div>
                 <div id="container1" >
                 <img className="blockleftKey" src="/img/post-office.svg" width="20px" height='20px' alt='phone img'  />
                 <h4  className="blockrightKey" >Post Office</h4>
                </div>
                <div id="container1" >
                 <img className="blockleftKey" src="/img/bus-stop.svg" width="20px" height='20px' alt='phone img'  />
                 <h4  className="blockrightKey" >Transportaion station</h4>
                </div>
                <div id="container1" >
                 <img className="blockleftKey" src="/img/service.svg" width="20px" height='20px' alt='phone img'  />
                 <h4  className="blockrightKey" >Services</h4>
                </div>
                <div id="container1" >
                 <img className="blockleftKey" src="/img/city-hall.svg" width="20px" height='20px' alt='phone img'  />
                 <h4  className="blockrightKey" >Municipality</h4>
                </div>
            </div>
        );
    }
}

export default MapKey;