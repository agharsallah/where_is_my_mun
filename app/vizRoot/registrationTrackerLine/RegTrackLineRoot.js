import React, { Component } from 'react';
import Layout from '../Layout' ;
import LineChart from './LineChart' ;
import BubbleChart from './BubbleChart' ;
import HeatMapCalendar from './HeatMapCalendar' ;
import MenuDrawer from './MenuDrawer' ;
import config from '../../config'
import axios from 'axios' ;

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class RegTrackLineRoot extends Component {
    constructor(props) {
        super(props);
        this.state={
            classMenu:"col-md-3",classCharts:"col-md-9",dates:[],inscription:[],update:[],
            maleReg:0, femaleReg:0, sumReg:0, maleupdate:0, femaleupdate:0, sumupdate:0
        }
    }
    getDrawerState(value){
        value==true ?this.setState({classMenu:"col-md-3",classCharts:"col-md-9"}):this.setState({classMenu:"col-md-1",classCharts:"col-md-11"})
    }
    
    componentWillMount() {
         let qString=config.apiUrl+"/api/dailyins/line_daily_reg_14-07";
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            console.log('we got data data frm db');
            //console.log(response.data.data);
            let inscription=[],update=[],dates=[],datas=JSON.parse(response.data.data)
            let maleReg=0, femaleReg=0, sumReg=0, maleupdate=0, femaleupdate=0, sumupdate=0
            datas.map((object,i)=>{
                dates.push(object.date)
                inscription.push(parseInt(object.inscription))
                update.push(parseInt(object.update))
                maleReg=object.maleReg; femaleReg=object.femaleReg; sumReg=object.sumReg; maleupdate=object.maleupdate; femaleupdate=object.femaleupdate; sumupdate=object.sumupdate
            })
            dates.pop(); inscription.pop(); update.pop()
            this.setState({dates,inscription,update,maleReg,femaleReg,sumReg,maleupdate,femaleupdate,sumupdate});
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    
    render() {
        return (
            <div >
                <Layout/>
                <div className={this.state.classMenu}  >
                <MenuDrawer getDrawerState={this.getDrawerState.bind(this)} />
                </div>
                
                <div className={this.state.classCharts} style={{marginTop:"14vh"}} >
                {
                    this.props.stateFilter=="All" ? 
                    <div >
                        <LineChart
                            key={this.state.dates }
                            chartkey={this.state.classCharts}
                            dates={this.state.dates}
                            inscription={this.state.inscription} 
                            maleReg={this.state.maleReg}
                            femaleReg={this.state.femaleReg}
                            sumReg={this.state.sumReg}
                            maleupdate={this.state.maleupdate}
                            femaleupdate={this.state.femaleupdate}
                            sumupdate={this.state.sumupdate}
                        />
                    </div>
                :
                    (this.props.stateFilter=="Bubble" ? <BubbleChart/>
                        :
                        <HeatMapCalendar/>
                    )
                }
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
export default connect(mapStateToProps)(RegTrackLineRoot);
