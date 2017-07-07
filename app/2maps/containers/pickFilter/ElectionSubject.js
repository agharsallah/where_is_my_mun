import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Translate from 'react-translate-component';

class ElectionSubject extends Component {
    render() {
        return (
       <div className="yeartoggle" style={{left: "1%",top: "38%"}} >
               <h4 style={{marginLeft:"10px",marginBottom:"15px",fontWeight:"600",marginRight:"25px",width:"220px"}}>
                    {<Translate content="TwoMaps.electionsubject"/>}
                </h4> 
	            <RadioButtonGroup onChange={this.props.HandleElecSubject}  name="ElectionSubject" defaultSelected="registration"  style={{marginLeft:"10px"}}>
					<RadioButton
					labelStyle={{color:'black'}}
					value="registration"
					label={<Translate content="TwoMaps.registration"/>}
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'black'}}
					value="turnout"
					label={<Translate content="TwoMaps.turnout"/>}				        
					style={{marginTop:"7px"}}
					/>
				
				</RadioButtonGroup>
             </div>
        )
    }
}

export default ElectionSubject;