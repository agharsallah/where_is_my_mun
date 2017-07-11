import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { connect } from "react-redux";
import { getStateValue } from "../../../actions/index";
import { bindActionCreators } from "redux";

import 'react-input-range/lib/css/index.css'
class StateSliderFilter extends Component {
 
    //handleChange (event, index, value) {this.props.getclickedbutton(value);this.setState({value})}
    
    render() {
        return (
            <div>  
            <RadioButtonGroup name="state of mun" defaultSelected="All" onChange={(e,value) => {console.log(value); this.props.getStateValue(value)} }>
                <RadioButton
                    value="All"
                    label="All"
                    disabled={!this.props.StateCheckbox}
                />
                <RadioButton
                    value="New"
                    label="New"
                    disabled={!this.props.StateCheckbox}
                />
                <RadioButton
                    value="Old"
                    label="Old"
                    disabled={!this.props.StateCheckbox}
                />
                <RadioButton
                    value="Extended"
                    label="Extended"
                    disabled={!this.props.StateCheckbox}
                />
            </RadioButtonGroup>
                 </div>
        );
    }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getStateValue }, dispatch);
}
function mapStateToProps(state) {

  console.log("StateSlider Component Youhoo",state.StateCheckbox);
  return {
    StateCheckbox: state.StateCheckbox,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StateSliderFilter);
