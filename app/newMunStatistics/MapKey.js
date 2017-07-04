import React, { Component } from 'react';

class MapKey extends Component {

    render() {
         var grades = this.props.grades;
        return (
             <div className="infoLegendStat legend">
                <p style={{marginLeft:"10px"}}>{this.props.keyTitle}</p>
                {grades.map(function(object, i){
                    if(object=="Extended"){object=1}else if (object=="New"){object=2}else{object=3}
                    var bg=this.props.getColor(object,this.props.colorSet)
                    return (
                            <div key={i+this.props.colorSet}>
                                <i style={{background:bg}}  ></i>
                                { object===1 ?"Extended":( object===2?"New":"Old") }
                                <br/>
                            </div>
                        )
                },this)}

                <i style={{background:"#dddddd"}} ></i> {"inexistant"}
            </div>
        );
    }
}

export default MapKey;