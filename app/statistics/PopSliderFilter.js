import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import InputRange from 'react-input-range';

import { connect } from "react-redux";
import { getPopValue } from "./actions/index";
import { bindActionCreators } from "redux";

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

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(null, mapDispatchToProps)(PopSliderFilter);
