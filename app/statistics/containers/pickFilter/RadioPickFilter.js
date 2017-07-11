import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { connect } from "react-redux";
import { getPickedFilter } from "../../../actions/index";
import { bindActionCreators } from "redux";

class RadioPickFilter extends Component {
    render() {
        return (
            <RadioButtonGroup name="filter" defaultSelected="pop" onChange={ (e,value) => {console.log(value);this.props.getPickedFilter(value)} }>
                <RadioButton
                    value="pop"
                    label="Population"
                    className="col-md-3"
                />
                <RadioButton
                    value="area"
                    label="Area"
                    className="col-md-3"
                />
            </RadioButtonGroup>            
        );
    }
}
// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getPickedFilter }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(null, mapDispatchToProps)(RadioPickFilter);
