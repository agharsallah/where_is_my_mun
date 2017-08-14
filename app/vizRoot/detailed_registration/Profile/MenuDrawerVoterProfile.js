import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router' ;
import ThemeRadio from '../containers/pickFilter/ThemeRadio' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MapKeyVoterProfile from './MapKeyVoterProfile' ;
import MapKey from '../MapKey' ;
import PopSliderFilter from '../containers/sliderFilter/PopSliderFilter' ;

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
    componentWillReceiveProps(nextProps) {
        nextProps.radioChart!==undefined ?
        this.setState({radioChart:nextProps.radioChart}):console.log('nothing');
    }
    
    render() {
        const SLIDERTITLE= <Translate type="text" content="MenuDrawer.SLIDERTITLE"/>
        const OPTIONTITLE= <Translate type="text" content="MenuDrawer.OPTIONTITLE"/>
        const MALE_FEMALE_DIFF= <Translate type="text" content="MenuDrawer.MALE_FEMALE_DIFF"/>
        const AGEPER= <Translate type="text" content="MenuDrawer.AGEPER"/>
        const MAPKEY= <Translate type="text" content="MenuDrawer.MAPKEY"/>
        const BACK= <Translate type="text" content="MenuDrawer.BACK"/>
        const MENU= <Translate type="text" content="MenuDrawer.MENU"/>
        
        return (
            <div>
                <RaisedButton
                style={{position: "absolute",right: "2vh",top: "50vh"}}
                label={_t('statDrawer.open')}
                primary={true}
                onClick={this.handleToggle.bind(this)}
                />
                <Drawer width={"20%"}
                        open={this.state.open}
                        openSecondary={true}
                        containerStyle={{top:"12vh",height:"88%",zIndex:"1001"}}
                        onRequestChange={(open) => this.setState({open})}
                        zDepth={2}
                >
                    <AppBar title={MENU} onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />

                    <div>
                        <ThemeRadio styles={{borderRadius:"10px",paddingLeft:"2vh"}} defaultSelected="profile" />
                    </div>
                    
                    {/* Slider filter */}
                    <div style={{padding:"2vh"}}>
                        <h4 >
                            {SLIDERTITLE}
                        </h4>  
                    </div>
                    <div style={{paddingRight:"4vh",paddingLeft:"4vh"}}>  
                        <PopSliderFilter />
                    </div>  

                    {/* Left chart controller */}
                    <div style={{paddingTop:"5vh",paddingLeft:"2vh"}}>
                        <h4 >
                            {OPTIONTITLE}
                        </h4>   
                    </div>
                    <div  style={{paddingLeft:"2vh"}}>
                                <RadioButtonGroup name="activeVoterChart"  onChange={this.handleRadioChart.bind(this)} valueSelected={this.state.radioChart} >
                                    <RadioButton
                                        value="difference"
                                        label={MALE_FEMALE_DIFF}
                                    />
                                    <RadioButton
                                        value="age"
                                        label=  {AGEPER}
                                    />
                                </RadioButtonGroup>
                    </div>
                    {/* Map Key */}
                    <div style={{paddingTop:"1vh",paddingLeft:"2vh"}}>
                        <h4 >
                           {MAPKEY}
                        </h4>   
                    </div>
                    {
                        this.state.radioChart==="difference"?
                        <div style={{padding:"1vh"}}>
                            <MapKeyVoterProfile  colorSet={this.props.colorSet} grades={this.props.grades} getColor={this.props.getColor} keyTitle={this.props.keyTitleDiff} key={this.state.radioChart}/>
                        </div>:
                        <div style={{padding:"1vh"}}>
                            <MapKey  colorSet={this.props.colorSet} grades={this.props.grades} getColor={this.props.getColor} keyTitle={this.props.keyTitleRegPerc} key={this.state.radioChart}/>
                        </div>
                    }
                
                    <div style={{marginLeft:"2rem",marginTop:"2rem"}}>
                        <RaisedButton label={BACK} 
                        containerElement={<Link to="/" />} 
                        linkButton={true} />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default MenuDrawerVoterProfile;