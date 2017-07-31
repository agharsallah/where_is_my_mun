import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router' ;
import ThemeRadio from './containers/pickFilter/ThemeRadio' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MapKeyVoterProfile from './MapKeyVoterProfile' ;
import MapKey from './MapKey' ;
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
    componentWillReceiveProps(nextProps) {
        nextProps.radioChart!==undefined ?
        this.setState({radioChart:nextProps.radioChart}):console.log('nothing');
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
                <Drawer width={"20%"}
                        open={this.state.open}
                        openSecondary={true}
                        containerStyle={{top:"12vh",height:"88%"}}
                        onRequestChange={(open) => this.setState({open})}
                        zDepth={2}
                >
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
                                        value="difference"
                                        label="male/female difference"
                                    />
                                    <RadioButton
                                        value="age"
                                        label="Age Percentage"
                                    />
                                </RadioButtonGroup>
                    </div>
                    {/* Map Key */}
                    <div style={{paddingTop:"1vh",paddingLeft:"2vh"}}>
                        <h4 >
                            Map Key :
                        </h4>   
                    </div>
                    {
                        this.state.radioChart==="difference"?
                        <div style={{padding:"1vh"}}>
                            <MapKeyVoterProfile  colorSet={this.props.colorSet} grades={this.props.grades} getColor={this.props.getColor} keyTitle={this.props.keyTitle} key={this.state.radioChart}/>
                        </div>:
                        <div style={{padding:"1vh"}}>
                            <MapKey  colorSet={this.props.colorSet} grades={this.props.grades} getColor={this.props.getColor} keyTitle={this.props.keyTitle} key={this.state.radioChart}/>
                        </div>
                    }
                
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