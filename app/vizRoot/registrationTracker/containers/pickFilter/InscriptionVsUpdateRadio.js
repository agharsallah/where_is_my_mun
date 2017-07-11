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
             <div className="infoLegendStat legend" style={{marginTop:"12vh"}}>
               <h4 >
                    Choose a parameter
                </h4> 
    		<MuiThemeProvider>
			<div>
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
				<Checkbox
					style={{marginTop:"7px",width:"120%"}}
                    label="Registration Center number"
					checked= {!this.state.checkBoxValue}
					onCheck= {(e,checkVal)=>{this.setState({checkBoxValue:!checkVal}); this.props.getPopPickFilter(!checkVal)}}
                />				
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