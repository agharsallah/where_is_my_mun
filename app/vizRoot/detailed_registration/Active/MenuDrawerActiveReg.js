import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router' ;
import ThemeRadio from '../containers/pickFilter/ThemeRadio' ;
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MapKey from '../MapKey' ;
import PopSliderFilter from '../containers/sliderFilter/PopSliderFilter' ;

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;

class MenuDrawerActiveReg extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true,mapGender:"All"};
    }
    handleToggle() {this.setState({open: !this.state.open})}
    
    handleMapGender(e,value){
        this.setState({mapGender:value});
        this.props.getMapGender(value)
    }
    componentWillReceiveProps(nextProps) {
        nextProps.mapGender!==undefined ?
        this.setState({mapGender:nextProps.mapGender}):console.log('nothing');
    }
    
    render() {
        const BACK= <Translate type="text" content="MenuDrawer.BACK"/>
        const MAPKEY= <Translate type="text" content="MenuDrawer.MAPKEY"/>
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
                    <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />

                    <div>
                        <ThemeRadio styles={{borderRadius:"10px",paddingLeft:"2vh"}} defaultSelected="active" />
                    </div>

                    {/* Map Key */}
                    <div style={{paddingTop:"1vh",paddingLeft:"2vh"}}>
                        <h4 >
                            {MAPKEY}
                        </h4>   
                    </div>
                   
                        <div style={{padding:"1vh"}}>
                            <MapKey  colorSet={this.props.colorSet} grades={this.props.grades} getColor={this.props.getColor} keyTitle={this.props.keyTitle} key={this.state.MapGender}/>
                        </div>
                    
                
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

export default MenuDrawerActiveReg;