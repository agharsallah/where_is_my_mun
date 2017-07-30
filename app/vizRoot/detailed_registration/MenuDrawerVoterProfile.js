import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router' ;
import ThemeRadio from './containers/pickFilter/ThemeRadio' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import PopSliderFilter from './containers/sliderFilter/PopSliderFilter' ;



import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
class MenuDrawerVoterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true,radioChart:"difference"};
    }
    handleToggle() {this.setState({open: !this.state.open})}
    
    handleRadioChart(e,value){
        this.setState({radioChart:value});
        this.props.getRadioChart(value)
    }
    render() {
        return (
            <div>
                <RaisedButton
                style={{position: "absolute",right: "2vh",top: "50vh"}}
                label={_t('statDrawer.open')}
                primary={true}
                onClick={this.handleToggle.bind(this)}
                />
                <Drawer width={"25%"}
                        open={this.state.open}
                        openSecondary={true}
                        containerStyle={{top:"12vh"}}
                        onRequestChange={(open) => this.setState({open})}>
                    <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />

                    <div>
                        <ThemeRadio styles={{borderRadius:"10px",paddingLeft:"2vh"}} defaultSelected="profile" />
                    </div>
                    
                    {/* Slider filter */}
                    <div style={{padding:"2vh"}}>
                        <h4 >
                            Map Age Slider :
                        </h4>   
                    </div>
                    <div style={{paddingRight:"4vh",paddingLeft:"4vh"}}>  
                        <PopSliderFilter />
                    </div>  

                    {/* Left chart controller */}
                    <div style={{paddingTop:"5vh",paddingLeft:"2vh"}}>
                        <h4 >
                            Chart Options :
                        </h4>   
                    </div>
                    <div  style={{paddingLeft:"2vh"}}>
                                <RadioButtonGroup name="activeVoterChart"  onChange={this.handleRadioChart.bind(this)} valueSelected={this.state.radioChart} >
                                    <RadioButton
                                        value="age"
                                        label="Age Percentage"
                                    />
                                    <RadioButton
                                        value="difference"
                                        label="male/female difference"
                                    />
                                    <RadioButton
                                        value="barChart"
                                        label="Age Histogram"
                                    />
                                </RadioButtonGroup>
                    </div>

                    <div style={{marginLeft:"2rem",marginTop:"2rem"}}>
                        <RaisedButton label="Back" 
                        containerElement={<Link to="/" />} 
                        linkButton={true} />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default MenuDrawerVoterProfile;