import React, { Component } from 'react';
import MenuDrawer from './MenuDrawer';
import StatMap from "./StatMap";
//setting language support
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

class RootMap extends Component {
    constructor(props) {
        super(props);
        this.state = {SliderValues:{min:10000,max:20000},checkedIrieButton:false};
    }
    getPopSlider(val) {
        console.log(val);
        this.setState({SliderValues:val});
    }
    getIrieButton(val) {
        this.setState({checkedIrieButton:!this.state.checkedIrieButton});
    }
    render() {
        return (
            <div>
                <StatMap SliderValues={this.state.SliderValues} checkedIrieButton={this.state.checkedIrieButton} />
                <MenuDrawer getPopSlider={this.getPopSlider.bind(this)} getIrieButton={this.getIrieButton.bind(this)} />
            </div>
        );
    }
}

export default RootMap;