import React, { Component } from 'react';
import Layout from '../Layout' ;
import DetailedRegGovMap from './RegVsElig/DetailedRegGovMap' ;
import ActiveRegistered from './Active/ActiveRegistered' ;
import VoterProfile from './Profile/VoterProfile' ;
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
        this.state={shape:g_mun_shapes,shapeIsLoaded:false, key:1,countProfile:0,countRegVs:0,countActive:0}
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

    //count the numer of how much radiobutton has been chosen to show the description only one time
    componentWillReceiveProps(nextProps) {
        let compteur=this.state.countProfile
                if (nextProps.radioFilterPicker==="pop") {
           this.setState({countRegVs:this.state.countRegVs+1}); 
        }else if (nextProps.radioFilterPicker==="active") {
           this.setState({countActive:this.state.countActive+1}); 
        }else{
        this.setState({countProfile:this.state.countProfile+1});
        }
    }
    

    render() {
        return (
            <div>
                <Layout/>
                {   this.props.radioFilterPicker==="pop" ?
                    <DetailedRegGovMap count={this.state.countRegVs} shape={this.state.shape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key} />
                    :
                    (this.props.radioFilterPicker==="active"?
                        <ActiveRegistered count={this.state.countActive} shape={this.state.shape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key+1}/>
                        :
                        <div>
                            <VoterProfile count={this.state.countProfile} shape={this.state.shape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key+1}/>                        
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    radioFilterPicker:state.radioFilterPicker,
  };
}

export default connect(mapStateToProps)(DetailedRegGovRoot);