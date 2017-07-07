import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Translate from 'react-translate-component';

class SocioEconomicToggle extends Component {
    render() {
        return (
             <div className="infoLegendStat legend">
               <h4 >
                    Choose a parameter
                </h4> 
				    <MuiThemeProvider>

	            <RadioButtonGroup  name="SocioEconomicToggle" defaultSelected="internetuse" >
					<RadioButton
					labelStyle={{color:'black'}}
					value="internetuse"
					label="Internetuse"
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'black'}}
					value="illetracy"
					label="Illetracy"				        
					style={{marginTop:"7px"}}
					/>
					<RadioButton
					labelStyle={{color:'black'}}
					value="bac"
					label="Bac exam"				        
					style={{marginTop:"7px"}}
					/>
				</RadioButtonGroup>
				    </MuiThemeProvider>

             </div>
        );
    }
}

export default SocioEconomicToggle;