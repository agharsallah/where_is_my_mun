import React, { Component } from 'react';
import Layout from '../Layout' ;
import DetailedRegGovMap from './DetailedRegGovMap' ;
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

class DetailedRegGovRoot extends Component {

    render() {
        return (
            <div>
                <Layout/>
                <DetailedRegGovMap/>
            </div>
        );
    }
}

export default DetailedRegGovRoot;