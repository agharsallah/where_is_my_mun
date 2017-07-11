import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { connect } from "react-redux";
import { getDateValue } from "../../../../actions/index";
import { bindActionCreators } from "redux";

import Translate from 'react-translate-component';

class DatePicker extends Component {
	constructor(props) {
		super(props);
		this.state={checkBoxValue:true,date:'06-07'}
	}
	
    render() {
       return (
		    <div  style={{zIndex:5000,position:"absolute",marginTop:"46vh",right:"1%"}}>
                                <SelectField
                                    floatingLabelText="Date"
                                    style={{width:"12vw"}}
                                    value={this.state.date}
                                    onChange={(event, index, value) => {this.setState({date:value});this.props.getDateValue(value)}}
                                    >
                                    <MenuItem value={"06-07"} primaryText="06-07-2017" />
                                    <MenuItem value={"07-07"} primaryText="07-07-2017" />
                                    <MenuItem value={"08-07"} primaryText="08-07-2017" />
                                    <MenuItem value={"09-07"} primaryText="09-07-2017" />
                                </SelectField>
            </div>
		
        );
    }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({ getDateValue }, dispatch);
}
export default connect(null, mapDispatchToProps)(DatePicker);