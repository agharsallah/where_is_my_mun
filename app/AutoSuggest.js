import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios' ;
import { indexOf } from 'underscore'
const gouvernorates =["Ariana","Beja","BenArous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Manouba","Kef","Mahdia","Medenine","Monastir","Nabeul","Sfax","SidiBouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]

class App extends Component {
    
    constructor(props){
        super(props);
         this.state=({gouv:'',disabled:true})
    }
    ChosenGouv(chosenRequest){
 
        this.setState({gouv:chosenRequest});
        console.log(chosenRequest);

        
    }
    handleClick(){
        //send value from the input to parent
        console.log("click",this.state.gouv);
        let qString="http://localhost:3000/api/bears/"+"Tunis";
        axios({
            method: 'get',
            url: qString,
        })
    .then(response=>{
        //console.log(response.data.data)
                console.log('we got data frm db');
                console.log(response);
         this.props.getGouv(response.data.data)
        }
    )
    .catch(function (error) {
        console.log(error);
    });           
    }

    render() {
        return (
   <div>
   <div className="row titleTop">
				<div className="col-md-8 col-md-offset-2 text-center gtco-heading">
					<h2>Registration Helper</h2>
					<p>The concept of municipality is quite new for citizens, that's why this project is about helping ISIE Support team to determine from an adress the municipality where a citizen belongs.</p>
				</div>
			</div>
    <div className="col-md-12">
        <div className="col-md-2"></div>
        
        <div className="col-md-7">
        <AutoComplete
          dataSource={gouvernorates}
          filter={AutoComplete.fuzzyFilter}
          maxSearchResults={5}
          floatingLabelText="Type Gouvernorate Here"
          fullWidth={true}
          onNewRequest={this.ChosenGouv.bind(this)}
        />
        </div>

        <div className="col-md-1" style={{marginTop:"3%"}}>
         <RaisedButton onTouchTap={this.handleClick.bind(this)} disabled={this.state.disabled} label="Submit"  />
        </div>

         <div className="col-md-2"></div>
      </div>
      
    <div className="footer">
      <div className="footercontainer">
              <a href='#'><img src="/img/DI.PNG" className="fa btn btn-space" alt="DI" height="80" width="150"/></a>
              <a href='#'><img src="/img/ISIE.PNG" className="fa btn btn-space" alt="DI" height="80" width="150"/></a>
              
      </div>
    </div>

    </div>
        );
    }
}

export default App;