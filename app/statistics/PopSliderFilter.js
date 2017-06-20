import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
class PopSliderFilter extends Component {
    constructor(props) {
            super(props);
            this.state = {
                value: { min: 0, max: 5 },
            };
    }
 
    handleChange (event, index, value) {this.props.getclickedbutton(value);this.setState({value})}
    
    render() {
        return (
                <InputRange
                    maxValue={20}
                    minValue={0}
                    step={5}
                    value={this.state.value}
                    onChange={value => {this.setState({ value });this.props.getPopSlider(value)}} />  
        );
    }
}

export default PopSliderFilter;