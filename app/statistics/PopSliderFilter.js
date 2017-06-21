import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
class PopSliderFilter extends Component {
    constructor(props) {
            super(props);
            this.state = {
                value: { min: 10000, max: 90000 },
            };
    }
 
    //handleChange (event, index, value) {this.props.getclickedbutton(value);this.setState({value})}
    
    render() {
        return (
                <InputRange
                    style={{fontSize:"1rem !important"}}
                    maxValue={90000}
                    minValue={10000}
                    step={10000}
                    value={this.state.value}
                    onChange={value => {this.setState({ value });this.props.getPopSlider(value)}} />  
        );
    }
}

export default PopSliderFilter;