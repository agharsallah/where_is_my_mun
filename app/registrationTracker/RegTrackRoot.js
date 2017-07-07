import React, { Component } from 'react';

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';

class RegtrackRoot extends Component {
    constructor(props) {
        super(props);
    }

    getChoroplethColors(sets) {
        this.setState({sets})
    }
    render() {
        return (
            <div>
               Home sweet
            </div>
        );
    }
}

export default RegtrackRoot;