import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Control from 'react-leaflet-control';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';

import { connect } from "react-redux";
import { getPickedFilter } from "../../../../actions/index";
import { bindActionCreators } from "redux";

import Translate from 'react-translate-component';

class ThemeRadio extends Component {
	constructor(props) {
		super(props);
		this.state={checkBoxValue:true,date:'_06_07'}
	}
	change(e,value){
		this.props.getPickedFilter(value)
	}
	
    render() {
		const THEME= <Translate type="text" content="MenuDrawer.THEME"/>
		const REGVSELG= <Translate type="text" content="MenuDrawer.REGVSELG"/>
		const ACTIVEREG= <Translate type="text" content="MenuDrawer.ACTIVEREG"/>
		const VOTERPROFILE= <Translate type="text" content="MenuDrawer.VOTERPROFILE"/>
		
		let styles=this.props.styles
		let defaultSelecteds=this.props.defaultSelected
		//console.log(defaultSelecteds);
        return (
             <div  style={styles}>
               <h4 >
                    {THEME}
                </h4> 
	            <RadioButtonGroup  name="reg&update" defaultSelected={defaultSelecteds} onChange={this.change.bind(this)} >
					<RadioButton
					labelStyle={{color:'black'}}
					value="pop"
					label={REGVSELG}
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'black'}}
					value="active"
					label={ACTIVEREG}				        
					style={{marginTop:"7px"}}
					/>
					<RadioButton
					labelStyle={{color:'black'}}
					value="profile"
					label={VOTERPROFILE}				        
					style={{marginTop:"7px"}}
					/>
				</RadioButtonGroup>
					
             </div>
        );
    }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({ getPickedFilter}, dispatch);
}
export default connect(null, mapDispatchToProps)(ThemeRadio);