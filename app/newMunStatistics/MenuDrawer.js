import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import ColorBrew from './dynamic color/ColorBrew';
import {Link} from 'react-router' ;
import StateSliderFilter from './containers/sliderFilter/StateSliderFilter' ;


import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
    }
    handleToggle() {this.setState({open: !this.state.open})}

    render() {
        return (
            <div>
                <RaisedButton
                className="oneDrawerButton"
                label={_t('statDrawer.open')}
                primary={true}
                onClick={this.handleToggle.bind(this)}
                />
                <Drawer width={"30%"}  open={this.state.open}  onRequestChange={(open) => this.setState({open})}>
                    <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
                    <div className="mb-30">&nbsp;</div>


                    <div style={{marginLeft:"2rem",marginTop:"2rem"}}>
                        <h3 className="widget-title"  >Filter by type</h3>
                    </div>
                    <div style={{margin:"2rem"}}>    
                        <StateSliderFilter />
                    </div>  

                    <div style={{marginLeft:"2rem",marginTop:"2rem"}}>
                        <ColorBrew />
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

export default MenuDrawer;