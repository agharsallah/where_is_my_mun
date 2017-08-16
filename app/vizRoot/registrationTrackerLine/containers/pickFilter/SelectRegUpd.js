import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { connect } from "react-redux";
import { getRegOrUpd } from "../../../../actions/index";
import { bindActionCreators } from "redux";

import 'react-input-range/lib/css/index.css'
class SelectRegUpd extends Component {
    constructor(props) {
        super(props);
        this.state={selectValue:"registration"}
    }
        handleSelectField(event, index, selectValue){this.setState({selectValue});this.props.getRegOrUpd(selectValue)}
     
    render() {
        return (
            <div>  
                <SelectField
                    style={{marginLeft:"2rem",marginTop:"2rem",width:"150px"}}
                    floatingLabelText="Registration/Updae"
                    value={this.state.selectValue}
                    onChange={this.handleSelectField.bind(this)}
                    iconStyle={{fill:"#00bcd4"}}
                >
                    <MenuItem value="registration" primaryText="Registration" />
                    <MenuItem value="update" primaryText="Update" />
                </SelectField>
            </div>
        );
    }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getRegOrUpd }, dispatch);
}


export default connect(null, mapDispatchToProps)(SelectRegUpd);
