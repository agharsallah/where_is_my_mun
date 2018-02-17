import React, { Component } from 'react';
import MenuDrawer from './MenuDrawer';
import StatMap from "./StatMap";
import config from '../config'
import axios from 'axios' ;

/*Color Choice*/
import ColorBrew from './dynamic color/ColorBrew';
//setting language support
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

class RootMap extends Component {
    constructor(props) {
        super(props);
        this.state={shape:g_mun_shapes,shapeIsLoaded:false}
    }
        componentWillMount() {
        let qString=config.apiUrl+"/api/shape/AllShapes";
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
            }
        )
        .catch(function (error) {
            console.log(error);
        });

        let qString2=config.apiUrl+"/api/iries/";
            axios({
                method: 'get',
                url: qString2,
                headers: {
                    'name': 'Isie',
                    'password': 'Isie@ndDi'
                }
            })
        .then(response=>{
            console.log('we got polling data frm db');
            this.setState({Irie:response.data});
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    
    }
    render() {
        return (
            <div>
                <StatMap shapeIsLoaded={this.state.shapeIsLoaded} shape={this.state.shape} /> 
                <MenuDrawer/>
            </div>
        );
    }
}

export default RootMap;