import React, { Component } from 'react';
import MenuDrawer from './MenuDrawer';
import StatMap from "./StatMap";
/*Color Choice*/
import ColorBrew from './dynamic color/ColorBrew';
//setting language support
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

class RootMap extends Component {
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
                <StatMap/> 
                <MenuDrawer/>
            </div>
        );
    }
}

export default RootMap;