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
                    label="All (350)"
                />
                <RadioButton
                    value="New"
                    label="New (86)"
                />
                <RadioButton
                    value="Extended"
                    label="Extended (189)"
                />
                <RadioButton
                    value="Old"
                    label="Old (75)"
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


export default connect(null, mapDispatchToProps)(StateSliderFilter);
