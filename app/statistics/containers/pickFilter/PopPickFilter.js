import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

import { connect } from "react-redux";
import { getPopPickFilter } from "../../../actions/index";
import { bindActionCreators } from "redux";

class PopPickFilter extends Component {
    constructor(props) {
        super(props);
        this.state={value:true}
    }
    
    render() {
        return (
            <Checkbox
                key='pop'
                iconStyle={{marginRight:"5px"}}
                label="Population"
                checked={this.state.value}
                onCheck={event => {this.setState({value:!this.state.value});this.props.getPopPickFilter(!this.state.value)}}
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
export default connect(null, mapDispatchToProps)(PopPickFilter);
