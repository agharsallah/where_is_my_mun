import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import PopSliderFilter from './PopSliderFilter' ;
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
    }
    handleToggle() {this.setState({open: !this.state.open})}
    getPopSlider(val) {
        this.props.getPopSlider(val)
    }
    render() {
        return (
            <div>
                <RaisedButton
                className="oneDrawerButton"
                label={_t('statDrawer.open')}
                primary={true}
                onClick={this.handleToggle.bind(this)}
                />
                <Drawer width={400}  open={this.state.open}  onRequestChange={(open) => this.setState({open})}>
                    <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
                    <div className="mb-30">&nbsp;</div>
                    <div style={{marginLeft:"2rem"}}>
                        <h3 className="widget-title"  >Filter by Population</h3>
                    </div>
                    <div style={{marginLeft:"2rem",marginRight:"2rem"}}>
                <PopSliderFilter getPopSlider={this.getPopSlider.bind(this)}/>
                </div>                
                </Drawer>
            </div>
        );
    }
}

export default MenuDrawer;