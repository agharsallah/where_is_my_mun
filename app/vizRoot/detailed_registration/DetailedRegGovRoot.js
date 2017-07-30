import React, { Component } from 'react';
import Layout from '../Layout' ;
import DetailedRegGovMap from './DetailedRegGovMap' ;
import ActiveRegistered from './ActiveRegistered' ;
import VoterProfile from './VoterProfile' ;
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
import axios from 'axios' ;
import config from '../../config'

import { connect } from "react-redux";
import { getPopValue } from "../../actions/index";
import { bindActionCreators } from "redux";

class DetailedRegGovRoot extends Component {
    
    constructor(props) {
        super(props);
        this.state={shape:g_mun_shapes,shapeIsLoaded:false, key:1,}
    }
    
    componentWillMount() {
        let qString=config.apiUrl+"/api/dailyins/detailed_gov_23-07";
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            this.setState({shape:JSON.parse(response.data.data),key:2,shapeIsLoaded:true
            });
        }
        )
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Layout/>
                {   this.props.radioFilterPicker==="pop" ?
                    <DetailedRegGovMap shape={this.state.shape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key} />
                    :
                    (this.props.radioFilterPicker==="active"?
                        <ActiveRegistered shape={this.state.shape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key+1}/>
                        :
                        <div>
                            <VoterProfile shape={this.state.shape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key+1}/>                        
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {

  console.log("youhoooo DetailedRegGovRoot",state);
  return {
    radioFilterPicker:state.radioFilterPicker,
  };
}

export default connect(mapStateToProps)(DetailedRegGovRoot);