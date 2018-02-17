import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import IrieMarker from './IrieMarker' ; 
import Control from 'react-leaflet-control';
import MapKey from './MapKey' ;
import ReactLoading from 'react-loading';

import { connect } from "react-redux";
import { getPopValue } from "../actions/index";
import { bindActionCreators } from "redux";

class StatMap extends Component {
    constructor(props){
        super(props);
        this.state={key:1,Irie:[],seats:"" ,population:"" ,etat:"" ,gouv_name:"",destroy:true,
        grades:[0,5000, 10000,20000,40000, 70000 ],keytitle:"Number of population per Municipality",colorfun:this.getColor}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.radioFilterPicker=="pop") {
            this.setState({grades:[0,5000, 10000,20000,40000, 70000 ],
                keytitle:"Number of population per Municipality",
                colorfun:this.getColor
            });
        }
        else if(nextProps.radioFilterPicker=="area"){
            this.setState({grades:[100,200,400,600,800],
                keytitle:"Km² Area per Municipality",
                colorfun:this.getColorArea});

        }
    }
    
     getColor(d,c1) {
        if      (d >70000)      {return (c1[5]); }
        else if (d >40000)      {return (c1[4]);}
        else if (d>20000)        {return (c1[3]);}
        else if (d>10000)        {return (c1[2]);}
        else if (d>5000)        {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

    getColorArea(d,c1) {
        if      (d >800)      {return (c1[5]); }
        else if (d >600)      {return (c1[4]);}
        else if (d>400)        {return (c1[3]);}
        else if (d>200)        {return (c1[2]);}
        else if (d>100)        {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

    style(feature) {
        //check for what we have checked as filter subject : Population || state ||
         if(this.props.radioFilterPicker=="area"){
            const slider = this.props.areaFilter;
            if ((parseInt(feature.properties.area)>=slider.min)&&(parseInt(feature.properties.area)<=slider.max)) {
                var AREA = parseInt(feature.properties.area);
            }else {var AREA = "norange";}
            
            if ((slider.min==50)&&(parseInt(feature.properties.area)<50)) {
                var AREA = parseInt(feature.properties.area); 
            }
            if ((slider.max==1000)&&(parseInt(feature.properties.area)>1000)) {
                var AREA = parseInt(feature.properties.area); 
            }
            
            return {
                fillColor: this.getColorArea(AREA,this.props.mapColor),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };            
        }  else {
            const slider = this.props.popFilter;
            if ((feature.properties.POP>=slider.min)&&(feature.properties.POP<=slider.max)) {
                var POPULATION = feature.properties.POP;
            }else {var POPULATION = "norange";}
            if ((slider.min==5000)&&(feature.properties.POP<5000)) {
                var POPULATION = feature.properties.POP; 
            }
            if ((slider.max==90000)&&(feature.properties.POP>90000)) {
                var POPULATION = feature.properties.POP; 
            }
            
            return {
                fillColor: this.getColor(POPULATION,this.props.mapColor),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };
        }

	}

    highlightFeature(e) {
	    const layer = e.target;
        const property = layer.feature.properties;
     this.setState({destroy:false,seats:property.chair,population:property.POP,etat:property.etat,gouv_name:property.LABEL});
    return layer.setStyle( {
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
	}
    resetFeature(e) {
	    var layer = e.target;
	     layer.setStyle({
	        weight: 5
	    });
                this.setState({destroy:true});

	}

    render() {
        var grades=[0,10000, 20000,30000,40000, 60000 ]
        const position = [34.855360, 8.8049795];
        return (
                <div>
                {this.props.shapeIsLoaded ? <Map  maxZoom={23} center={position} zoom={7} className="initialposition" style={{height: "100vh", width: "100vw",position:"relative",zIndex:0}}>
                    <TileLayer
                    url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="www.mapbox.com">MapBox</a>'
                    />
                    <GeoJSON
                    key={"a"+this.state.key}
                    data= {this.props.shape}
                    style={this.style.bind(this)} 
                    onEachFeature={
                        (feature, layer) => {
                            layer.bindTooltip(feature.properties.LABEL,{ permanent: false,className:"tooltipnamear",direction:"center" })
                            layer.on({mouseover: this.highlightFeature.bind(this)});
                            layer.on({mouseout: this.resetFeature.bind(this)});   
                    }    
                    }
                    />

                    {this.props.checkedIrieButton?
                         <FeatureGroup color='purple'>
                            {this.state.Irie.map(function(object, i){
                                //console.log(object.latlon);
                                //console.log(object);
                                return <IrieMarker data={object.data} key={i} />;
                            })}
                        </FeatureGroup>:
                        <div/>
                    }
                {/**/}
                    <Control position="bottomright" >

                        <MapKey colorSet={this.props.mapColor} grades={this.state.grades} getColor={this.state.colorfun} keyTitle={this.state.keytitle} />
                    </Control>
                    {/*show the information Div*/}
                    {(this.state.destroy==false)?<div className="one">{this.state.population}</div>: <div>aaaaa</div> }
                </Map>:
                <div>
                    <div className="col-md-7"></div>
                    <div className="col-md-5" style={{marginTop:"40vh"}}>
                        <h2>"Loading Map"</h2>
                        <ReactLoading type="bars" color="#444" className="react-Loader" delay={0} />
                    </div>
                </div>
            }
            </div>
        );
    }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of StatMap
  console.log("youhoooo",state);
  return {
    checkedIrieButton:state.irieCheckbox,
    mapColor:state.changeMapColor,
    
    popFilter: state.popFilter,
    areaFilter: state.areaFilter,

    popCheckbox:state.PopCheckbox,
    areaCheckbox:state.AreaCheckbox,
    radioFilterPicker:state.radioFilterPicker
  };
}

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps)(StatMap);

