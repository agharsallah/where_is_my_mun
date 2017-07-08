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