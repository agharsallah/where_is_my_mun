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
                                    iconStyle={{fill:"red"}}
                                    value={this.state.date}
                                    onChange={(event, index, value) => {this.setState({date:value});this.props.getDateValue(value)}}
                                    maxHeight={250}
                                    >
                                    <MenuItem value={"06-07"} primaryText="06-07-2017" />
                                    <MenuItem value={"07-07"} primaryText="07-07-2017" />
                                    <MenuItem value={"08-07"} primaryText="08-07-2017" />
                                    <MenuItem value={"09-07"} primaryText="09-07-2017" />
                                    <MenuItem value={"10-07"} primaryText="10-07-2017" />
                                    <MenuItem value={"12-07"} primaryText="12-07-2017" />
                                    <MenuItem value={"13-07"} primaryText="13-07-2017" />
                                    <MenuItem value={"14-07"} primaryText="14-07-2017" />
                                    <MenuItem value={"16-07"} primaryText="16-07-2017" />
                                    <MenuItem value={"18-07"} primaryText="18-07-2017" />
                                    <MenuItem value={"19-07"} primaryText="19-07-2017" />
                                    <MenuItem value={"20-07"} primaryText="20-07-2017" />
                                    <MenuItem value={"21-07"} primaryText="21-07-2017" />
                                    <MenuItem value={"22-07"} primaryText="22-07-2017" />
                                    <MenuItem value={"23-07"} primaryText="23-07-2017" />
                                </SelectField>
            </div>
		
        );
    }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({ getDateValue }, dispatch);
}
export default connect(null, mapDispatchToProps)(DatePicker);