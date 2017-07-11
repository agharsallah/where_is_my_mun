import React, { Component } from 'react';
import Layout from '../Layout' ;
import RegTrackMap from './RegTrackMap' ;
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

class RegtrackRoot extends Component {

    render() {
        return (
            <div>
                <Layout/>
                <RegTrackMap/>
            </div>
        );
    }
}

export default RegtrackRoot;