import React, { Component } from 'react';
import StackedBar from './StackedBar' ;
class MapKey extends Component {
constructor(props) {
    super(props);
    this.state={allpop:11005512,extpop:5899632,newpop:1597300,oldpop:3508580,
                allarea:169.047,extarea:115.858,newarea:42.348,oldarea:10.841,
    }
}

    render() {
        console.log();
        return (
             <div className="infoLegendStat legend">
               <StackedBar 
                    title={["Popultaion"]} charttitle="Population representation" ytitle="Total Population perc."
                    allpop={this.state.allpop} extpop={this.state.extpop} newpop={this.state.newpop} oldpop={this.state.oldpop}
                    spec=" person" colorSet={this.props.colorSet}
                    />
                <StackedBar 
                    title={["Area"]} charttitle="Area representation Km²" ytitle="Total Area perc."
                    allpop={this.state.allarea} extpop={this.state.extarea} newpop={this.state.newarea} oldpop={this.state.oldarea}
                    spec=" km²" colorSet={this.props.colorSet}
                    />
            </div>
        );
    }
}

export default MapKey;