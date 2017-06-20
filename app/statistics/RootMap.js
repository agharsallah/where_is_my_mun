import React, { Component } from 'react';
import MenuDrawer from './MenuDrawer';
import StatMap from "./StatMap";
//setting language support
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

class RootMap extends Component {
    constructor(props) {
        super(props);
        this.state = {buttonclicked:"all"};
    }
    getPopSlider(val) {
        console.log(val);
        this.setState({buttonclicked:val});
    }
    render() {
        return (
            <div>
                <StatMap selectedMarker={this.state.buttonclicked}/>
                <MenuDrawer getPopSlider={this.getPopSlider.bind(this)}/>
            </div>
        );
    }
}

export default RootMap;