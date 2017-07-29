import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router' ;

import PopSliderFilter from './containers/sliderFilter/PopSliderFilter' ;



import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
class MenuDrawerVoterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
    }
    handleToggle() {this.setState({open: !this.state.open})}

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
                    <div className="mb-30">&nbsp;</div>

                    <div style={{marginLeft:"2rem",marginTop:"2rem"}}>
                        <h3 className="widget-title"  >Choose a Viz</h3>
                    </div>
                    <div style={{margin:"3rem"}}>    
                        <PopSliderFilter />
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