import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Control from 'react-leaflet-control';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';

import { connect } from "react-redux";
import { getPickedFilter,getPopPickFilter,getDateValue } from "../../../../actions/index";
import { bindActionCreators } from "redux";

import Translate from 'react-translate-component';

class InscriptionVsUpdateRadio extends Component {
	constructor(props) {
		super(props);
		this.state={checkBoxValue:true,date:'_06_07'}
	}
	
    render() {
		var options = [{value: "_06_07",label: "06-07" },{value: "_07_07",label: "07-07" },{value: "_08_07",label: "08-07" },{value: "_09_07",label: "09-07" }]
        return (
		<Control position="topright" >
             <div className="infoLegendStat legend" style={{marginTop:"12vh",minWidth:"15vw"}}>
               <h4 >
                    Choose a parameter
                </h4> 
    		<MuiThemeProvider>
			<div>
	            <RadioButtonGroup  name="reg&update" defaultSelected="pop" onChange={ (e,value) => {this.props.getPickedFilter(value)} } >
					<RadioButton
					labelStyle={{color:'black'}}
					value="pop"
					label="Registered vs Eligible"
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'black'}}
					value="active"
					label="Active Registered"				        
					style={{marginTop:"7px"}}
					/>
					<RadioButton
					labelStyle={{color:'black'}}
					value="profile"
					label="Voter Profile"				        
					style={{marginTop:"7px"}}
					/>
				</RadioButtonGroup>
					
				</div>
    </MuiThemeProvider>

             </div>
</Control>
        );
    }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({ getPickedFilter,getPopPickFilter,getDateValue }, dispatch);
}
export default connect(null, mapDispatchToProps)(InscriptionVsUpdateRadio);