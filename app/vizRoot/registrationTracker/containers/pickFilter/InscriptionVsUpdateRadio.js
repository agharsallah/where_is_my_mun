import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Control from 'react-leaflet-control';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { connect } from "react-redux";
import { getPickedFilter } from "../../../../actions/index";
import { bindActionCreators } from "redux";

import Translate from 'react-translate-component';

class InscriptionVsUpdateRadio extends Component {
    render() {
        return (
			                    <Control position="topright" >
             <div className="infoLegendStat legend" style={{marginTop:"12vh"}}>
               <h4 >
                    Choose a parameter
                </h4> 
    <MuiThemeProvider>

	            <RadioButtonGroup  name="reg&update" defaultSelected="pop" onChange={ (e,value) => {this.props.getPickedFilter(value)} } >
					<RadioButton
					labelStyle={{color:'black'}}
					value="pop"
					label="Registration"
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'black'}}
					value="update"
					label="Update"				        
					style={{marginTop:"7px"}}
					/>
				</RadioButtonGroup>
    </MuiThemeProvider>

             </div>
</Control>
        );
    }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({ getPickedFilter }, dispatch);
}
export default connect(null, mapDispatchToProps)(InscriptionVsUpdateRadio);