import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

import { connect } from "react-redux";
import { getAreaPickFilter } from "../actions/index";
import { bindActionCreators } from "redux";

class AreaPickFilter extends Component {
    constructor(props) {
        super(props);
        this.state={value:false}
    }
    
    render() {
        return (
            <Checkbox
            key='area'
                label="Area"
                onCheck={event => {this.setState({value:!this.state.value});this.props.getAreaPickFilter(!this.state.value)}}
            />
        );
    }
}
// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getAreaPickFilter }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(null, mapDispatchToProps)(AreaPickFilter);
