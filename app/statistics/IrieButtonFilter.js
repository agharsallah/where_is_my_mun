import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

import { connect } from "react-redux";
import { getIrieButton } from "../actions/index";
import { bindActionCreators } from "redux";

class IrieButtonFilter extends Component {
    constructor(props) {
        super(props);
        this.state={value:false}
    }
    
    render() {
        return (
            <Checkbox
            key='a'
                label="Irie"
                onCheck={event => {this.setState({value:!this.state.value});this.props.getIrieButton(!this.state.value)}}
            />
        );
    }
}
// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getIrieButton }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(null, mapDispatchToProps)(IrieButtonFilter);
