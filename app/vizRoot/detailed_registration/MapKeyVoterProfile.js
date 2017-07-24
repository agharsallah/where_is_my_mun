import React, { Component } from 'react';

class MapKeyVoterProfile extends Component {

    render() {
        return (
             <div className="infoLegendStat legend">
                <p style={{marginLeft:"10px"}}>{this.props.keyTitle}</p>
                    <i style={{background:"#d56147"}}  ></i>Female are more
                    <br/>
                    <i style={{background:"#5895c5"}}  ></i> Male are more 
            </div>
        );
    }
}

export default MapKeyVoterProfile;