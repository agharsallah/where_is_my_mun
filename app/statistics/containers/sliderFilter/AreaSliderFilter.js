import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import InputRange from 'react-input-range';

import { connect } from "react-redux";
import { getAreaValue } from "../../../actions/index";
import { bindActionCreators } from "redux";

import 'react-input-range/lib/css/index.css'
class AreaSliderFilter extends Component {
    constructor(props) {
            super(props);
            this.state = {
                value: { min: 50, max: 1000 }
            };
    }
 
    //handleChange (event, index, value) {this.props.getclickedbutton(value);this.setState({value})}
    
    render() {
        return (
                <InputRange
                    disabled={this.props.radioFilterPicker=="pop"}
                    style={{fontSize:"1rem !important"}}
                    maxValue={1000}
                    minValue={50}
                    step={50}
                    formatLabel={value => `${value} km²`}
                    value={this.state.value}
                    onChange={value => {this.setState({ value });this.props.getAreaValue(value)} } />  
        );
    }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getAreaValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getAreaValue }, dispatch);
}
function mapStateToProps(state) {

  console.log("AreaSlider Coponent Youhoo",state.AreaCheckbox);
  return {
    AreaCheckbox: state.AreaCheckbox,
    radioFilterPicker:state.radioFilterPicker
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaSliderFilter);
