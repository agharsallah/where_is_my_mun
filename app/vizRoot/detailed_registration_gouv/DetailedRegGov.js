import React, { Component } from 'react';
import Layout from '../Layout' ;
import LineChart from './LineChart' ;
import BubbleChart from './BubbleChart' ;
import HeatMapCalendar from './HeatMapCalendar' ;
import MenuDrawer from './MenuDrawer' ;

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class DetailedRegGov extends Component {
    constructor(props) {
        super(props);
        this.state={classMenu:"col-md-3",classCharts:"col-md-7"}
    }
    getDrawerState(value){
        value==true ?this.setState({classMenu:"col-md-3",classCharts:"col-md-7"}):this.setState({classMenu:"col-md-1",classCharts:"col-md-10"})
    }

    render() {
        return (
            <div >
                <Layout/>
                <div className={this.state.classMenu}  >
                <MenuDrawer getDrawerState={this.getDrawerState.bind(this)} />
                </div>
                <div className={this.state.classCharts} style={{marginTop:"14vh"}} >
                {this.props.stateFilter=="All"?<LineChart/>:(this.props.stateFilter=="Bubble"?<BubbleChart/>:<HeatMapCalendar/>)}
                </div>
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
export default connect(mapStateToProps)(DetailedRegGov);
