import React, { Component } from 'react';
import StackedBar from './StackedBar' ;
class MapKey extends Component {
constructor(props) {
    super(props);
    this.state={allpop:12551557,extpop:7254601,newpop:2265540,oldpop:3031416,
                allarea:169047,extarea:115858,newarea:42348,oldarea:10841,
    }
}


componentWillReceiveProps(nextProps) {
    console.log(nextProps.shape.features);
    var array=nextProps.shape.features
    var allpop=0,allarea=0,extpop=0,extarea=0,newpop=0,newarea=0,oldpop=0,oldarea=0
    array.map((element,i)=>{
            if (isNaN(parseInt( element.properties.area))) {
                console.log(element.properties.LABEL);
            }
            allpop+=parseInt( element.properties.POP)
            allarea+=parseInt( element.properties.area)
        if (element.properties.state=="extended") {
            extpop+=parseInt( element.properties.POP)
            extarea+=parseInt( element.properties.area)
        }else if(element.properties.state=="new"){
            newpop+=parseInt( element.properties.POP)
            newarea+=parseInt( element.properties.area)
        }else{
            oldpop+=parseInt( element.properties.POP)
            oldarea+=parseInt( element.properties.area) 
        }
    })
    console.log(allarea);
    console.log(extarea);
    console.log(newarea);
    console.log(oldarea);
}


    render() {
        return (
             <div className="infoLegendStat legend">
               <StackedBar 
                    title={["Popultaion"]} charttitle="Population representation" ytitle="Total Population perc."
                    allpop={this.state.allpop} extpop={this.state.extpop} newpop={this.state.newpop} oldpop={this.state.oldpop}
                    spec=" person"
                    />
                <StackedBar 
                    title={["Area"]} charttitle="Area representation Km²" ytitle="Total Area perc."
                    allpop={this.state.allarea} extpop={this.state.extarea} newpop={this.state.newarea} oldpop={this.state.oldarea}
                    spec=" km²"
                    />
            </div>
        );
    }
}

export default MapKey;