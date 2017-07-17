import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { connect } from "react-redux";
import { getStateValue } from "../../../../actions/index";
import { bindActionCreators } from "redux";

import 'react-input-range/lib/css/index.css'
class SelectRegUpd extends Component {
    constructor(props) {
        super(props);
        this.state={selectValue:"registration"}
    }
        handleSelectField(event, index, selectValue){this.setState({selectValue});}
     
    render() {
        return (
            <div>  
                <RadioButtonGroup name="state of mun" defaultSelected="All" onChange={(e,value) => {console.log(value); this.props.getStateValue(value)} }>
                <SelectField
                    style={{marginLeft:"2rem",marginTop:"2rem"}}
                    floatingLabelText="Registration/Updae"
                    value={this.state.selectValue}
                    onChange={this.handleSelectField.bind(this)}
                >
                    <MenuItem value="registration" primaryText="Registration" />
                    <MenuItem value="update" primaryText="Update" />
                </SelectField>
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


export default connect(null, mapDispatchToProps)(SelectRegUpd);
