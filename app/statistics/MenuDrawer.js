import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import PopSliderFilter from './PopSliderFilter' ;
import IrieButtonFilter from './IrieButtonFilter' ;
import ColorBrew from './dynamic color/ColorBrew';

import StatePickFilter from './containers/StatePickFilter' ;
import AreaPickFilter from './containers/AreaPickFilter' ;
import PopPickFilter from './containers/PopPickFilter' ;

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

                    <div style={{marginLeft:"2rem",marginTop:"1rem",marginBottom:"1rem"}}>
                        <h3 className="widget-title"  >Pick Filter</h3>
                     </div> 
                        <div className="col-md-12" style={{marginBottom:"2rem",paddingLeft: "initial"}}>
                            <div className="col-md-3"><PopPickFilter/> </div>
                            <div className="col-md-3"><StatePickFilter/> </div>
                            <div className="col-md-3"><AreaPickFilter/> </div>
                        </div> 
                   

                    <div style={{marginLeft:"2rem",marginTop:"2rem"}}>
                        <h3 className="widget-title"  >Filter by Population</h3>
                    </div>
                    <div style={{margin:"3rem"}}>    
                        <PopSliderFilter />
                    </div>  

                    <div style={{marginLeft:"2rem",marginTop:"5rem"}}>
                        <h3 className="widget-title"  >Marker Filter</h3>
                        <IrieButtonFilter/>   
                    </div> 

                    <div style={{marginLeft:"2rem",marginTop:"4rem"}}>
                        <ColorBrew />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default MenuDrawer;