import React, { Component } from 'react';
import Translate    from 'react-translate-component';

class MapKeyVoterProfile extends Component {

    render() {
     const MALEMORE= <Translate type="text" content="VoterProfile.femaleMore"/>
     const FEMALEMORE= <Translate type="text" content="VoterProfile.maleMore"/>
        return (
             <div className="infoLegendStat legend">
                <p style={{marginLeft:"10px"}}>{this.props.keyTitle}</p>
                    <i style={{background:"#d56147"}}  ></i>{MALEMORE}
                    <br/>
                    <i style={{background:"#5895c5"}}  ></i>{FEMALEMORE}
            </div>
        );
    }
}

export default MapKeyVoterProfile;