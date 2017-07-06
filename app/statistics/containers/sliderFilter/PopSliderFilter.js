import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import InputRange from 'react-input-range';

import { connect } from "react-redux";
import { getPopValue } from "../../../actions/index";
import { bindActionCreators } from "redux";

import 'react-input-range/lib/css/index.css'
class PopSliderFilter extends Component {
    constructor(props) {
            super(props);
            this.state = {
                value: { min: 5000, max: 90000 },
                disabling:true
            };
    }
 
    //handleChange (event, index, value) {this.props.getclickedbutton(value);this.setState({value})}
    
    render() {
        return (
                <InputRange
                    disabled={this.props.radioFilterPicker=="area"}
                    style={{fontSize:"1rem !important"}}
                    maxValue={90000}
                    minValue={5000}
                    step={5000}
                    value={this.state.value}
                    onChange={value => {this.setState({ value });this.props.getPopValue(value)} } />  
        );
    }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getPopValue }, dispatch);
}
function mapStateToProps(state) {

  console.log("PopSlider Coponent Youhoo",state.PopCheckbox);
  return {
    PopCheckbox: state.PopCheckbox,
    radioFilterPicker:state.radioFilterPicker
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopSliderFilter);
