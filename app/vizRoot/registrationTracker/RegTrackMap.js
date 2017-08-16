import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Circle,CircleMarker } from 'react-leaflet';
import axios from 'axios' ;
import config from '../../config'
import Control from 'react-leaflet-control';
import MapKey from './MapKey' ;
import ReactLoading from 'react-loading';
import InscriptionVsUpdateRadio from './containers/pickFilter/InscriptionVsUpdateRadio' ;
import ColorBrew from './containers/dynamic color/ColorBrew';
import SourceButton from './SourceButton' ;
import RaisedButton from 'material-ui/RaisedButton';
import  './regTrackMap.css' ;
import NumRegCenterMarker from './NumRegCenterMarker' ;
import StackedColumn from './StackedColumn' ;
import BasicColumnRankedInscription from './BasicColumnRankedInscription' ;

import DatePicker from './containers/pickFilter/DatePicker';

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class RegTrackMap extends Component {
    constructor(props){
        super(props);
        this.state={feature:"",shape:g_mun_shapes,shapeIsLoaded:false, key:1,
        inscription:"" ,update:"" ,gouv_name:"",newMunNumber:"",oldMunNumber:"",extMunNumber:"",munNumber:"",destroy:true,
        grades:[2000, 3500,5000, 7000 ],keytitle:"Number of Registration 06-07-2017 ",colorfun:this.getColora,
         enabledMarker:true,allInscription:[],allGouvname:[],allUpdate:[],sumInscription:0,sumUpdate:0,
         date:'06-07',dynamicReg:[2000, 3500,5000, 7000],dynamicUpdate:[450, 600,800, 1000]

        }
    }
    
    componentWillMount() {
        console.log('ssssssssssssssssssssss');
        let qString=config.apiUrl+"/api/dailyins/shape_reg_upd-23_07";
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            //console.log(response.data.data)
            console.log('we got shape data frm db');
            console.log(response);
            this.setState({shape:JSON.parse(response.data.data),key:2,shapeIsLoaded:true});
            var allInscription=[],allUpdate=[],allGouvname=[] ,sumInscription=0,sumUpdate=0        
            //making an array of all the inscription-update data
            this.state.shape.features.map((element,i)=>{
                //allInscription.push(parseInt(element.properties.inscription))
                allInscription.push({value:parseInt(element.properties["inscription"+this.props.regDate]),gouv:element.properties.NAME_EN})
                allUpdate.push({value:parseInt(element.properties["update"+this.props.regDate]),gouv:element.properties.NAME_EN})
            })
            /*making a sorted inscription-update array*/

            allInscription.sort(function(a, b){return b.value-a.value})
            allUpdate.sort(function(a, b){return b.value-a.value})
            //console.log('sorted table',allUpdate);
            /*Sum of all inscription - update*/
           allInscription.map((element)=>{sumInscription+=element.value})
           allUpdate.map((element)=>{sumUpdate+=element.value})
            this.setState({allInscription,allUpdate,sumInscription,sumUpdate});
        }
        )
        .catch(function (error) {
            console.log(error);
        });

    }
    componentWillReceiveProps(nextProps) {
         /*Make the array sort with the new time set*/
        var allInscription=[],allUpdate=[],allGouvname=[] ,sumInscription=0,sumUpdate=0        
            //making an array of all the inscription-update data
            this.state.shape.features.map((element,i)=>{
                //allInscription.push(parseInt(element.properties.inscription))
                allInscription.push({value:parseInt(element.properties["inscription"+nextProps.regDate]),gouv:element.properties.NAME_EN})
                allUpdate.push({value:parseInt(element.properties["update"+nextProps.regDate]),gouv:element.properties.NAME_EN})
            })
            //console.log(allInscription);
            
            /*making a sorted inscription-update array*/
            allInscription.sort(function(a, b){return b.value-a.value})
            allUpdate.sort(function(a, b){return b.value-a.value})
            //console.log('new sorted table',allUpdate);
        if (nextProps.radioFilterPicker=="pop") {
                //Calculate the Map Grades --dynamic : we get an array of 6 rounded values values, we pick 4 
            var newDynamic=[]
            for (var i = 0; i < allInscription.length; i+=7) {
                newDynamic.push((Math.round(allInscription[i].value/500)*500)+500)
            }
            //newDynamic.reverse()
            //var arr=newDynamic.unshift(0)
            //console.log('arrarrarr',newDynamic);
            //console.log("newDynamic",newDynamic.reverse());
            //console.log("ccccccccccccccccc",);
            newDynamic.reverse()
            /*Sum of all inscription */
           allInscription.map((element)=>{sumInscription+=element.value})
            this.setState({
                //grades:[0,2000, 3500,5000, 7000 ],
                keytitle:"Number of Registration "+nextProps.regDate+"-2017",
                colorfun:this.getColora,
                allInscription,sumInscription,
                dynamicReg:newDynamic.reverse(),grades:newDynamic.reverse()
            });
        }
        else {
            var newDynamicUpdate=[]
            for (var i = 0; i < allUpdate.length; i+=7) {
                newDynamicUpdate.push((Math.round(allUpdate[i].value/250)*250)+250)
            }
            newDynamicUpdate.reverse()
              /*Sum of all  update*/
             allUpdate.map((element)=>{sumUpdate+=element.value})
            this.setState({
                keytitle:"Number of polling updates "+nextProps.regDate+"-2017" ,
                colorfun:this.getColorUpdate,
            allUpdate,sumUpdate,
             dynamicUpdate:newDynamicUpdate.reverse(),grades:newDynamicUpdate.reverse()
        });
        }
        
    }
    
     getColora(d,c1,grades) {
        if      (d >grades[3])      {return (c1[5]); }
        else if (d>grades[2])        {return (c1[4]);}
        else if (d>grades[1])        {return (c1[3]);}
        else if (d>grades[0])        {return (c1[2]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

         getColorUpdate(d,c1,grades) {
        if      (d >grades[3])      {return (c1[5]); }
        else if (d>grades[2])        {return (c1[4]);}
        else if (d>grades[1])        {return (c1[3]);}
        else if (d>grades[0])        {return (c1[2]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}

    style(feature) {
        //check for what we have checked as filter subject : Population || state ||
        if(this.props.radioFilterPicker=="update"){
            var UPDATE = parseInt(feature.properties["update"+this.props.regDate]);
            return {
                fillColor: this.getColorUpdate(UPDATE,this.props.mapColor,this.state.dynamicUpdate),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };
        }else {
             var REGISTRATION = parseInt(feature.properties["inscription"+this.props.regDate]);
 
            return {
                fillColor: this.getColora(REGISTRATION,this.props.mapColor,this.state.dynamicReg),
                color: 'black',
                weight: 2,
                fillOpacity: 0.8
            };
        }
	}

    highlightFeature(e) {
        const layer = e.target;
        const property = layer.feature.properties;

        this.setState({destroy:false,update:property["update"+this.props.regDate],inscription:property["inscription"+this.props.regDate],gouv_name:property.NAME_EN,newMunNumber:property.newnumber,oldMunNumber:property.oldnumber,extMunNumber:property.extendednumber,munNumber:property.munnumber});
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
        const position = [34.05360, 3.59795];
        var markerData=[];
        let charttitle="Municipality Organization of "+ this.state.gouv_name;
        return (
                <div>
                {this.state.shapeIsLoaded ? <Map  maxZoom={23} center={position} zoom={6} className="initialposition" style={{height: "100vh", width: "100vw",position:"relative",zIndex:0}}>
                    <TileLayer
                    url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
                    />

                    <GeoJSON
                    key={"jjjujyfgdf"+this.state.key}
                    data= {this.state.shape}
                    style={this.style.bind(this)} 
                    onEachFeature={
                        (feature, layer) => {
                            //sending shapes center to marker component
                            markerData.push({center:layer.getBounds().getCenter(),name:feature.properties.NAME_EN,inscriptionCenterNumber:feature.properties.numCentreinscription})
                            //layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:"tooltipnamear",direction:"right" })
                            layer.on({mouseover: this.highlightFeature.bind(this)});
                            layer.on({mouseout: this.resetFeature.bind(this)});
                            //console.log("markerData",markerData);
                        }    
                    }
                    >
                        <Tooltip direction="bottom" className="leafletTooltip">
                            <div>
                                <h2>{this.state.gouv_name}</h2>
                                {this.props.radioFilterPicker=="pop"?
                                    <div>
                                        <h3><b>{this.state.inscription}</b> / { this.state.sumInscription} Inscription</h3>
                                        <h3> Rank : <b>{(this.state.allInscription.map((e)=> { return e.value; }).indexOf(parseInt(this.state.inscription)))+1}</b> / 27 </h3>
                                        <h3><b>{this.state.munNumber}</b> Municipality</h3>
                                    </div>
                                :
                                    <div>
                                        <h3><b>{this.state.update}</b> / { this.state.sumUpdate} Polling Center Update </h3>
                                        <h3> Rank : <b>{(this.state.allUpdate.map((e)=> { return e.value; }).indexOf(parseInt(this.state.update)))+1}</b> / 27 </h3>
                                        <h3><b>{this.state.munNumber}</b> Municipality</h3>
                                    </div>
                                }
                            </div>
                        </Tooltip>
                        <Popup maxWidth={350} maxHeight={250} >
                            <StackedColumn
                                charttitle={charttitle}
                                ytitle="Total number of municipalities"
                                title={["Municipalities"]}
                                colorSet={this.props.mapColor}
                                oldMunNumber={this.state.oldMunNumber}
                                newMunNumber={this.state.newMunNumber}
                                extMunNumber={this.state.extMunNumber}
                                munNumber={this.state.extMunNumber} />
                        </Popup>

                    </GeoJSON>

                    {/*Left side top column chart*/}
                    <div className="col-md-7" style={{marginTop:"22rem",zIndex:500}}>
                        {this.props.radioFilterPicker=="pop" ?
                        <BasicColumnRankedInscription
                        title="inscription per irie" 
                        allInscription={this.state.allInscription}
                        spec={"inscription"+this.props.regDate}
                        ytitle="Registration number"
                        subtitle={this.props.regDate+"-2017"}
                        />:
                        <BasicColumnRankedInscription
                        title="Update of Polling center per irie" 
                        allInscription={this.state.allUpdate}
                        spec={"update"+this.props.regDate}
                        ytitle="Update number"
                        subtitle={ this.props.regDate +"-2017"}
                        />}
                    </div>

                    {/*Toggle to change the map*/}
                    <InscriptionVsUpdateRadio/>

                    {/*Load circle marker*/}
                    <NumRegCenterMarker  markerData={markerData} />  

                    {/*Color changer button*/}
                    <ColorBrew />

                    {/*Load DatePicker*/}
                    <DatePicker />

                    {/*to download raw data*/}
                    <SourceButton/> 
                        
                    {/*Map Keys coropleth*/}
                    <Control position="bottomright" >
                        <MapKey colorSet={this.props.mapColor} grades={this.state.grades} getColor={this.state.colorfun} keyTitle={this.state.keytitle} />
                    </Control>
                    
                    {/*Map Keys reg number*/}
                    {!this.props.regCenterCheckBox?
                        <div className="circleMapKeyPosition" >
                            <div className="infoLegendStat legend" >
                                <p>Number of registration Centers</p>
                                <div className  ="circles">
                                    <div className  ="circle c2">44
                                    <div className  ="circle c3">30
                                        <div className  ="circle c4">11</div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>: <div></div>}

                    {/*Title of the map*/}
                    <Control position="topleft">
                        <div className="lefttitle" >
                            <h1>Vizualizing {this.props.radioFilterPicker=="pop"?"registration":"polling center update "} number</h1>
                            <p style={{fontSize:"13px"}}>{this.props.regDate}-2017</p>
                        </div>
                    </Control>

                </Map>:
                <div>
                    <div className="col-md-5"></div>
                    <div className="col-md-5" style={{marginTop:"43vh"}}>
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

  console.log("youhoooo",state);
  return {
    mapColor:state.changeMapColor,
    radioFilterPicker:state.radioFilterPicker,
    regCenterCheckBox:state.PopCheckbox,
    regDate:state.regDate
  };
}

export default connect(mapStateToProps)(RegTrackMap);

