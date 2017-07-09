import React, { Component } from 'react';
import {Popup,Circle,Marker,Tooltip,CircleMarker } from 'react-leaflet';

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class NumRegCenterMarker extends Component {

constructor(props, context) {
    super(props, context);
    this.state={rows:[]}
}

componentWillMount() {
    let array=this.props.markerData;
    console.log(array);
        let rows=[];//append all markers
        array.map((element,i)=>{
            let lat=element.center.lat
            let long=element.center.lng
            let name=element.name
            let radiuss=(parseInt(element.inscriptionCenterNumber))/3
            console.log(lat);
            rows.push(<CircleMarker center={[lat, long]} radius={radiuss} color="red"  key={i+name}>
                        <Tooltip>
            <span> {name} : {element.inscriptionCenterNumber} Registration center</span>
          </Tooltip>
                    </CircleMarker>
            )
        })
        this.setState({rows:rows});
}

    render() {
        return (
            <div>
            {!this.props.regCenterCheckBox ?
            <div>
            {this.state.rows}
            </div>: <div></div> }
            </div>
        );
    }
}

function mapStateToProps(state) {

  console.log("youhoooo",state.radioFilterPicker);
  return {
    regCenterCheckBox:state.PopCheckbox
  };
}

export default connect(mapStateToProps)(NumRegCenterMarker);