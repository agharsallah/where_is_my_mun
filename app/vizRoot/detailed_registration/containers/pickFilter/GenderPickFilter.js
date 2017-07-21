import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';

import { connect } from "react-redux";
import { getPopPickFilter } from "../../../../actions/index";
import { bindActionCreators } from "redux";

class GenderPickFilter extends Component {
    constructor(props) {
        super(props);
        this.state={value:true}
    }
    
    render() {
        return (
            <Toggle
                label="Gender filter"
                toggled={this.state.value}
                onToggle={(e,isInputChecked)=>{this.props.getPopPickFilter(isInputChecked);this.setState({value:isInputChecked});}}
            />            
           
        );
    }
}
// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getPopPickFilter }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(null, mapDispatchToProps)(GenderPickFilter);
