import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router' ;
import StateSliderFilter from './containers/pickFilter/StateSliderFilter' ;
import SelectRegUpd from './containers/pickFilter/SelectRegUpd' ;

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
    }
    handleToggle() {this.setState({open: !this.state.open});this.props.getDrawerState(!this.state.open) }
    render() {
        return (
            <div>
                <RaisedButton
                style={{ position:"absolute",right:"2vh",top:"90vh",zIndex:"2"}}
                label="Open filter"
                primary={true}
                onClick={this.handleToggle.bind(this)}
                />
                <Drawer width={"17%"} containerStyle={{height:"90rem",top:"8rem"}}  open={this.state.open} openSecondary={true}  onRequestChange={(open) => this.setState({open})}>
                    <AppBar title="Menu"  onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
                    <div className="mb-30">&nbsp;</div>


                    <div style={{marginLeft:"2rem",marginTop:"2rem"}}>
                        <h3 className="widget-title">Choose Viz</h3>
                    </div>

                    <div style={{margin:"2rem"}}>    
                        <StateSliderFilter />
                    </div>  
                    
                    { this.props.stateFilter==="All"?
                        <SelectRegUpd/>: <div></div>
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

function mapStateToProps(state) {

  console.log("youhoooo",state);
  return {
    stateFilter:state.stateFilter
  };
}
export default connect(mapStateToProps)(MenuDrawer);