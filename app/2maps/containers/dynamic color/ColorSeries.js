import React, { Component } from 'react';

import { connect } from "react-redux";
import { getColorSets } from "../../actions/index";
import { bindActionCreators } from "redux";

class ColorSeries extends Component {
    constructor(props){
        super(props);
        this.state={selectedseries:null}
    }

  testclick(e){
        this.setState({selectedseries:this.props.colorRange});
        let colorRange = this.props.colorRange;
        //save the chosen color range in the redux store
        this.props.getColorSets(colorRange);
  }
  

  
    render() {
        var rows=[];
        let colorRange=this.props.colorRange
        for (var i = 0; i < colorRange.length; i++) {
            let key=`${this.props.keys} ${i}`
            rows.push(<div key={key} className='square' style={{background:colorRange[i]}} />)
        }
        return (
             <div id="squareBrew"  onClick={this.testclick.bind(this)}>
                {rows}
            </div>
        );
    }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever getPopValue is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ getColorSets }, dispatch);
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(null, mapDispatchToProps)(ColorSeries);
