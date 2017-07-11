import React, { Component } from 'react';
import ElecMap from "./ElecMap";
import SocioMap from "./SocioMap";
//setting language support
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

class RootTwoMap extends Component {
    constructor(props) {
        super(props);
        this.state = {sets:["#c7e9c0", "#a1d99b", "#74c476","#41ab5d","#238b45", "#00441b"]};
    }

    getChoroplethColors(sets) {
        this.setState({sets})
    }
    render() {
        return (
            <div>
            <div className="col-md-6" ><ElecMap/></div>
            <div className="col-md-6" ><SocioMap/> </div>
                 
                
            </div>
        );
    }
}

export default RootTwoMap;