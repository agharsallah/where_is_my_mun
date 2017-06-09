import React, { Component } from 'react';
import Geocode from './Geocode' ;
import AutoSuggest from './AutoSuggest' ;
import axios from 'axios' ;

class App extends Component {
    
    constructor(props){
        super(props);
        this.state=({key:1,shape:g_mun_shapes,gouv:'Ariana',show:"layer2",hide:"layer1"})
        }

    getGouv(value){
        //console.log(value);
        this.setState({shape:value,key:2,show:"layer1",hide:"layer2"});
    }
    componentWillReceiveProps(nextProps) {
        console.log("cwrp");
        
    }
    
    render() {
        return (
        <div className="container_row">
            <div className={this.state.hide}>
                <Geocode shape={this.state.shape} key={this.state.key}/>
            </div>
            <div className={this.state.show}>
                <AutoSuggest getGouv={this.getGouv.bind(this)}/>
            </div>
        </div>    
        );
    }
}

export default App;